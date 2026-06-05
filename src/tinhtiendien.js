// Hàm UNIT: kiểm tra giá trị ô nhập liệu Số KWH
export function validateSoKwh(soKwh) {
    // Rule 1: bắt buộc nhập
    if(soKwh == "" || soKwh == null || soKwh == undefined) {
        return "Vui lòng nhập số KWh!";
    }
    // Rule 2: phải là số
    const parsedNumber = Number(soKwh);
    if(!Number.isFinite(parsedNumber)) {
        return "Số Kwh phải là số.";
    }
    // Rule 3: phải > 0
    if(parsedNumber < 0) {
        return "Số Kwh phải > 0.";
    }
    return ""; // Không bị lỗi gì cả => ĐÚNG
}
/*
0 - 50 kWh: 1.800 VNĐ/kWh
51 - 100 kWh: 2.000 VNĐ/kWh
Trên 100 kWh: 2.500 VNĐ/kWh
*/
// Hàm UNIT: tính ra số tiền
export function tinhToan(soKwh) {
    var tongTien = 0;
    // Trường hợp 1: số Kwh <= 50
    if(soKwh <= 50) {
        return soKwh * 1800;
    }
    // Trường hợp 2: số Kwh chắc chắn > 50
    // Phải tính tiền 2 khớp
    // tính tiền khúc bậc 1
    tongTien += 50 * 1800;
    // tính tiền khúc bậc 2
    if(soKwh <= 100) {
        tongTien += (soKwh - 50) * 2000;
        return tongTien;
    }
    // tính tiền khúc bậc 3
    tongTien += 50 * 2000;
    tongTien += (soKwh - 100) * 2500;

    return tongTien;
}

// Hàm BUSINESS: nghiệp vụ tính tiền điện
export function tinhTienDien(soKwh) {
    const soKwhError = validateSoKwh(soKwh);
    if(soKwhError) {
        return soKwhError;
    }

    var soTien = tinhToan(soKwh);
    if(soTien <= 20000) {
        return `<span style="color: red;">Số tiền phải trả là ${soTien}</span>`;
    } else if(soTien <= 50000) {
        return `<span style="color: blue;">Số tiền phải trả là ${soTien}</span>`;
    } else {
        return `<span style="color: pink;">Số tiền phải trả là ${soTien}</span>`;
    }
}
// Giữ tương thích với trang HTML đang gọi login(...) từ window.
if (typeof window !== "undefined") {
  window.tinhTienDien = tinhTienDien;
}