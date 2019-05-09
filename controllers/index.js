const NhanVien = require("../models/NhanVien");
const PhongBan = require("../models/PhongBan");
const HDLD = require("../models/HDLD");
const ChucVu = require("../models/ChucVu");

exports.getIndex = (req, res, next) => {
    NhanVien.fetchAll(nhanViens => {        
        PhongBan.fetchAll(phongBans => {
            ChucVu.fetchAll(chucVus => {
                res.render("./nhanvien/index", {
                    pageTitle: 'Index',
                    path: '/',
                    nhanViens: nhanViens,
                    phongBans: phongBans,
                    chucVus: chucVus
                });
            })
        })
    });
};


exports.postIndex = (req, res, next) => {
    const query1 = req.body.query1, 
    query2 = req.body.query2, 
    query3 = req.body.query3;

    const queryOt1 = req.body.queryOt1, 
    queryOt2 = req.body.queryOt2, 
    queryOt3 = req.body.queryOt3;
    
    console.log("query1: ", query1, "queryOt1: ", queryOt1);
    console.log("query2: ", query2, "queryOt2: ", queryOt2);
    console.log("query3: ", query3, "queryOt3: ", queryOt3);
    res.redirect("/");
}