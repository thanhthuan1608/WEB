// Hàm UNIT: kiểm tra số tiền
export function validateSoTien(sotien) {
    if(sotien == "" || sotien == null || sotien == undefined) {
        return "Vui lòng nhập số tiền.";
    }
    if(sotien <= 0) {
        return "Số tiền phải > 0";
    }
    return "";
}
// Hàm UNIT: kiểm tra phần trăm
export function validatePhanTram(phantram) {
    if(phantram == "" || phantram == null || phantram == undefined) {
        return "Vui lòng nhập phần trăm giảm giá.";
    }
    if(phantram < 0 || phantram > 100) {
        return "Vui lòng nhập phần trăm từ 0-100.";
    }
    return "";
}
// Hàm UNIT
export function tinhTienGiamGia(sotien, phantram) {
    const giamgia = (sotien * phantram) / 100;
    const kq = sotien - giamgia;
    return kq;
}
// Hàm BUSINESS: nghiệp vụ tính tiền giảm giá
export function tinhTien(sotien, giamgia) {
    // validate số tiền
    const sotienError = validateSoTien(sotien);
    if(sotienError != "") return sotienError;
    // validate phần trăm
    const giamgiaError = validatePhanTram(giamgia);
    if(giamgiaError != "") return giamgiaError;
    // tính toán...
    const kq = tinhTienGiamGia(sotien, giamgia);
    return "Số tiền phải trả là: " + kq;
}

// Giữ tương thích với trang HTML đang gọi login(...) từ window.
if (typeof window !== "undefined") {
  window.tinhTien = tinhTien;
}