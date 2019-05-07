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

            const phongBans = doc.getElementsByTagName("PhongBan");
            for (let i = 0; i < phongBans.length; i++) {
                data.push(new PhongBan(
                    phongBans[i].getElementsByTagName("MaPB")[0].childNodes[0].nodeValue,
                    phongBans[i].getElementsByTagName("TenPB")[0].childNodes[0].nodeValue
                ));
            }

            cb(data);
        }
    });
}

class PhongBan {
    constructor(MaPB, TenPB) {
        this.MaPB = MaPB;
        this.TenPB = TenPB;
    }

    save() {
        return new Promise((resolve, reject) => {
            if (this.MaPB) {
                getDocument(doc => {
                    const ePhongBan = doc.getElementsByTagName("PhongBan");
                    
                    for (let i = 0; i < ePhongBan.length; i++) {
                        if (ePhongBan[i].getElementsByTagName("MaPB")[0].childNodes[0].nodeValue === this.MaPB) {
                            ePhongBan[i].getElementsByTagName("TenPB")[0].childNodes[0].textContent = this.TenPB;
                        }
                    }

                    formatXMLFile(doc, xmlData => {
                        fs.writeFile(p, xmlData, "utf-8", () => {
                            resolve(this);
                        });
                    });
                });
            } else {
                getDocument(doc => {
                    this.MaPB = createId(doc, "PhongBan");
                    const ePhongBan = doc.createElement("PhongBan");

                    const eMaPB = doc.createElement("MaPB");
                    eMaPB.textContent = this.MaPB;

                    const eTenPB = doc.createElement("TenPB");
                    eTenPB.textContent = this.TenPB;
                    
                    ePhongBan.appendChild(eMaPB);
                    ePhongBan.appendChild(eTenPB);

                    const eQuanLyNhanVien = doc.getElementsByTagName("QuanLyNhanVien");
                    eQuanLyNhanVien[0].appendChild(ePhongBan);


                    formatXMLFile(doc, xmlData => {
                        fs.writeFile(p, xmlData, "utf-8", () => {
                            resolve(this);
                        });
                    });

                });
            }
        })
        
    }

    static fetchAll(cb) {
        getDataFromFile(cb);
    }

    static findById(MaPB, cb) {
        getDataFromFile(phongBans => {
            const phongBan = phongBans.find(n => n.MaPB === MaPB);
            cb(phongBan);
        });
    }

    static deleteById(MaPB) {
        return new Promise((resolve, reject) => {

            // check any nhanviens is using MaPB selected
            NhanVien.checkIsUsing("MaPB", MaPB, (nhanVien) => {
                if (nhanVien) {
                    resolve({
                        result: "failed",
                        err: "This PB is using"
                    });                    
                } else {
                    getDocument(doc => {
               
                        const ePhongBan = doc.getElementsByTagName("PhongBan");

                        for (let i = 0; i < ePhongBan.length; i++) {
                            if (ePhongBan[i].getElementsByTagName("MaPB")[0].childNodes[0].nodeValue === MaPB) {
                                let deletedElement = ePhongBan[i];
                                deletedElement.parentNode.removeChild(deletedElement);
                            }
                        }
            
                        // write file            
                        formatXMLFile(doc, xmlData => {
                            fs.writeFile(p, xmlData, "utf-8", () => {
                                resolve(null);
                            });
                        });
            
                    });
                    
                }
            })
            
        });
        
    }
}

module.exports = PhongBan;