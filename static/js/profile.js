if (!token) {
  window.location.replace(`${frontend_base_url}/signin_signup.html`);
}

// 프로필 드롭다운 가져오기
async function ProfileInfo() {
  login_user = await getName();

  const profile_img_box = document.getElementById("profile_img_box");
  let newImage = document.createElement("img");
  newImage.setAttribute("id", login_user.id)
  newImage.setAttribute("class", "dropdown_profile_img")
  newImage.src = `${backend_base_url}${login_user.profile_img}`;
  profile_img_box.appendChild(newImage);

  const profile_name_box = document.getElementById("profile_name_box");
  const newNickname = document.createElement("a")
  newNickname.setAttribute("id", login_user.id)
  newNickname.setAttribute("class", "nav-link dropdown-toggle")
  newNickname.setAttribute("href", "#")
  newNickname.setAttribute("role", "button")
  newNickname.setAttribute("data-bs-toggle", "dropdown")
  newNickname.setAttribute("aria-expanded", "false")
  newNickname.innerText = login_user.nickname
  profile_name_box.appendChild(newNickname)

  const profile_dropdown = document.getElementById("profile_dropdown")
  const newItem = document.createElement("li")
  newItem.setAttribute("class", "dropdown-item-box")
  profile_dropdown.appendChild(newItem)

  const newItem_a = document.createElement("a")
  newItem_a.setAttribute("id", login_user.id)
  newItem_a.setAttribute("class", "dropdown-item")
  newItem_a.setAttribute("onclick", "getProfilePage(this.id)")
  newItem_a.innerText = "My 프로필"
  newItem.appendChild(newItem_a)

  const newItem2 = document.createElement("li")
  newItem2.setAttribute("class", "dropdown-item-box")
  profile_dropdown.appendChild(newItem2)

  const newItem_a2 = document.createElement("a")
  newItem_a2.setAttribute("id", login_user.id)
  newItem_a2.setAttribute("class", "dropdown-item")
  newItem_a2.setAttribute("onclick", "handleLogout()")
  newItem_a2.innerText = "로그아웃"
  newItem2.appendChild(newItem_a2)
}
ProfileInfo()

// 프로필 보여주기
const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get("id");

async function Profile(user_id) {
  profile = await getProfile(user_id);
  login_user = await getName();

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
    age.innerText = "나이 : 사용 안 함";
  }

  if (profile.gender == true) {
    gender.innerText = "성별 : 남";
  } else if (profile.gender == false) {
    gender.innerText = "성별 : 여";
  } else {
    gender.innerText = "성별 : 사용 안 함";
  }

  const profile_update = document.getElementById("profile_update");

  const profile_update_button = document.createElement("button");
  profile_update_button.setAttribute("type", "button");
  profile_update_button.setAttribute("class", "btn btn-outline-secondary profile_update_button");
  profile_update_button.setAttribute("id", user_id);
  profile_update_button.setAttribute("onclick", "getProfileUpdatePage(this.id)");
  profile_update_button.innerText = "⚙️프로필 수정";

  profile_update.appendChild(profile_update_button);

  const do_follow = document.getElementById("do_follow");

  const do_follow_button = document.createElement("button");
  do_follow_button.setAttribute("id", user_id);

  for (i in profile.follower) {
    if (login_user.email == profile.follower[i]) {
      do_follow_button.setAttribute("class", "btn btn-outline-warning");
      do_follow_button.innerText = "언팔로우";
      break;
    } else {
      do_follow_button.setAttribute("class", "btn btn-warning");
      do_follow_button.innerText = "팔로우";
    }
  }

  if (profile.follower.length == 0) {
    do_follow_button.setAttribute("class", "btn btn-warning");
    do_follow_button.innerText = "팔로우";
  }

  do_follow_button.setAttribute("onclick", "DoFollow(this.id)");
  do_follow.appendChild(do_follow_button);

  const like_community = document.getElementById("recommend_community");

  const like_food_button = document.createElement("button");

  like_food_button.setAttribute("id", user_id);
  like_food_button.innerText = "추천 메뉴";
  like_food_button.setAttribute("type", "button");
  like_food_button.setAttribute("class", "btn btn-dark profile");
  like_food_button.setAttribute("onclick", "getProfilePage(this.id)");

  const like_food_icon = document.createElement("i");
  like_food_icon.setAttribute("class", "bi bi-hand-thumbs-up");
  like_food_button.appendChild(like_food_icon);

  like_community.appendChild(like_food_button);

  const like_community_button = document.createElement("button");
  like_community_button.innerText = "커뮤니티";
  like_community_button.setAttribute("id", user_id);
  like_community_button.setAttribute("type", "button");
  like_community_button.setAttribute("class", "btn btn-outline-dark profile");
  like_community_button.setAttribute("onclick", "getProfileCommunityPage(this.id)");

  const like_community_icon = document.createElement("i");
  like_community_icon.setAttribute("class", "bi bi-people-fill");
  like_community_button.appendChild(like_community_icon);

  like_community.appendChild(like_community_button);

  if (login_user.email != profile.email) {
    profile_update.style.visibility = "hidden";
  } else {
    do_follow.style.visibility = "hidden";
  }
}
Profile(user_id);

// 프로필 유저의 팔로잉/팔로워 리스트 가져오기
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
FollowList(user_id);

// 프로필 유저가 좋아요한 메뉴 리스트 가져오기
async function LikeFoodList(user_id) {
  foods = await getLikeFoodList(user_id);

  const card_list = document.getElementById("card-list");

  foods.forEach((food) => {
    const newCard = document.createElement("li");
    newCard.setAttribute("class", "card");
    newCard.setAttribute("id", food.food_id);
    newCard.setAttribute("onclick", "FoodDetail(this.id)");

    const newImg = document.createElement("a");
    newImg.setAttribute("class", "card-image");
    newImg.src = food.image;

    const image = document.createElement("img");
    image.src = food.image;
    image.setAttribute("alt", "Psychopomp");
    newImg.appendChild(image);
    newCard.appendChild(newImg);

    const newDescription = document.createElement("a");
    newDescription.setAttribute("class", "card-description");
    newCard.appendChild(newDescription);

    const newMenu = document.createElement("h2");
    const newCategory = document.createElement("p");
    newMenu.innerText = food.menu;
    newCategory.innerText = food.major_category;
    newDescription.appendChild(newMenu);
    newDescription.appendChild(newCategory);

    card_list.appendChild(newCard);
  });
}
LikeFoodList(user_id);
