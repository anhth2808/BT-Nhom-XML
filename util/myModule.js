module.exports.removeAccent = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

module.exports.removeNotWordCharacter = (str) => {
    str = str.replace(/[^0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi, '');
    return str;
}

module.exports.removeLeftoverSpace = (str) => {
    str = str.replace(/\s+/g, ' ');
    return str;
}

module.exports.createId = (doc, type) => {
    let typeId = "";
    let tagId = "";
    let reg = /[1-9]\d*/;
    let lastItem;
    let result =  "";
    switch(type) {
        case "NhanVien":
            typeId = "NV";
            tagId = "MaNV";
            break;
        case "ChucVu":
            typeId = "CV";
            tagId = "MaCV";
            break;
        case "PhongBan":
            typeId = "PB";
            tagId = "MaPB";
            break;
        case "HDLD":
            typeId = "HDLD";
            tagId = "MaHDLD";
            break;
    }
    
    const e = doc.getElementsByTagName(type);
    if (e.length > 0) {
        // get the last Item
        lastItem = e[e.length - 1].getElementsByTagName(tagId)[0].childNodes[0].nodeValue;
        // using regex to get number
        lastItem = lastItem.match(reg)[0];
        lastItem = parseInt(lastItem)    
        lastItem++;
        lastItem = lastItem.toString();
        result = lastItem;
        
        for (let i = 0 ; i < (4 - lastItem.length); i++) {
            result = "0" + result;
        }
    } else {
        return typeId + "0001";
    }
	
	return typeId + result;
}