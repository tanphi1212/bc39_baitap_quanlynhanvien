var dsnv = new DanhSachNhanVien()
var validation = new Validation()
getLocalStorage()
renderTable(dsnv.arr)


function getEle(id) {
  return document.getElementById(id)
}


function layThongTinNV(isAdd) {
  // lấy thông tin nv
  var taiKhoan = getEle('tknv').value;
  var tenNV = getEle('name').value;
  var email = getEle('email').value;
  var matKhau = getEle('password').value;
  var ngayLam = getEle('datepicker').value;
  var luongCoBan = getEle('luongCB').value;
  var chucVu = getEle('chucvu').value;
  var gioLam = getEle('gioLam').value;
  //check validation
  var isVaild = true

  // tài khoản
  if(isAdd){
    isVaild &= validation.kiemTraRong(taiKhoan, 'tbTKNV', 'Không được để rỗng')
    && validation.kiemTraDoDaiKyTu(taiKhoan, "tbTKNV", "nhập từ 4 tới 6", 4, 6)
    && validation.kiemTraSo(taiKhoan, "tbTKNV", "phải nhập ký số")
    && validation.kiemTraTrungTaiKhoan(taiKhoan,"tbTKNV","số tài khoản bị trùng", dsnv.arr);
  }
  // tên nhân viên
  isVaild &= validation.kiemTraRong(tenNV, 'tbTen', 'Không được để rỗng')
    && validation.kiemTraChuoiKyTu(tenNV, 'tbTen', "chỉ nhập dạng chữ");
  // email
  isVaild &= validation.kiemTraRong(email, 'tbEmail', 'Không được để rỗng')
    && validation.kiemTraEmail(email, "tbEmail", "phải nhập email");
  // mật khẩu
  isVaild &= validation.kiemTraRong(matKhau, 'tbMatKhau', 'Không được để rỗng')
    && validation.kiemTraDoDaiKyTu(matKhau, 'tbMatKhau', "độ dài từ 4 tới 10 ký tự", 4, 10)
    && validation.kiemTraMatKhau(matKhau, 'tbMatKhau', "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt  ");
  // lương cơ bản
  isVaild &= validation.kiemTraRong(luongCoBan, 'tbLuongCB', 'Không được để rỗng')
    && validation.kiemTraSo(luongCoBan, "tbLuongCB", "phải nhập ký số")
    && validation.kiemTraMinMax(luongCoBan, "tbLuongCB", "lương cơ bản từ 1,000,000 đến 20,000,000", 1000000, 20000000);
  // giờ làm
  isVaild &= validation.kiemTraRong(gioLam, 'tbGiolam', 'Không được để rỗng')
    && validation.kiemTraSo(gioLam, "tbGiolam", "phải nhập ký số")
    && validation.kiemTraMinMax(gioLam, "tbGiolam", "giờ làm từ 80h -> 200h", 80, 200);
  // chức vụ
  isVaild &= validation.kiemTraChonChuc('chucvu', 'tbChucVu', "hãy chọn chức vụ");
  //Ngày làm
  isVaild &= validation.kiemTraRong(ngayLam, 'tbNgay', 'Không được để rỗng')
  &&validation.kiemTraNgayThang(ngayLam,"tbNgay","nhập đúng định dạng năm/tháng/ngày");












  if (!isVaild) {
    return
  }

  var nv = new NhanVien(taiKhoan, tenNV, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam)

  nv.tinhTongLuong();
  nv.xepLoaiNV();

  return nv;
}
// Them NV
getEle('btnThem').onclick = function () {
  xoaThongTin();
  getEle('btnThemNV').style.display = "block";
  getEle('btnCapNhat').style.display = "none";
}
getEle('btnThemNV').onclick = function () {
  var nv = layThongTinNV(true);

  if (nv) {
    dsnv.themNV(nv)
    setLocalStorage()
    renderTable(dsnv.arr)
    getEle('btnDong').click()
  }
}

//Xoa nhân viên
function deleteNV(taiKhoan) {
  console.log(123)
  dsnv.xoaNV(taiKhoan);
  renderTable(dsnv.arr);
  setLocalStorage()
}
// cập nhật nhân viên
function editNV(taiKhoan) {
  getEle('btnThemNV').style.display = "none";
  getEle('btnCapNhat').style.display = "block";

  var nv = dsnv.layThongTinNV(taiKhoan);

  getEle('tknv').value = nv.taiKhoan;
  getEle('tknv').disabled = true;
  getEle('name').value = nv.tenNV;
  getEle('email').value = nv.email;
  getEle('password').value = nv.matKhau;
  getEle('datepicker').value = nv.ngayLam;
  getEle('luongCB').value = nv.luongCoBan;
  getEle('chucvu').value = nv.chucVu;
  getEle('gioLam').value = nv.gioLam;

}

getEle('btnCapNhat').onclick = function () {
  var nv = layThongTinNV(false);
  dsnv.capNhatNV(nv);
  renderTable(dsnv.arr);
  setLocalStorage();
  getEle('btnDong').click()
}


// tim kiềm
getEle("searchName").addEventListener("keyup", function () {
  var keyword = getEle("searchName").value;
  var mangTimKiem = dsnv.timKiemLoaiNV(keyword);
  renderTable(mangTimKiem);
});









function renderTable(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var nv = data[i];
    content += `
        <tr class="text-center">
            <td>${nv.taiKhoan}</td> 
            <td>${nv.tenNV}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.loaiNV}</td>
            <td>
              <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editNV('${nv.taiKhoan}')">Edit</button>
              <button class="btn btn-danger" onclick="deleteNV('${nv.taiKhoan}')">Delete</button>
            </td>
        </tr>
        `
  }

  getEle('tableDanhSach').innerHTML = content;
}

function xoaThongTin() {
  getEle('tknv').value = "";
  getEle('tknv').disabled = false;
  getEle('name').value = "";
  getEle('email').value = "";
  getEle('password').value = "";
  getEle('datepicker').value = "";
  getEle('luongCB').value = "";
  getEle('chucvu').value = "Chọn chức vụ";
  getEle('gioLam').value = "";
}


function setLocalStorage() {
  //Convert JSON => string
  var dataString = JSON.stringify(dsnv.arr);
  //lưu data xuống LocalStorage
  localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
  if (localStorage.getItem("DSNV")) {
    var dataString = localStorage.getItem("DSNV");
    //Convert string => JSON
    dsnv.arr = JSON.parse(dataString);
    //render lại table
    renderTable(dsnv.arr);
  }
}