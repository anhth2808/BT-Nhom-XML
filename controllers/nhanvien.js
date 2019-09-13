const NhanVien = require("../models/NhanVien");
const PhongBan = require("../models/PhongBan");
const HDLD = require("../models/HDLD");
const ChucVu = require("../models/ChucVu");

const {validationResult} = require("express-validator");


const formatdmy2ymd = (date) => {
    date = date.split("-");
    return date[2] + "-" + date[1] + "-" + date[0];
}



// NhanVien
exports.getIndex = (req, res, next) => {
    NhanVien.fetchAll(nhanViens => {        
        res.render("./nhanvien/index", {
            pageTitle: 'Index',
            path: '/',
            nhanViens: nhanViens
        });
    });
};

exports.getNhanViens = (req, res, next) => {
    NhanVien.fetchAll(nhanViens => {
        res.render("./nhanvien/nhanvien-list", {
            pageTitle: 'Danh sách nhân viên',
            path: '/nhanviens',
            nhanViens: nhanViens
        });
    });
    
};

exports.getNhanVien = (req, res, next) => {
    const MaNV = req.params.MaNV;

    // should replace to promise.all late
    NhanVien.findById(MaNV, nhanVien => {
        PhongBan.findById(nhanVien.MaPB, phongBan => {
            ChucVu.findById(nhanVien.MaCV, chucVu => {
                HDLD.findById(nhanVien.MaHDLD, hdld => {
                    nhanVien.tinhLuong()
                        .then(luong => {
                            res.render("./nhanvien/nhanvien-detail", {
                                pageTitle: nhanVien.TenNV,
                                path: '/nhanviens',
                                nhanVien: nhanVien,
                                phongBan: phongBan,
                                chucVu: chucVu,
                                hdld: hdld,
                                luong: luong
                            });
                        })
                        .catch( err => {
                            const error = new Error(err);
                            error.httpStatusCode = 500;
                            return next(error);
                        });                    
                });
            
            });

        });

    });
    
};

exports.getAddNhanVien = (req, res, next) => {
    PhongBan.fetchAll((phongBans) => {
        ChucVu.fetchAll((chucVus) => {
            res.render("./nhanvien/nhanvien-add", {
                phongBans: phongBans,
                chucVus: chucVus,
                editing: false,
                hasError: false,
                errorMessage: null,
                validationErrors: []
            });
        });
    });
    
};

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

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return PhongBan.fetchAll((phongBans) => {
                ChucVu.fetchAll((chucVus) => {
                    res.status(422).render("./nhanvien/nhanvien-add", {
                        chucVuSelf: {MaCV:MaCV},
                        phongBanSelf: {MaPB: MaPB},
                        phongBans: phongBans,
                        chucVus: chucVus,
                        editing: false,
                        nhanVien: {
                            TenNV: TenNV,
                            DiaChi: DiaChi,
                            NgaySinh: NgaySinh,
                            GioiTinh: GioiTinh,
                            DanToc: DanToc,
                            TonGiao: TonGiao,
                            CMND: CMND
                        },
                        hdld: {
                            NgayBatDau: NgayBatDau,
                            NgayKetThuc: NgayKetThuc,
                            HeSoLuong: HeSoLuong
                        },
                        hasError: true,
                        errorMessage: errors.array()[0].msg,
                        validationErrors: errors.array()
                    });
                });
            });
    }

    const nhanVien = new NhanVien(null, TenNV, DiaChi, NgaySinh, GioiTinh, DanToc, TonGiao, CMND, MaPB, MaCV, null);
    nhanVien.save()
        .then((result) => {
            const hdld = new HDLD(result.MaHDLD, NgayBatDau, NgayKetThuc, HeSoLuong);
            hdld.save()            
            res.redirect("/nhanviens/" + nhanVien.MaNV);
        }).catch( err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });;
    
};

exports.getEditNhanVien = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }

    const MaNV = req.params.MaNV;

    // should replace to promise.all late
    NhanVien.findById(MaNV, nhanVien => {
        PhongBan.findById(nhanVien.MaPB, phongBan => {
            ChucVu.findById(nhanVien.MaCV, chucVu => {
                HDLD.findById(nhanVien.MaHDLD, hdld => {
                    PhongBan.fetchAll(phongBans => {
                        ChucVu.fetchAll(chucVus => {
                            res.render("./nhanvien/nhanvien-add", {
                                nhanVien: nhanVien,
                                chucVuSelf: chucVu,
                                phongBanSelf: phongBan,
                                phongBans: phongBans,
                                chucVus: chucVus,
                                hdld: hdld,
                                editing: editMode,
                                hasError: false,
                                errorMessage: null,
                                validationErrors: []
                            });
                        });
                    })
                });
            });
        });
    });
    
};

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
    
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // promise.all plz
        return  PhongBan.fetchAll(phongBans => {
                    ChucVu.fetchAll(chucVus => {
                        res.render("./nhanvien/nhanvien-add", {                                            
                            chucVuSelf: {MaCV:MaCV},
                            phongBanSelf: {MaPB: MaPB},
                            phongBans: phongBans,
                            chucVus: chucVus,
                            nhanVien: {
                                MaNV: MaNV,
                                TenNV: TenNV,
                                DiaChi: DiaChi,
                                NgaySinh: NgaySinh,
                                GioiTinh: GioiTinh,
                                DanToc: DanToc,
                                TonGiao: TonGiao,
                                CMND: CMND
                            },
                            hdld: {
                                MaHDLD: MaHDLD,
                                NgayBatDau: NgayBatDau,
                                NgayKetThuc: NgayKetThuc,
                                HeSoLuong: HeSoLuong
                            },
                            editing: true,
                            hasError: true,
                            errorMessage: errors.array()[0].msg,
                            validationErrors: errors.array()
                        });
                    });
        })
    }

    const nhanVien = new NhanVien(MaNV, TenNV, DiaChi, NgaySinh, GioiTinh, DanToc, TonGiao, CMND, MaPB, MaCV, MaHDLD);
    
    nhanVien.save().then((result) => {
        const hdld = new HDLD(result.MaHDLD, NgayBatDau, NgayKetThuc, HeSoLuong);
        hdld.save();
        res.redirect("/nhanviens/" + nhanVien.MaNV);
    }).catch( err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

exports.postDeleteNhanVien = (req, res, next) => {
    const MaNV = req.body.MaNV;

    NhanVien.deleteById(MaNV);

    res.redirect("/nhanviens");
};




