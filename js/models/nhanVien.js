function NhanVien(_taiKhoan,_tenNV,_email,_matKhau,_ngayLam,_luongCoBan,_chucVu,_gioLam) {
    // property
    this.taiKhoan = _taiKhoan;
    this.tenNV = _tenNV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.loaiNV = "";
    // method
    this.tinhTongLuong = function(){
        if(this.chucVu === "Sếp"){
            this.tongLuong = parseFloat(this.luongCoBan)*3
        }else if(this.chucVu === "Trưởng phòng"){
            this.tongLuong = parseFloat(this.luongCoBan)*2
        }else if(this.chucVu === "Nhân viên"){
            this.tongLuong = parseFloat(this.luongCoBan)
        }
    }

    this.xepLoaiNV = function(){
        if(this.gioLam >= 192 ){
            this.loaiNV = "Xuất sắc";
        }else if(this.gioLam < 192 && this.gioLam >=176){
            this.loaiNV = "Giỏi";
        }else if(this.gioLam < 176 && this.gioLam >= 160){
            this.loaiNV = "Khá";
        }else{
            this.loaiNV = "Trung bình";
        }
    }

}