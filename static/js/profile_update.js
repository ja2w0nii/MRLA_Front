if (!token) {
    window.location.replace(`${frontend_base_url}/login.html`);
}


// 프로필 수정 전 기존 프로필 정보 조회
async function MyProfileUpdate() {
    profile = await getMyProfile();

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
    age.setAttribute("placeholder", profile.age)
    gender.setAttribute("placeholder", profile.gender)

    email.innerText = profile.email;
}
MyProfileUpdate()


// 프로필 수정
async function MyProfileUpdateForm(){
    const profile_img = document.getElementById("profile_img_file").files[0];
    console.log(profile_img)
    const nickname = document.getElementById("nickname").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    
    const formdata = new FormData();
    
    formdata.append("profile_img", profile_img);
    formdata.append("nickname", nickname);
    formdata.append("age", age);
    formdata.append("gender", gender);
    
    updateMyProfile(formdata);
}


