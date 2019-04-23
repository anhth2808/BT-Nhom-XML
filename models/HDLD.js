const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const Builder = xml2js.Builder();
const parseString = xml2js.parseString;

const DOMParser = require("xmldom").DOMParser;


const p = path.join(path.dirname(process.mainModule.filename), "data", "QuanLyNhanVien-Instance.xml");

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
            console.log(data);

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