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
    console.log(image)

    nickname.innerText = profile.nickname;
    email.innerText = profile.email;
    age.innerText = profile.age;
    gender.innerText = profile.gender;
};
