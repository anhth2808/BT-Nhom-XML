const NhanVien = require("../models/NhanVien");
const PhongBan = require("../models/PhongBan");
const HDLD = require("../models/HDLD");
const ChucVu = require("../models/ChucVu");

const removeAccent = require("../util/myModule").removeAccent;


const search = (data, query, queryOt) => {
    const Regex = new RegExp(removeAccent(queryOt), "i");
    const result = data.filter(e => Regex.test(removeAccent(e[query]) ) );
    return result;
}

exports.getIndex = (req, res, next) => {
    NhanVien.fetchAll(nhanViens => {        
        PhongBan.fetchAll(phongBans => {
            ChucVu.fetchAll(chucVus => {
                res.render("./nhanvien/index", {
                    pageTitle: 'Index',
                    path: '/',
                    nhanViens: nhanViens,
                    phongBans: phongBans,
                    chucVus: chucVus,
                    searchResult: nhanViens
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

    NhanVien.fetchAll(nhanViens => {
        let result  = [];

        if (queryOt1) {
            // console.log("query1 worked", queryOt1);
            result = search(nhanViens, query1, queryOt1);
        }
        

        if (queryOt2) {
            // console.log("query2 worked", queryOt2);
            if (result.length > 0) {
                result = search(result, query2, queryOt2);
            } else {
                result = search(nhanViens, query2, queryOt2);
            }
        }

        if (queryOt3) {
            // console.log("query3 worked", queryOt3);
            if (result.length > 0) {
                result = search(result, query3, queryOt3);
            } else {
                result = search(nhanViens, query3, queryOt3);
            }
        }

        if (!queryOt1 && !queryOt2 && !queryOt3) {
            result = nhanViens;
        }
        console.log(result);
        return NhanVien.fetchAll(nhanViens => {        
            PhongBan.fetchAll(phongBans => {
                ChucVu.fetchAll(chucVus => {
                    res.render("./nhanvien/index", {
                        pageTitle: 'Index',
                        path: '/',
                        nhanViens: nhanViens,
                        phongBans: phongBans,
                        chucVus: chucVus,
                        searchResult: result
                    });
                })
            })
        });
        
        // if (result.length > 0)
        //     req.flash('searchResult', result);
    });
}