const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const Builder = xml2js.Builder();
const parseString = xml2js.parseString;

const DOMParser = require("xmldom").DOMParser;
const XMLSerializer = require("xmldom").XMLSerializer;
const serializer = new XMLSerializer();

const p = require("../util/path");


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

                        const xmlData = serializer.serializeToString(doc);
                        
                        fs.writeFile(p, xmlData, "utf-8", () => {
                            resolve(this);
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
                        

                        const docToWrite = serializer.serializeToString(doc);
                        
                        fs.writeFile(p, docToWrite, "utf-8", () => {
                            resolve(this);
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
}

module.exports = HDLD;