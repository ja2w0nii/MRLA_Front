if (token) {
  window.location.replace(`${frontend_base_url}/main.html`);
}

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// 입력 없으면 표시 현재 구현 안됨
window.onload = () => {};

window.addEventListener(
  "load",
  () => {
    const forms = document.getElementsByClassName("validation-form");

    Array.prototype.filter.call(forms, (form) => {
      form.addEventListener(
        "submit",
        function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  },
  false
);

async function handleSignIn() {

    const email = document.getElementById("email2").value
    const password = document.getElementById("password2").value
    console.log(Boolean(email))
    if (email == false) {
        alert("이메일을 입력해 주세요!")
        return false
    }
    if (password == false) {
        alert("패스워드를 입력해 주세요!")
        return false
    }

    const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })

    const response_json = await response.json()


    
      console.log(response)
      if (response.ok) {
        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh); 
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    
        }).join(''));
    
    
    
        localStorage.setItem("payload", jsonPayload);
        window.location.href = 'intro_2.html'
      } 
        else{
            for(var key in response_json) {
                console.log("key: ", key)
                console.log("value: ", response_json[key])
                console.log("----------------")
                alert(response_json[key])
              }
      }

 
}


    window.location.href = "main.html?id=1";
  } else {
    alert("아이디, 비밀번호를 확인하세요!");
  }
}

// async function handleMock() {
//     // const response = await fetch('http://127.0.0.1:8000/users/mock/', {
//     const response = await fetch('http://127.0.0.1:8000/users/mock/', {
//         headers: {
//             "Authorization": "Bearer " + localStorage.getItem("access")
//         },
//         method: 'GET',
//     })
//     const response_json = await response.json()
// }

// async function handleLogout() {
//     localStorage.removeItem("access")
//     localStorage.removeItem("refresh")
//     localStorage.removeItem("payload")
// }

// async function go_Signup() {
//     move_page('signlog.html');
// }

// function move_page(page) {
//     window.location.href = page
// }

// async function handleGoogle() {
//     let code = new URL(window.location.href).searchParams.get('code')
//     if (code) {
//         const response = await fetch('http://127.0.0.1:8000/users/google/callback/', {

//             headers: {
//                 'content-type': 'application/json',
//             },
//             method: "POST",
//             body: JSON.stringify({
//                 "code": code
//             })
//         })
//         const response_json = await response.json()

//         localStorage.setItem("access", response_json.access_token);
//         localStorage.setItem("refresh", response_json.refresh_token);

//         const base64Url = response_json.access_token.split('.')[1];
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);

//         }).join(''));

//         localStorage.setItem("payload", jsonPayload);
//         window.location.href = 'main.html'
//         }
//     }
// window.onload  = function(){
//     handleGoogle()
// }

async function handleKakao() {
  let code = new URL(window.location.href).searchParams.get("code");
  if (code) {
    const response = await fetch(`${backend_base_url}/users/kakao/callback/`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        code: code,
      }),
    });
    const response_json = await response.json();

    localStorage.setItem("access", response_json.access_token);
    localStorage.setItem("refresh", response_json.refresh_token);

    const base64Url = response_json.access_token.split(".")[1];
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
    window.location.href = "main.html";
  }
}
window.onload = function () {
  handleKakao();
};

//signUp//
// 입력 없으면 표시

async function check_value() {
  const forms = document.getElementsByClassName("validation-form");
  Array.prototype.filter.call(forms, (form) => {
    form.addEventListener(
      "submit",
      function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
}
// window.addEventListener('load', () => {
//     const forms = document.getElementsByClassName('validation-form');
//     Array.prototype.filter.call(forms, (form) => {
//         form.addEventListener('submit', function(event) {
//             if (form.checkValidity() === false) {
//                 event.preventDefault();
//                 event.stopPropagation();
//             }
//             form.classList.add('was-validated');
//         }, false);
//     });
// }, false);

async function handleSignUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password_check = document.getElementById("password_check").value;
  const nickname = document.getElementById("nickname").value;
  // const response = await fetch('http://127.0.0.1:8000/users/signup/', {
  const response = await fetch(`${backend_base_url}/users/signup/`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      password_check: password_check,
      nickname: nickname,
    }),
  });
  const response_json = await response.json();
  for (var key in response_json) {
    alert(response_json[key]);
    window.location.reload();
  }
}
