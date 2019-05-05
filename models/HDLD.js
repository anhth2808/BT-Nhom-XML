const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const Builder = xml2js.Builder();
const parseString = xml2js.parseString;

const DOMParser = require("xmldom").DOMParser;
const XMLSerializer = require("xmldom").XMLSerializer;
const serializer = new XMLSerializer();

const p = require("../util/path");

const formatXMLFile = (doc, cb)  => {
    // xml
    // console.log(fileContent);
    const fileContent = serializer.serializeToString(doc);
    console.log("fileContent: ", fileContent);
    parseString(fileContent, (err, result) => {
        // const json = result;
        const builder = new xml2js.Builder();
        const xml = builder.buildObject(result);
        cb(xml);
    });
}

const getDocument = (cb) => {
    fs.readFile(p, "utf-8", (err, fileContent) => {
        if (err) {
            cb([]);
        } else {

            const doc = new DOMParser()
                .parseFromString(fileContent);

            cb(doc);
        }
    });
}



const getDataFromFile = (cb) => {
    fs.readFile(p, "utf-8", (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            const doc = new DOMParser().parseFromString(fileContent);
            const data = [];

            const hdlds = doc.getElementsByTagName("HDLD");

            for (let i = 0; i < hdlds.length; i++) {
                data.push(new HDLD(
                    hdlds[i].getElementsByTagName("MaHDLD")[0].childNodes[0].nodeValue,
                    hdlds[i].getElementsByTagName("NgayBatDau")[0].childNodes[0].nodeValue,
                    hdlds[i].getElementsByTagName("NgayKetThuc")[0].childNodes[0].nodeValue,
                    hdlds[i].getElementsByTagName("HeSoLuong")[0].childNodes[0].nodeValue
                                    
                ));
            }
            // console.log(data);

            cb(data);
        }
    });
}

class HDLD {
    constructor(MaHDLD, NgayBatDau, NgayKetThuc, HeSoLuong) {
        this.MaHDLD = MaHDLD;
        this.NgayBatDau = NgayBatDau;
        this.NgayKetThuc = NgayKetThuc;
        this.HeSoLuong = HeSoLuong;
    }

    save() {
        return new Promise((resolve, reject) => {
            getDataFromFile(hdlds => {
                const exitingProductNhanVien = hdlds.findIndex(hdld => hdld.MaHDLD === this.MaHDLD);

                if (exitingProductNhanVien >= 0) { // edit hdld
                    getDocument(doc => {
                        const eHldl = doc.getElementsByTagName("HDLD");                        
                        for (let i = 0; i < eHldl.length; i++) {
                            if (eHldl[i].getElementsByTagName("MaHDLD")[0].childNodes[0].nodeValue === this.MaHDLD) {
                                eHldl[i].getElementsByTagName("NgayBatDau")[0].childNodes[0].textContent = this.NgayBatDau;
                                eHldl[i].getElementsByTagName("NgayKetThuc")[0].childNodes[0].textContent = this.NgayKetThuc; 
                                eHldl[i].getElementsByTagName("HeSoLuong")[0].childNodes[0].textContent = this.HeSoLuong;                               
                            }
                        }

                        
                        formatXMLFile(doc, xmlData => {
                            fs.writeFile(p, xmlData, "utf-8", () => {
                                resolve(this);
                            });
                        });

                    }); 
                    

                } else { // add new hdld
                    getDocument((doc) => {
                        const eQuanLyNhanVien = doc.getElementsByTagName("QuanLyNhanVien");
                        const eHdld = doc.createElement("HDLD");
                        
                        const eMaHDLD = doc.createElement("MaHDLD");
                        eMaHDLD.textContent = this.MaHDLD;

                        const eNgayBatDau = doc.createElement("NgayBatDau");
                        eNgayBatDau.textContent = this.NgayBatDau;

                        const eNgayKetThuc = doc.createElement("NgayKetThuc");
                        eNgayKetThuc.textContent = this.NgayKetThuc;
                        
                        const eHeSoLuong = doc.createElement("HeSoLuong");
                        eHeSoLuong.textContent = this.HeSoLuong;

                        eHdld.appendChild(eMaHDLD);
                        eHdld.appendChild(eNgayBatDau);
                        eHdld.appendChild(eNgayKetThuc);
                        eHdld.appendChild(eHeSoLuong);

                        eQuanLyNhanVien[0].appendChild(eHdld);
                        

                        formatXMLFile(doc, xmlData => {
                            fs.writeFile(p, xmlData, "utf-8", () => {
                                resolve(this);
                            });
                        });
                    
                    })
                }
            });
        })
    }

    static fetchAll(cb) {
        getDataFromFile(cb);
    }

    static findById(MaHDLD, cb) {
        getDataFromFile(hdlds => {
            const hdld = hdlds.find(n => n.MaHDLD === MaHDLD);
            cb(hdld);
        })
    }

    static deleteById(MaHDLD) {
        getDocument(doc => {
            const eHDLD = doc.getElementsByTagName("HDLD");
            
            // console.log("MaHDLD:", MaHDLD)

            for (let i = 0; i < eHDLD.length; i++) {
                if (eHDLD[i].getElementsByTagName("MaHDLD")[0].childNodes[0].nodeValue === MaHDLD) {                    
                    // console.log("found HDLD: ", eHDLD[i].getElementsByTagName("MaHDLD")[0].childNodes[0].nodeValue);
                    
                    let deletedElement = eHDLD[i];                  
                    deletedElement.parentNode.removeChild(deletedElement);
                    
                }
            }

            // const temp = doc.getElementsByTagName("HDLD");
            // for (let i = 0; i < temp.length; i++) {       
            //     console.log(temp[i].getElementsByTagName("MaHDLD")[0].childNodes[0].nodeValue) 
            // }
            formatXMLFile(doc, xmlData => {
                fs.writeFile(p, xmlData, "utf-8", () => {
                });
            });
            
        });
    }
}

module.exports = HDLD;