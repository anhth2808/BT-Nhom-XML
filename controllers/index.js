const NhanVien = require("../models/NhanVien");
const PhongBan = require("../models/PhongBan");
const HDLD = require("../models/HDLD");
const ChucVu = require("../models/ChucVu");

const removeAccent = require("../util/myModule").removeAccent;

const ITEMS_PER_PAGE = 3;

const search = (data, query, queryOt) => {
    const Regex = new RegExp(removeAccent(queryOt), "i");
    const result = data.filter(e => Regex.test(removeAccent(e[query]) ) );
    return result;
}

exports.getIndex = (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    let totalItems;
    console.log(page);

    const query1 = req.query.query1 || "", 
    query2 = req.query.query2  || "", 
    query3 = req.query.query3  || "";

    const queryOt1 = req.query.queryOt1 || "", 
    queryOt2 = req.query.queryOt2 || "", 
    queryOt3 = req.query.queryOt3 || "";

    
    NhanVien.fetchAll(nhanViens => {
        PhongBan.fetchAll(phongBans => {
            ChucVu.fetchAll(chucVus => {
                let result  = [];
                let path;
                if (queryOt1 || queryOt2 || queryOt3) {
                    path = `query1=${query1}&queryOt1=${queryOt1}&query2=${query1}&queryOt2${queryOt1}=&query3=${query1}&queryOt3=${queryOt1}`;
                    if (queryOt1) {
                        result = search(nhanViens, query1, queryOt1);
                    }            
            
                    if (queryOt2) {
                        if (result.length > 0) {
                            result = search(result, query2, queryOt2);
                        } else {
                            result = search(nhanViens, query2, queryOt2);
                        }
                    }
            
                    if (queryOt3) {
                        if (result.length > 0) {
                            result = search(result, query3, queryOt3);
                        } else {
                            result = search(nhanViens, query3, queryOt3);
                        }
                    }
                } else {
                    path = "/"
                    result = nhanViens;
                }            

                totalItems = result.length;                                    
                result = result.slice( (page-1) * ITEMS_PER_PAGE , (page-1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
                res.render("./nhanvien/index", {
                    pageTitle: 'Index',
                    path: path,
                    phongBans: phongBans,
                    chucVus: chucVus,
                    searchResult: result,
                    currentPage: page,
                    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                    hasPreviousPage: page > 1,
                    nextPage: page + 1,
                    previousPage: page - 1,
                    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE) || 1,
                    query1 : query1 || null,
                    query2 : query2 || null,
                    query3 : query3 || null,
                    queryOt1 : queryOt1 || null,
                    queryOt2 : queryOt2 || null,
                    queryOt3 : queryOt3 || null
                });
            })
        })
    });
    
 
};