if (!token) {
    window.location.replace(`${frontend_base_url}/login.html`);
}

// 프로필 보여주기
window.onload = async function MyProfile() {
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

    nickname.innerText = "닉네임 : " + profile.nickname;
    email.innerText = profile.email;
    age.innerText = "나이 : " + profile.age;
    gender.innerText = "성별 : " + profile.gender;
};
