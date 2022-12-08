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

    if (profile.age) {
        age.innerText = "나이 : " + profile.age;
    } else {
        age.innerText = "나이 : 사용 안 함"
    }

    if (profile.gender == true) {
        gender.innerText = "성별 : 남"
    } else if (profile.gender == false) {
        gender.innerText = "성별 : 여"
    } else {
        gender.innerText = "성별 : 사용 안 함"
    }
}

// 팔로잉/팔로워 리스트 가져오기
async function FollowList() {
    follows = await getFollowList();

    follows.following.forEach((following) => {
        const following_list = document.getElementById("following-modal-body");

        const newFollowing = document.createElement("li");
        newFollowing.innerText = following;
        following_list.appendChild(newFollowing);
    });

    follows.follower.forEach((follower) => {
        const follower_list = document.getElementById("follower-modal-body");

        const newFollower = document.createElement("li");
        newFollower.setAttribute("id", follower);
        newFollower.innerText = follower;
        follower_list.appendChild(newFollower);
    });
}
FollowList()