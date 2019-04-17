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
                    // console.log(result);
                    console.log("NhanVien:", result.QuanLyNhanVien.NhanVien);
                    // console.log("PhongBan:", result.QuanLyNhanVien.PhongBan);
                    // console.log("ChucVu:", result.QuanLyNhanVien.ChucVu);
                    // console.log("HDLD:", result.QuanLyNhanVien.HDLD);

                    cb(result.QuanLyNhanVien.NhanVien);
                }                               
            });
            
        }
    });
}


module.exports = class NhanVien {
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
            const nhanVien = nhanViens.find(n => n.MaNV[0] === MaNV);
            console.log(nhanViens[0].MaNV[0]);
            cb(nhanVien);
        })
    }
}