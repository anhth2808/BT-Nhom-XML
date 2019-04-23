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
            // console.log(fileContent);


            const doc = new DOMParser()
                .parseFromString(fileContent);
            

            const data = [];

            // doc.getElementsByTagName("NhanVien")[0].getElementsByTagName("MaNV")[0].childNodes[0].nodeValue;
            const nhanViens = doc.getElementsByTagName("NhanVien");
            for (let i = 0; i < nhanViens.length; i++) {
                data.push(new NhanVien(
                    nhanViens[i].getElementsByTagName("MaNV")[0].childNodes[0].nodeValue, 
                    nhanViens[i].getElementsByTagName("TenNV")[0].childNodes[0].nodeValue,
                    nhanViens[i].getElementsByTagName("DiaChi")[0].childNodes[0].nodeValue, 
                    nhanViens[i].getElementsByTagName("NgaySinh")[0].childNodes[0].nodeValue, 
                    nhanViens[i].getElementsByTagName("GioiTinh")[0].childNodes[0].nodeValue, 
                    nhanViens[i].getElementsByTagName("DanToc")[0].childNodes[0].nodeValue, 
                    nhanViens[i].getElementsByTagName("TonGiao")[0].childNodes[0].nodeValue, 
                    nhanViens[i].getElementsByTagName("CMND")[0].childNodes[0].nodeValue, 
                    nhanViens[i].getElementsByTagName("MaPB")[0].childNodes[0].nodeValue, 
                    nhanViens[i].getElementsByTagName("MaCV")[0].childNodes[0].nodeValue, 
                    nhanViens[i].getElementsByTagName("MaHDLD")[0].childNodes[0].nodeValue
                ));
            }

            cb(data);
        }
    });
}

class NhanVien {
    constructor(MaNV, TenNV, DiaChi, NgaySinh, GioiTinh, DanToc, TonGiao, CMND, MaPB, MaCV, MaHDLD) {
        //...
        this.MaNV = MaNV;
        this.TenNV = TenNV;
        this.DiaChi = DiaChi;
        this.NgaySinh = NgaySinh;
        this.GioiTinh = GioiTinh;
        this.DanToc = DanToc;
        this.TonGiao = TonGiao;
        this.CMND = CMND;
        this.MaPB = MaPB;
        this.MaCV = MaCV;
        this.MaHDLD = MaHDLD;
    }

    save() {
        getDataFromFile(nhanViens => {
            if (this.MaNV) {
                
                const existingNhanVienIndex = nhanViens.findIndex(nhanVien => nhanVien.MaNV[0] === this.MaNV);
                const updatedNhanViens = [...nhanViens];
                
                updatedNhanViens[existingNhanVienIndex] = this;
                
                // writeFile
            } else {
                this.MaNV = Math.random().toString();
                nhanViens.push(this);
                
                // wirteFile
            }
        })
    }

    static deleteById(MaNV, cb) {

    }

    static fetchAll(cb) {
        getDataFromFile(cb);
    }

    static findById(MaNV, cb) {
        getDataFromFile(nhanViens => {
            const nhanVien = nhanViens.find(n => n.MaNV === MaNV);
            // console.log(nhanViens[0].MaNV);
            cb(nhanVien);
        });
    }
}

module.exports = NhanVien;