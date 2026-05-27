import { describe, expect, it } from "vitest";
import {
  validateEmail,
  validatePassword,
  checkAccount,
} from "../../src/loginStore.js";

describe("Kiểm thử từng hàm nhỏ của chức năng đăng nhập", () => {
  it("hàm validateEmail trả về lỗi khi email bị bỏ trống", () => {
    const result = validateEmail("");

    expect(result).toBe(false);
  });

  it("hàm validateEmail không trả về lỗi khi email có dữ liệu", () => {
    const result = validateEmail("admin@gmail.com");

    expect(result).toBe(true);
  });

  it("hàm validatePassword trả về lỗi khi mật khẩu bị bỏ trống", () => {
    const result = validatePassword("");

    expect(result).toBe(false);
  });

  it("hàm validatePassword không trả về lỗi khi mật khẩu có dữ liệu", () => {
    const result = validatePassword("123456");

    expect(result).toBe(true);
  });
});