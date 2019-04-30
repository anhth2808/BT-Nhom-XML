const PhongBan = require("../models/PhongBan");

// PhongBan

exports.getPhongBans = (req, res, next) => {
    PhongBan.fetchAll(phongBans => {
        res.render("./phongban/phongban-list", {
            pageTitle: 'Danh sách phòng ban',
            path: '/phongbans',
            phongBans: phongBans,
        })
    })
};