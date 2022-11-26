function DanhSachNhanVien() {
    this.arr = [];

    this.themNV = function (nv) {
        this.arr.push(nv)
    }
    this.capNhatNV = function (nv) {
        var index = this.timViTriNV(nv.taiKhoan);
        if(index !== -1){
            this.arr[index] = nv;
        }
    }
    this.xoaNV = function (taiKhoan) {
        var index = this.timViTriNV(taiKhoan);
        if (index !== -11) {
            this.arr.splice(index, 1)
        }
    }

    this.layThongTinNV = function(taiKhoan){
        var index = this.timViTriNV(taiKhoan);
        if (index !== -1) {
            return this.arr[index];
        }
    }

    this.timViTriNV = function (taiKhoan) {
        var index = -1;
        for (var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i]
            if (nv.taiKhoan === taiKhoan) {
                index = i;
                break
            }
        }
        return index;
    }

    this.timKiemLoaiNV = function (keyword) {
        /**
         * 0. tạo mangTimKiem = []
         * 1. Duyệt mảng arr
         *      => sv = arr[i]
         * 2. Nếu sv.tenSV trùng với keyword
         *      => true => push sv vào mangTimKiem
         * 3. trả về mangTimKiem
         */
        var mangTimKiem = [];
    
        for (var i = 0; i < this.arr.length; i++) {
          var nv = this.arr[i];
          //chuyển tenSV về chự thường
          var loaiNVLowerCase = nv.loaiNV.toLowerCase();
          var keywordLowerCase = keyword.toLowerCase();
          if (loaiNVLowerCase.indexOf(keywordLowerCase) !== -1) {
            mangTimKiem.push(nv);
          }
        }
    
        return mangTimKiem;
      };


}