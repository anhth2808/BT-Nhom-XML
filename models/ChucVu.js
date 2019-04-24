const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const Builder = xml2js.Builder();
const parseString = xml2js.parseString;

const DOMParser = require("xmldom").DOMParser;


const p = require("../util/path");

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
            // console.log(data);

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
}

module.exports = ChucVu;