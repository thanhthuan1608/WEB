// Hàm UNIT: lấy danh sách người dùng từ API
export async function fetchUsers(apiUrl) {

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Không kết nối được API URL.");
    }

    return await response.json();
}

// Hàm UNIT: kiểm tra dữ liệu người dùng
export function validateUsers(data) {

    if (!Array.isArray(data)) {
        return "Dữ liệu phải là mảng.";
    }

    if (data.length === 0) {
        return "Không có dữ liệu nào.";
    }

    const isValid = data.every(user =>
        "id" in user &&
        "name" in user &&
        "email" in user &&
        "phone" in user
    );

    if (!isValid) {
        return "Cấu trúc dữ liệu phải có các key: id, name, email, phone.";
    }

    return "Dữ liệu hợp lệ.";
}

// BUSINESS
export async function loadUsers(apiUrl) {

    const data = await fetchUsers(apiUrl);

    const result = validateUsers(data);

    if (result !== "Dữ liệu hợp lệ.") {
        return result;
    }

    let html = "<ul>";

    data.forEach(user => {

        html += `
            <li>
                <strong>Họ tên:</strong> ${user.name}<br>
                <strong>Email:</strong> ${user.email}<br>
                <strong>Thành phố:</strong> ${user.address.city}
            </li>
        `;
    });

    html += "</ul>";

    return html;
}

// Hiển thị ra HTML
export async function displayUsers(apiUrl, resultDiv) {

    const html = await loadUsers(apiUrl);

    resultDiv.innerHTML = html;
}

// Giữ tương thích với HTML
if (typeof window !== "undefined") {
    window.fetchUsers = fetchUsers;
    window.validateUsers = validateUsers;
    window.loadUsers = loadUsers;
    window.displayUsers = displayUsers;
}