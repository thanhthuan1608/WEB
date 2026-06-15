// ==============================
// UNIT
// ==============================

async function fetchTodos(apiUrl) {

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Không kết nối được API.");
    }

    return await response.json();
}

async function createTodo(apiUrl, payload) {

    const response = await fetch(
        apiUrl,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
    );

    if (!response.ok) {
        throw new Error("Không thêm được dữ liệu.");
    }

    return await response.json();
}

async function updateTodo(apiUrl, id, payload) {

    const response = await fetch(
        `${apiUrl}/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
    );

    if (!response.ok) {
        throw new Error("Không cập nhật được.");
    }

    return await response.json();
}

async function patchTodo(apiUrl, id, payload) {

    const response = await fetch(
        `${apiUrl}/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
    );

    if (!response.ok) {
        throw new Error("Không cập nhật trạng thái.");
    }

    return await response.json();
}

async function deleteTodo(apiUrl, id) {

    const response = await fetch(
        `${apiUrl}/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Không xóa được.");
    }
}

function validateTodos(data) {

    if (!Array.isArray(data)) {
        return "Dữ liệu phải là mảng.";
    }

    for (const item of data) {

        if (
            item.id === undefined ||
            item.title === undefined ||
            item.completed === undefined
        ) {
            return "Dữ liệu không hợp lệ.";
        }
    }

    return "Dữ liệu hợp lệ.";
}

// ==============================
// BUSINESS
// ==============================

async function loadTodos(apiUrl) {

    const data = await fetchTodos(apiUrl);

    const result =
        validateTodos(data);

    if (result !== "Dữ liệu hợp lệ.") {
        throw new Error(result);
    }

    return data;
}

async function addTodo(apiUrl, title) {

    return await createTodo(
        apiUrl,
        {
            title,
            completed: false
        }
    );
}

async function editTodo(
    apiUrl,
    todo,
    newTitle
) {

    return await updateTodo(
        apiUrl,
        todo.id,
        {
            ...todo,
            title: newTitle
        }
    );
}

async function toggleTodo(
    apiUrl,
    id,
    completed
) {

    return await patchTodo(
        apiUrl,
        id,
        {
            completed
        }
    );
}

async function removeTodo(
    apiUrl,
    id
) {

    await deleteTodo(
        apiUrl,
        id
    );
}

// ==============================
// DISPLAY
// ==============================

function renderTodos(
    todos,
    resultDiv
) {

    if (todos.length === 0) {

        resultDiv.innerHTML =
            `
            <li>
                Chưa có công việc
            </li>
            `;

        return;
    }

    let html = "";

    todos.forEach(todo => {

        html += `
            <li>

                <input
                    type="checkbox"
                    class="chk-completed"
                    data-id="${todo.id}"
                    ${
                        todo.completed
                        ? "checked"
                        : ""
                    }
                >

                <span
                    style="
                    ${
                        todo.completed
                        ? "text-decoration:line-through;color:gray;"
                        : ""
                    }
                    "
                >
                    ${todo.title}
                </span>

                <button
                    class="btn-edit"
                    data-id="${todo.id}">
                    📝 Sửa
                </button>

                <button
                    class="btn-delete"
                    data-id="${todo.id}">
                    ❌ Xóa
                </button>

            </li>
        `;
    });

    resultDiv.innerHTML = html;
}

function showMessage(message) {

    const msg =
        document.getElementById(
            "todo-msg"
        );

    msg.innerHTML =
        `<b>${message}</b>`;

    setTimeout(() => {

        msg.innerHTML = "";

    }, 3000);
}

// ==============================
// MAIN
// ==============================

const API_URL =
    "http://localhost:3000/WEB";

const todoList =
    document.getElementById(
        "todo-list"
    );

const todoForm =
    document.getElementById(
        "todo-form"
    );

let todos = [];

async function refreshTodos() {

    try {

        todos =
            await loadTodos(
                API_URL
            );

        renderTodos(
            todos,
            todoList
        );

    } catch (error) {

        console.error(error);

        showMessage(
            error.message
        );
    }
}

refreshTodos();

// ==============================
// THÊM
// ==============================

todoForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const title =
            document
                .getElementById(
                    "todo-title-input"
                )
                .value
                .trim();

        if (!title) {

            showMessage(
                "Vui lòng nhập công việc."
            );

            return;
        }

        try {

            await addTodo(
                API_URL,
                title
            );

            document
                .getElementById(
                    "todo-title-input"
                )
                .value = "";

            showMessage(
                "Thêm công việc thành công."
            );

            refreshTodos();

        } catch (error) {

            showMessage(
                error.message
            );
        }
    }
);

// ==============================
// CLICK EVENT
// ==============================

todoList.addEventListener(
    "click",
    async (event) => {

        const id =
            event.target.dataset.id;

        if (!id) {
            return;
        }

        const todo =
            todos.find(
                x => x.id == id
            );

        try {

            if (
                event.target.classList.contains(
                    "btn-delete"
                )
            ) {

                const confirmed =
                    confirm(
                        `Bạn có chắc muốn xóa "${todo.title}"?`
                    );

                if (!confirmed) {
                    return;
                }

                await removeTodo(
                    API_URL,
                    id
                );

                showMessage(
                    "Xóa thành công."
                );

                refreshTodos();
            }

            if (
                event.target.classList.contains(
                    "btn-edit"
                )
            ) {

                const newTitle =
                    prompt(
                        "Nhập tên mới:",
                        todo.title
                    );

                if (
                    !newTitle ||
                    !newTitle.trim()
                ) {
                    return;
                }

                await editTodo(
                    API_URL,
                    todo,
                    newTitle.trim()
                );

                showMessage(
                    "Sửa thành công."
                );

                refreshTodos();
            }

        } catch (error) {

            showMessage(
                error.message
            );
        }
    }
);

// ==============================
// CHECKBOX
// ==============================

todoList.addEventListener(
    "change",
    async (event) => {

        if (
            !event.target.classList.contains(
                "chk-completed"
            )
        ) {
            return;
        }

        try {

            await toggleTodo(
                API_URL,
                event.target.dataset.id,
                event.target.checked
            );

            showMessage(
                "Cập nhật trạng thái thành công."
            );

            refreshTodos();

        } catch (error) {

            showMessage(
                error.message
            );
        }
    }
);