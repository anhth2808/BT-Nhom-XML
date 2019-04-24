const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const Builder = xml2js.Builder();
const parseString = xml2js.parseString;

const DOMParser = require("xmldom").DOMParser;
const XMLSerializer = require("xmldom").XMLSerializer;
const serializer = new XMLSerializer();


// database
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
        return new Promise((resolve, reject) => {
            getDataFromFile(nhanViens => {
                if (this.MaNV) { // edit nhanvien
                    
                    const existingNhanVienIndex = nhanViens.findIndex(nhanVien => nhanVien.MaNV[0] === this.MaNV);
                    const updatedNhanViens = [...nhanViens];
                    
                    updatedNhanViens[existingNhanVienIndex] = this;
                    


                    fs.writeFile(p, JSON.stringify(), (err) => {

                    });


                    console.log(this);
                    // writeFile
                    
                    

                } else { // add new nhanvien
                    getDocument((doc) => {

                        this.MaNV = Math.random().toString();
                        this.MaHDLD = Math.random().toString();
                        // nhanViens.push(this);


                        const eNhanVien = doc.createElement("NhanVien");
                        
                        const eMaNV = doc.createElement("MaNV");
                        eMaNV.textContent = this.MaNV;

                        const eTenNV = doc.createElement("TenNV");
                        eTenNV.textContent = this.TenNV;

                        const eDiaChi = doc.createElement("DiaChi");
                        eDiaChi.textContent = this.DiaChi;

                        const eNgaySinh = doc.createElement("NgaySinh");
                        eNgaySinh.textContent = this.NgaySinh;

                        const eGioiTinh = doc.createElement("GioiTinh");
                        eGioiTinh.textContent = this.GioiTinh;

                        const eDanToc = doc.createElement("DanToc");
                        eDanToc.textContent = this.DanToc;

                        const eTonGiao = doc.createElement("TonGiao");                     
                        eTonGiao.textContent = this.TonGiao;

                        const eCMND = doc.createElement("CMND");
                        eCMND.textContent = this.CMND;
                        

                        const eMaPB = doc.createElement("MaPB");
                        eMaPB.textContent = this.MaPB;

                        const eMaCV = doc.createElement("MaCV");
                        eMaCV.textContent = this.MaCV;

                        const eMaHDLD = doc.createElement("MaHDLD");
                        eMaHDLD.textContent = this.MaHDLD;


                        eNhanVien.appendChild(eMaNV);
                        eNhanVien.appendChild(eTenNV);
                        eNhanVien.appendChild(eDiaChi);
                        eNhanVien.appendChild(eNgaySinh);
                        eNhanVien.appendChild(eGioiTinh);
                        eNhanVien.appendChild(eDanToc);
                        eNhanVien.appendChild(eTonGiao);
                        eNhanVien.appendChild(eCMND);
                        eNhanVien.appendChild(eMaPB);
                        eNhanVien.appendChild(eMaCV);
                        eNhanVien.appendChild(eMaHDLD);

                        const eQuanLyNhanVien = doc.getElementsByTagName("QuanLyNhanVien");
                        eQuanLyNhanVien[0].appendChild(eNhanVien);

                        // console.log(eQuanLyNhanVien[0]);
                        const docToWrite = serializer.serializeToString(doc);
                        
                        fs.writeFile(p, docToWrite, "utf-8", () => {
                            resolve(this);
                        });
                        // wirteFile
                    
                    })
                }
            });
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
            cb(nhanVien);
        });
    }
}

module.exports = NhanVien;