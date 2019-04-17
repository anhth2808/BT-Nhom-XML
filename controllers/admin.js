const fs = require("fs");
const xml2js = require("xml2js");
const Builder = xml2js.Builder();
const parseString = xml2js.parseString;
const path = require("path");

const NhanVien = require("../models/NhanVien");

exports.getEmployees = (req, res) => {
    NhanVien.fetchAll(nhanViens => {
        
        res.render("./admin/employees", {
            pageTitle: 'Index',
            path: '/admin/add-product',
            nhanViens: nhanViens
        });
    });
    
};


exports.getEmployee = (req, res) => {
    NhanVien.findById("MaNV0", nhanVien => {
        console.log("sss:", nhanVien);
        res.render("./admin/employee-detail", {
            pageTitle: 'Chi tiết nhân viên',
            path: '/admin/add-product',
            nhanVien: nhanVien
        })
    });
};