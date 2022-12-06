if (token) {
    window.location.replace(`${frontend_base_url}/index.html`);
}

async function handleLogin() {
    const loginData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };
    const response = await fetch(`${backend_base_url}/users/api/token/`, {
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(loginData),
    });

    response_json = await response.json();

    if (response.status == 200) {
        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);

        const base64Url = response_json.access.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );

        localStorage.setItem("payload", jsonPayload);
        window.location.replace(`${frontend_base_url}/main.html`);

    } else {
        alert("아이디와 비밀번호를 확인해주세요!");
        window.location.reload();
    }
}