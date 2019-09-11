const ChucVu = require("../models/ChucVu");

const { validationResult }  = require("express-validator");

// ChucVu
exports.getChucVus = (req, res, next) => {
    ChucVu.fetchAll(chucVus => {
        res.render("./chucvu/chucvu-list", {
            pageTitle: 'Danh sách chức vụ',
            path: '/chucvus',
            chucVus: chucVus,
        })
    })
};

// get add 
exports.getAddChucVu = (req, res, next) => {
    res.render("./chucvu/chucvu-add", {
        pageTitle: "Thêm chức vụ",
        path: '/add-chucvu',
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors: []
    });
}

exports.postAddChucVu = (req, res, next) => {
    const TenCV = req.body.TenCV;
    const PhuCap = req.body.PhuCap;

    const errors = validationResult(req);

    // 
    if (!errors.isEmpty()) {
        return res.status(422).render("./chucvu/chucvu-add", {
            pageTitle: "Thêm chức vụ",
            path: '/add-chucvu',
            editing: false,
            hasError: true,
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            chucVu: {
                TenCV: TenCV,
                PhuCap: PhuCap
            }
        });
    }

    const chucVu = new ChucVu(null, TenCV, PhuCap);
    chucVu.save().then( result => {
        // console.log(result);
        res.redirect("/chucvus");
    });
}


exports.getEditChucVu = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }

    const MaCV = req.params.MaCV;

    ChucVu.findById(MaCV, chucVu => {
        res.render("./chucvu/chucvu-add", {
            pageTitle: "Chỉnh sửa chức vụ",
            path: '/edit-chucvu',
            chucVu: chucVu,
            editing: editMode,
            hasError: false,
            errorMessage: null,
            validationErrors: [],
        })
    })
}

exports.postEditChucVu = (req, res, next) => {
    const MaCV = req.body.MaCV,
        TenCV = req.body.TenCV,
        PhuCap = req.body.PhuCap;


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render("./chucvu/chucvu-add", {
            pageTitle: "Chỉnh sửa chức vụ",
            path: '/edit-chucvu',
            chucVu: {
                MaCV: MaCV,
                TenCV: TenCV,
                PhuCap: PhuCap
            },
            editing: true,
            hasError: true,
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
        })
    }

    const chucVu = new ChucVu(MaCV, TenCV, PhuCap);
    chucVu.save().then( result => {
        res.redirect("/chucvus");
    })
}


exports.postDeleteChucVu = (req, res, next) => {
    const MaCV = req.body.MaCV;

    ChucVu.deleteById(MaCV)
        .then((err) => {
            if (!err) {
                req.flash('alert', {
                    isSuccess: true,
                    message: "Xóa thành công"
                });
                res.redirect("/chucvus");
            } else {
                req.flash('alert', {
                    isSuccess: false,
                    message: `Mã ${MaCV} đang sử dụng cho nhân viên nào đó.`
                });
                res.redirect("/chucvus");
            }
        })
        .catch(e => console.log(e));
}