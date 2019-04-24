const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const Builder = xml2js.Builder();
const parseString = xml2js.parseString;

const DOMParser = require("xmldom").DOMParser;


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
            getDataFromFile(PhongBans => {
                if (this.MaPB) {
                    
                    const existingPhongBanIndex = PhongBans.findIndex(PhongBan => PhongBan.MaPB[0] === this.MaPB);
                    const updatedPhongBan = [...PhongBans];
                    
                    updatedPhongBan[existingPhongBanIndex] = this;
                    resolve();
                    // writeFile
                } else {
                    this.MaPB = Math.random().toString();
                    PhongBans.push(this);
                
                    resolve();
                    // wirteFile
                }
            })
        })
        
    }

    static fetchAll(cb) {
        getDataFromFile(cb);
    }

    static findById(MaPB, cb) {
        getDataFromFile(phongBans => {
            const phongBan = phongBans.find(n => n.MaPB === MaPB);
            cb(phongBan);
        })
    }
}

module.exports = PhongBan;