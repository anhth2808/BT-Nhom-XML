const HDLD = require("../models/HDLD");

// ChucVu
exports.getHDLDs = (req, res, next) => {
    HDLD.fetchAll(hdlds => {
        res.render("./hdld/hdld-list", {
            pageTitle: 'Danh sách hợp đồng lao động',
            path: '/hdlds',
            hdlds: hdlds,
        })
    })
};