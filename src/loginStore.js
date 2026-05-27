export function validateEmail(emailInput) {
  if (!emailInput) {
    return false;
  }

  return true;
}

export function validatePassword(passwordInput) {
  if (!passwordInput) {
    return false;
  }

  return true;
}

export function login(emailInput, passwordInput) {
    // 1. Kiểm tra email
    var emailValid = validateEmail(emailInput);
    if(!emailValid) {
        return "Vui lòng nhập email!";
    }
    // 2. Kiểm tra mật khẩu
    var passwordValid = validatePassword(passwordInput);
    if(!passwordValid) {
        return "Vui lòng nhập mật khẩu!";
    }
    // 3. Kiểm tra logic/nghiệp vụ: 
    // Tài khoản có đúng không?
    // Giả sử: admin@gmail.com và 123456 là đúng
    if(emailInput == "admin@gmail.com" 
        && passwordInput == "123456") {
        return "Đăng nhập thành công!";
    } else {
        return "Đăng nhập thất bại!";
    }
}

// Giữ tương thích với trang HTML đang gọi login(...) từ window.
if (typeof window !== "undefined") {
  window.login = login;
}