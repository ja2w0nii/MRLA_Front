if (!token) {
    window.location.replace(`${frontend_base_url}/login.html`);
}

// 프로필 보여주기
const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get("id");

async function Profile(user_id) {
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

    const do_follow = document.getElementById("do_follow");
    
    const do_follow_button = document.createElement("button");
    do_follow_button.innerText = "팔로우";
    do_follow_button.setAttribute("id", user_id);
    do_follow_button.setAttribute("class", "btn btn-warning");
    do_follow_button.setAttribute("onclick", "DoFollow(this.id)");
    do_follow.appendChild(do_follow_button);
}
Profile(user_id)
    

// 팔로잉/팔로워 리스트 가져오기
async function FollowList(user_id) {
    follows = await getFollowList(user_id);

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
FollowList(user_id)

// 해당 프로필 유저가 좋아요한 메뉴 리스트 가져오기
// async function MyFoodList() {
//     foods = await getMyFoodList();

//     const card_list = document.getElementById("card-list");

//     foods.forEach((food) => {
//         const newCard = document.createElement("li");
//         newCard.setAttribute("class", "card");
//         newCard.setAttribute("id", "card");

//         const newImg = document.createElement("a");
//         newImg.setAttribute("class", "card-image");
//         newImg.src = `https://storage.googleapis.com/jjalbot/2018/12/IPJVU9tjx/zzal.jpg`;
//         newImg.setAttribute("style", newImg.src)
//         newImg.setAttribute("data-image-full", newImg.src)

//         const image = document.createElement("img");
//         image.src = `https://storage.googleapis.com/jjalbot/2018/12/IPJVU9tjx/zzal.jpg`;
//         image.setAttribute("alt", "Psychopomp")
//         newImg.appendChild(image)
//         newCard.appendChild(newImg)

//         const newDescription = document.createElement("a");
//         newDescription.setAttribute("class", "card-description");
//         newCard.appendChild(newDescription)

//         const newMenu = document.createElement("h2");
//         const newCategory = document.createElement("p");
//         newMenu.innerText = food.menu;
//         newCategory.innerText = food.major_category;
//         newDescription.appendChild(newMenu)
//         newDescription.appendChild(newCategory)

//         card_list.appendChild(newCard)
//     });
// }
// MyFoodList()