const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const Builder = xml2js.Builder();
const parseString = xml2js.parseString;

const p = path.join(path.dirname(process.mainModule.filename), "data", "QuanLyNhanVien-Instance.xml");

const getDataFromFile = (cb) => {
    fs.readFile(p, "utf-8", (err, fileContent) => {
        if (err) {
            cb([]);
        } else {

            parseString(fileContent, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    cb(result.QuanLyNhanVien.PhongBan);
                }                               
            });
            
        }
    });
}

module.exports = class PhongBan {
    constructor(MaPB, TenPB) {
        this.MaPB = MaPB;
        this.TenPB = TenPB;
    }

    save() {
        getDataFromFile(PhongBans => {
            if (this.MaPB) {
                
                const existingPhongBanIndex = PhongBans.findIndex(PhongBan => PhongBan.MaPB[0] === this.MaPB);
                const updatedPhongBan = [...PhongBans];
                
                updatedPhongBan[existingPhongBanIndex] = this;
                
                // writeFile
            } else {
                this.MaPB = Math.random().toString();
                PhongBans.push(this);
                
                // wirteFile
            }
        })
    }

    static fetchAll(cb) {
        getDataFromFile(cb);
    }

    static findById(MaPB, cb) {
        getDataFromFile(phongBans => {
            const PhongBan = phongBans.find(n => n.MaPB[0] === MaPB);
            // console.log(phongBans[0].MaPB[0]);
            cb(PhongBan);
        })
    }
}