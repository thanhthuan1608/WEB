import { test, expect } from "@playwright/test";

test.describe("Kiểm thử đăng nhập E2E", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
//c1
  test("Hiển thị lỗi khi bỏ trống toàn bộ", async ({ page }) => {

    await page.click("#login-button");

    await expect(page.locator("#login-message")).toHaveText("Vui lòng nhập email!");

  });
//c2
  test("Hiển thị lỗi khi bỏ trống email", async ({ page }) => {

    await page.fill(
      "#password-input",
      "123456"
    );

    await page.click("#login-button");

    await expect(
      page.locator("#login-message")
    ).toHaveText(
      "Vui lòng nhập email!"
    );

  });
//c3
  test("Đăng nhập thành công", async ({ page }) => {

    await page.fill(
      "#email-input",
      "admin@gmail.com"
    );

    await page.fill(
      "#password-input",
      "123456"
    );

    await page.click("#login-button");

    await expect(
      page.locator("#login-message")
    ).toHaveText(
      "Đăng nhập thành công!"
    );

  });
//c4
  test("Sai mật khẩu", async ({ page }) => {

    await page.fill(
      "#email-input",
      "admin@gmail.com"
    );

    await page.fill(
      "#password-input",
      "111111"
    );

    await page.click("#login-button");

    await expect(
      page.locator("#login-message")
    ).toHaveText(
      "Đăng nhập thất bại!"
    );

  });

});