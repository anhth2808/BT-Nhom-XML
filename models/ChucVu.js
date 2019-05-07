const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const Builder = xml2js.Builder();
const parseString = xml2js.parseString;

const DOMParser = require("xmldom").DOMParser;
const XMLSerializer = require("xmldom").XMLSerializer;
const serializer = new XMLSerializer();

const NhanVien = require("./NhanVien");

const p = require("../util/path");
const createId = require("../util/myModule").createId;



const formatXMLFile = (doc, cb)  => {
    // xml
    const fileContent = serializer.serializeToString(doc);

    parseString(fileContent, (err, result) => {
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

            const chucVus = doc.getElementsByTagName("ChucVu");
            for (let i = 0; i < chucVus.length; i++) {
                data.push(new ChucVu(
                    chucVus[i].getElementsByTagName("MaCV")[0].childNodes[0].nodeValue,
                    chucVus[i].getElementsByTagName("TenCV")[0].childNodes[0].nodeValue,
                    chucVus[i].getElementsByTagName("PhuCap")[0].childNodes[0].nodeValue
                ));
            }

            cb(data);
        }
    });
}

class ChucVu {
    constructor(MaCV, TenCV, PhuCap) {
        this.MaCV = MaCV;
        this.TenCV = TenCV;
        this.PhuCap = PhuCap;
    }

    save() {
        return new Promise((resolve, reject) => {
            if (this.MaCV) {
                getDocument(doc => {
                    const eChucVu = doc.getElementsByTagName("ChucVu");

                    for (let i = 0; i < eChucVu.length; i++) {
                        if (eChucVu[i].getElementsByTagName("MaCV")[0].childNodes[0].nodeValue === this.MaCV) {
                            eChucVu[i].getElementsByTagName("TenCV")[0].childNodes[0].textContent = this.TenCV;
                            eChucVu[i].getElementsByTagName("PhuCap")[0].childNodes[0].textContent = this.PhuCap;
                        }
                    }

                    formatXMLFile(doc, xmlData => {
                        fs.writeFile(p, xmlData, "utf-8", () => {
                            resolve(this);
                        });
                    });
                });
            } else { // add new 
                getDocument(doc => {
                    
                    this.MaCV = createId(doc, "ChucVu");
                    const eChucVu = doc.createElement("ChucVu");

                    const eMaCV = doc.createElement("MaCV");
                    eMaCV.textContent = this.MaCV;

                    const eTenCV = doc.createElement("TenCV");
                    eTenCV.textContent = this.TenCV;

                    const ePhuCap = doc.createElement("PhuCap");
                    ePhuCap.textContent = this.PhuCap;


                    eChucVu.appendChild(eMaCV);
                    eChucVu.appendChild(eTenCV);
                    eChucVu.appendChild(ePhuCap);
                    

                    const eQuanLyNhanVien = doc.getElementsByTagName("QuanLyNhanVien");
                    eQuanLyNhanVien[0].appendChild(eChucVu);

                    
                    // write file
                    formatXMLFile(doc, xmlData => {
                        fs.writeFile(p, xmlData, "utf-8", () => {
                            resolve(this);
                        });
                    });
                })
            }
        });
    }

    static fetchAll(cb) {
        getDataFromFile(cb);
    }

    static findById(MaCV, cb) {
        getDataFromFile(chucVus => {
            const chucVu = chucVus.find(n => n.MaCV === MaCV);
            cb(chucVu);
        })
    }

    static deleteById(MaCV) {
        return new Promise((resolve, reject) => {
            // check any nhanviens is using MaCV selected
            NhanVien.checkIsUsing("MaCV", MaCV, (nhanVien) => {
                if (nhanVien) {
                    resolve({
                        result: "failed",
                        err: "This CV is using"
                    });
                } else {
                    getDocument(doc => {
                        const eChucVu = doc.getElementsByTagName("ChucVu");
            
                        for (let i = 0; i < eChucVu.length; i++) {
                            if (eChucVu[i].getElementsByTagName("MaCV")[0].childNodes[0].nodeValue === MaCV) {
                                let deletedElement = eChucVu[i];
                                deletedElement.parentNode.removeChild(deletedElement);
                            }
                        }
            
                        formatXMLFile(doc, xmlData => {
                            fs.writeFile(p, xmlData, "utf-8", () => {
                                resolve(null);
                            });
                        });
                    })
                }
            })
        })
        
    } 

}

module.exports = ChucVu;