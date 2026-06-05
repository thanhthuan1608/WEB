import { describe, expect, it } from "vitest";
import { loadUsers } from "../../src/userStore.js";

const USER_API_URL =
    "https://jsonplaceholder.typicode.com/users";

describe("Test plan: Test nghiệp vụ tải danh sách user", () => {

    it("TC-BUS-01: lấy dữ liệu người dùng và tạo thành danh sách không thứ tự", async () => {

        const html = await loadUsers(USER_API_URL);

        expect(html).toContain("<ul>");
        expect(html).toContain("</ul>");
        expect(html).toContain("<li>");
    });

    it("TC-BUS-02: lấy đủ số lượng người dùng không?", async () => {

        const html = await loadUsers(USER_API_URL);

        const soluongLi =
            (html.match(/<li>/g) || []).length;

        expect(soluongLi).toBe(10);
    });

    it("TC-BUS-03", async () => {

        const html = await loadUsers(USER_API_URL);

        expect(html).toContain("Patricia Lebsack");
        expect(html).toContain("Chelsey Dietrich");
        expect(html).toContain("Clementina DuBuque");
    });
});