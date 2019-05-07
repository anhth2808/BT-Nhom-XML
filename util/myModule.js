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
        console.log(e.length);
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