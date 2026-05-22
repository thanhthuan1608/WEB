function Login(emailInput, passwordInput) {
    if (!emailInput) return "Vui lòng nhập Email";
    
    if (!passwordInput) return "Vui lòng nhập Mật khẩu";

    if (
        emailInput === "admin@gmail.com" &&
        passwordInput === "123456"
    ) {
        return "Đăng nhập thành công";
    }

    return "Đăng nhập thất bại";
}

document.querySelector("form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    document.getElementById("status").innerText =
        Login(email, password);
});