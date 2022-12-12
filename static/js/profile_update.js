if (!token) {
    window.location.replace(`${frontend_base_url}/login.html`);
}

// 프로필 보여주기
const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get("id");


// 프로필 수정 전 기존 프로필 정보 조회
async function MyProfileUpdate(user_id) {
    profile = await getProfile(user_id);

    const profile_img = document.getElementById("profile_img");
    const nickname = document.getElementById("nickname");
    const email = document.getElementById("email");
    const age = document.getElementById("age");
    const gender = document.getElementById("gender");

    let image = document.createElement("img");
    image.setAttribute("class", "profile_image");
    image.src = `${backend_base_url}${profile.profile_img}`;
    profile_img.appendChild(image);

    nickname.setAttribute("placeholder", profile.nickname)

    if (profile.age) {
        age.setAttribute("placeholder", profile.age)
    } else {
        age.setAttribute("placeholder", "사용 안 함")
    }

    if (profile.gender == true) {
        gender.setAttribute("placeholder", "남")
    } else if (profile.gender == false) {
        gender.setAttribute("placeholder", "여")
    } else {
        gender.setAttribute("placeholder", "사용 안 함")
    }

    email.innerText = profile.email;
}
MyProfileUpdate(user_id)


// 프로필 수정
async function MyProfileUpdateForm() {
    let profile_img = document.getElementById("profile_img_file").files[0];
    let nickname = document.getElementById("nickname").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    
    const formdata = new FormData();

    if (profile_img) {
        formdata.append("profile_img", profile_img);
    }
    
    formdata.append("nickname", nickname);

    if (age) {
        formdata.append("age", age);
    }
    
    if (gender == "남") {
        formdata.append("gender", true);
    } else if (gender == "여") {
        formdata.append("gender", false);
    } else {
        formdata.append("gender", "");
    }
    
    updateMyProfile(formdata);
}


// 드롭다운 선택 시 성별 값 변경
async function ChangeGender(id) {
    const gender = document.getElementById("gender");
    gender.setAttribute("value", id)
}


