<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output method="html"/>
    <xsl:template match="/">
        <html>
            <head>
                <title>CHƯƠNG TRÌNH QUẢN LÝ NHÂN VIÊN</title>
            </head>
            <body>
                <h1 align="center">
                    <font color="red">Danh Sách Nhân Viên</font>
                </h1>
                <table align="center" border="1">
                    <tr style="color: blue ">
                        <th width="40">STT</th>
                        <th width="130">Mã Nhân Viên</th>
                        <th width="130">Mã Phòng Ban</th>
                        <th width="130">Mã Chức Vụ</th>
                        <th width="210">Mã Hợp Đồng Lao Động</th>
                    </tr>
                    <xsl:for-each select="QuanLyNhanVien/NhanVien">
                        <tr>
                            <th><xsl:value-of select="position()"/></th>
                            <th><xsl:value-of select="MaNV"/></th>
                            <th><xsl:value-of select="MaPB"/></th>
                            <th><xsl:value-of select="MaCV"/></th>
                            <th><xsl:value-of select="MaHDLD"/></th>
                        </tr>
                    </xsl:for-each>
                </table>
                <h1 align="center">
                    <font color="red">Thông Tin Nhân Viên</font>
                </h1>
                <table align="center" border="1">
                    <tr style="color: blue ">
                        <th width="40">STT</th>
                        <th width="130">Mã Nhân Viên</th>
                        <th width="130">Tên Nhân Viên</th>
                        <th width="360">Địa Chỉ</th>
                        <th width="100">Ngày Sinh</th>
                        <th width="100" >Giới Tính</th>
                        <th width="100">Dân Tộc</th>
                        <th width="100">Tôn Giáo</th>
                        <th width="100">Số CMND</th>
                    </tr>
                    <xsl:for-each select="QuanLyNhanVien/NhanVien">
                        <tr>
                            <th><xsl:value-of select="position()"/></th>
                            <th><xsl:value-of select="MaNV"/></th>
                            <th><xsl:value-of select="TenNV"/></th>
                            <th><xsl:value-of select="DiaChi"/></th>
                            <th><xsl:value-of select="NgaySinh"/></th>
                            <th><xsl:value-of select="GioiTinh"/></th>
                            <th><xsl:value-of select="DanToc"/></th>
                            <th><xsl:value-of select="TonGiao"/></th>
                            <th><xsl:value-of select="CMND"/></th>
                        </tr>
                    </xsl:for-each>
                </table>
                <h1 align="center">
                    <font color="red">Thông Tin Phòng Ban</font>
                </h1>
                <table align="center" border="1">
                    <tr style="color: blue ">
                        <th width="40">STT</th>
                        <th width="130">Mã Phòng Ban</th>
                        <th width="130">Tên Phòng Ban</th>
                    </tr>
                    <xsl:for-each select="QuanLyNhanVien/PhongBan">
                        <tr>
                            <th><xsl:value-of select="position()"/></th>
                            <th><xsl:value-of select="MaPB"/></th>
                            <th><xsl:value-of select="TenPB"/></th>
                        </tr>
                    </xsl:for-each>
                </table>
                <h1 align="center">
                    <font color="red">Thông Tin Chức Vụ</font>
                </h1>
                <table align="center" border="1">
                    <tr style="color: blue ">
                        <th width="40" >STT</th>
                        <th width="130">Mã Chức Vụ</th>
                        <th width="130">Tên Chức Vụ</th>
                        <th width="130">Phụ Cấp</th>
                    </tr>
                    <xsl:for-each select="QuanLyNhanVien/ChucVu">
                        <tr>
                            <th><xsl:value-of select="position()"/></th>
                            <th><xsl:value-of select="MaCV"/></th>
                            <th><xsl:value-of select="TenCV"/></th>
                            <th><xsl:value-of select="PhuCap"/></th>
                        </tr>
                    </xsl:for-each>
                </table>
                <h1 align="center">
                    <font color="red">Thông Tin Hợp Đồng Lao Động</font>
                </h1>
                <table align="center" border="1">
                    <tr style="color: blue ">
                        <th width="40" >STT</th>
                        <th width="200">Mã Hợp Đồng Lao Động</th>
                        <th width="130">Ngày Bắt Đầu</th>
                        <th width="130">Ngày Kết Thúc</th>
                        <th width="130">Hệ Số Lương</th>
                    </tr>
                    <xsl:for-each select="QuanLyNhanVien/HDLD">
                        <tr>
                            <th><xsl:value-of select="position()"/></th>
                            <th><xsl:value-of select="MaHDLD"/></th>
                            <th><xsl:value-of select="NgayBatDau"/></th>
                            <th><xsl:value-of select="NgayKetThuc"/></th>
                            <th><xsl:value-of select="HeSoLuong"/></th>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>