const fs = require("fs");
const xml2js = require("xml2js");
const Builder = xml2js.Builder();
const parseString = xml2js.parseString;
const path = require("path");

const NhanVien = require("../models/NhanVien");
const PhongBan = require("../models/PhongBan");
const HDLD = require("../models/HDLD");
const ChucVu = require("../models/ChucVu");





const formatdmy2ymd = (date) => {
    date = date.split("-");
    return date[2] + "-" + date[1] + "-" + date[0];
}





exports.getIndex = (req, res, next) => {
    NhanVien.fetchAll(nhanViens => {        
        res.render("./admin/index", {
            pageTitle: 'Index',
            path: '/',
            nhanViens: nhanViens
        });
    });
}

exports.getNhanViens = (req, res, next) => {
    NhanVien.fetchAll(nhanViens => {
        res.render("./admin/nhanvien-list", {
            pageTitle: 'Danh sách nhân viên',
            path: '/nhanviens',
            nhanViens: nhanViens
        });
    });
    
};


exports.getNhanVien = (req, res, next) => {
    const MaNV = req.params.MaNV;

    NhanVien.findById(MaNV, nhanVien => {
        // console.log("nhanVien:", nhanVien);

        PhongBan.findById(nhanVien.MaPB, phongBan => {
            // console.log(phongBan);

            ChucVu.findById(nhanVien.MaCV, chucVu => {
                // console.log(chucVu);
                
                HDLD.findById(nhanVien.MaHDLD, hdld => {
                    // console.log(hdld);

                    res.render("./admin/nhanvien-detail", {
                        pageTitle: nhanVien.TenNV,
                        path: '/nhanviens',
                        nhanVien: nhanVien,
                        phongBan: phongBan,
                        chucVu: chucVu,
                        hdld: hdld
                    });
                });
            
            });

        });

    });
    
};

exports.getAddNhanVien = (req, res, next) => {
    PhongBan.fetchAll((phongBans) => {
        ChucVu.fetchAll((chucVus) => {
            res.render("./admin/nhanvien-add", {
                phongBans: phongBans,
                chucVus: chucVus,
                editing: false
            });
        });
    });
    
}

exports.postAddNhanVien = (req, res, next ) => {

    const TenNV = req.body.TenNV,
        DiaChi = req.body.DiaChi,
        NgaySinh = formatdmy2ymd(req.body.NgaySinh),
        GioiTinh = req.body.GioiTinh,
        DanToc = req.body.DanToc,
        TonGiao = req.body.TonGiao,
        CMND = req.body.CMND;

    const MaPB = req.body.MaPB;
    const MaCV = req.body.MaCV;

    const NgayBatDau = formatdmy2ymd(req.body.NgayBatDau), 
        NgayKetThuc = formatdmy2ymd(req.body.NgayKetThuc), 
        HeSoLuong = req.body.HeSoLuong;

    const nhanVien = new NhanVien(null, TenNV, DiaChi, NgaySinh, GioiTinh, DanToc, TonGiao, CMND, MaPB, MaCV, null);
    nhanVien.save().then((result) => {
        const hdld = new HDLD(result.MaHDLD, NgayBatDau, NgayKetThuc, HeSoLuong);
        hdld.save();
        console.log(hdld);
        res.redirect("nhanviens/" + nhanVien.MaNV);
    });
    
}

exports.getEditNhanVien = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }

    const MaNV = req.params.MaNV;

    NhanVien.findById(MaNV, nhanVien => {
        PhongBan.findById(nhanVien.MaPB, phongBan => {
            ChucVu.findById(nhanVien.MaCV, chucVu => {
                HDLD.findById(nhanVien.MaHDLD, hdld => {
                    PhongBan.fetchAll(phongBans => {
                        ChucVu.fetchAll(chucVus => {
                            res.render("./admin/nhanvien-add", {
                                nhanVien: nhanVien,
                                chucVuSelf: chucVu,
                                phongBanSelf: phongBan,
                                phongBans: phongBans,
                                chucVus: chucVus,
                                hdld: hdld,
                                editing: editMode
                            });
                        });
                    })
                });
            });
        });
    });
    
}


exports.postEditNhanVien = (req, res, next) => {
    const TenNV = req.body.TenNV,
        DiaChi = req.body.DiaChi,
        NgaySinh = formatdmy2ymd(req.body.NgaySinh),
        GioiTinh = req.body.GioiTinh,
        DanToc = req.body.DanToc,
        TonGiao = req.body.TonGiao,
        CMND = req.body.CMND,
        MaNV = req.body.MaNV;

    const MaPB = req.body.MaPB;
    const MaCV = req.body.MaCV;

    const NgayBatDau = formatdmy2ymd(req.body.NgayBatDau), 
        NgayKetThuc = formatdmy2ymd(req.body.NgayKetThuc), 
        HeSoLuong = req.body.HeSoLuong,
        MaHDLD = req.body.MaHDLD;

        console.log(TenNV, DiaChi, NgaySinh, GioiTinh, DanToc, TonGiao, CMND, MaNV, MaPB, MaCV, NgayBatDau, NgayKetThuc,HeSoLuong, MaHDLD);
    
    const nhanVien = new NhanVien(MaNV, TenNV, DiaChi, NgaySinh, GioiTinh, DanToc, TonGiao, CMND, MaPB, MaCV, MaHDLD);
    
    nhanVien.save().then((result) => {
        const hdld = new HDLD(result.MaHDLD, NgayBatDau, NgayKetThuc, HeSoLuong);
        hdld.save();
        res.redirect("nhanviens/" + nhanVien.MaNV);
    });
}


exports.postDeleteNhanVien = (req, res, next) => {
    const MaNV = req.body.MaNV;

    NhanVien.deleteById(MaNV);

    res.redirect("/nhanviens");
}
