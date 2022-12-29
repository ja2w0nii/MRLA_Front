if (!token) {
  window.location.replace(`${frontend_base_url}/signin_signup.html`);
}

// 프로필 보여주기
const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get("id");

// 프로필 드롭다운 가져오기
async function ProfileInfo() {
  login_user = await getName();

  const profile_img_box = document.getElementById("profile_img_box");
  let newImage = document.createElement("img");
  newImage.setAttribute("id", login_user.id);
  newImage.setAttribute("class", "dropdown_profile_img");
  newImage.src = `${backend_base_url}${login_user.profile_img}`;
  profile_img_box.appendChild(newImage);

  const profile_name_box = document.getElementById("profile_name_box");
  const newNickname = document.createElement("a");
  newNickname.setAttribute("id", login_user.id);
  newNickname.setAttribute("class", "nav-link dropdown-toggle");
  newNickname.setAttribute("href", "#");
  newNickname.setAttribute("role", "button");
  newNickname.setAttribute("data-bs-toggle", "dropdown");
  newNickname.setAttribute("aria-expanded", "false");
  newNickname.innerText = login_user.nickname;
  profile_name_box.appendChild(newNickname);

  const profile_dropdown = document.getElementById("profile_dropdown");
  const newItem = document.createElement("li");
  newItem.setAttribute("class", "dropdown-item-box");
  profile_dropdown.appendChild(newItem);

  const newItem_a = document.createElement("a");
  newItem_a.setAttribute("id", login_user.id);
  newItem_a.setAttribute("class", "dropdown-item");
  newItem_a.setAttribute("onclick", "getProfilePage(this.id)");
  newItem_a.innerText = "My 프로필";
  newItem.appendChild(newItem_a);

  const newItem2 = document.createElement("li");
  newItem2.setAttribute("class", "dropdown-item-box");
  profile_dropdown.appendChild(newItem2);

  const newItem_a2 = document.createElement("a");
  newItem_a2.setAttribute("id", login_user.id);
  newItem_a2.setAttribute("class", "dropdown-item");
  newItem_a2.setAttribute("onclick", "handleLogout()");
  newItem_a2.innerText = "로그아웃";
  newItem2.appendChild(newItem_a2);
}
ProfileInfo();

async function Profile(user_id) {
  profile = await getProfile(user_id);
  login_user = await getName();

  const profile_img = document.getElementById("profile_img");
  const nickname = document.getElementById("nickname");

  let image = document.createElement("img");
  image.setAttribute("class", "profile_image");
  image.src = `${backend_base_url}${profile.profile_img}`;
  profile_img.appendChild(image);

  nickname.innerText = profile.nickname;

  const profile_update = document.getElementById("profile_update");

  const profile_update_button = document.createElement("button");
  profile_update_button.setAttribute("type", "button");
  profile_update_button.setAttribute("class", "btn btn-outline-secondary profile_update_button");
  profile_update_button.setAttribute("id", user_id);
  profile_update_button.setAttribute("onclick", "getProfileUpdatePage(this.id)");
  profile_update_button.innerText = "⚙️프로필 수정";

  profile_update.appendChild(profile_update_button);

  const like_community = document.getElementById("recommend_community");

  const like_food_button = document.createElement("button");
  like_food_button.setAttribute("id", user_id);
  like_food_button.innerText = "좋아요 메뉴 ";
  like_food_button.setAttribute("type", "button");
  like_food_button.setAttribute("class", "btn btn-outline-dark profile");
  like_food_button.setAttribute("onclick", "getProfilePage(this.id)");

  const like_food_icon = document.createElement("i");
  like_food_icon.setAttribute("class", "bi bi-hand-thumbs-up");
  like_food_button.appendChild(like_food_icon);
  like_community.appendChild(like_food_button);

  const like_community_button = document.createElement("button");
  like_community_button.innerText = "좋아요 게시글 ";
  like_community_button.setAttribute("id", user_id);
  like_community_button.setAttribute("type", "button");
  like_community_button.setAttribute("class", "btn btn-dark profile");
  like_community_button.setAttribute("onclick", "getProfileCommunityPage(this.id)");

  const like_community_icon = document.createElement("i");
  like_community_icon.setAttribute("class", "bi bi-people-fill");
  like_community_button.appendChild(like_community_icon);
  like_community.appendChild(like_community_button);

  const my_community_button = document.createElement("button");
  my_community_button.innerText = "작성한 게시글 ";
  my_community_button.setAttribute("id", user_id);
  my_community_button.setAttribute("type", "button");
  my_community_button.setAttribute("class", "btn btn-outline-dark profile");
  my_community_button.setAttribute("onclick", "getProfileMyCommunityPage(this.id)");

  const my_community_icon = document.createElement("i");
  my_community_icon.setAttribute("class", "bi bi-postcard-heart");
  my_community_button.appendChild(my_community_icon);
  like_community.appendChild(my_community_button);

  if (login_user.email != profile.email) {
    profile_update.style.visibility = "hidden";
  } else {
    do_follow.style.visibility = "hidden";
  }
}
Profile(user_id);

async function Follow(user_id) {
  profile = await getProfile(user_id);
  login_user = await getName();

  const do_follow = document.getElementById("do_follow");

  const do_follow_button = document.createElement("button");
  do_follow_button.setAttribute("id", user_id);
  do_follow_button.setAttribute("type", "button");

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
}
Follow(user_id);

// 프로필 유저의 팔로잉/팔로워 리스트 가져오기
async function FollowList(user_id) {
  followings = await getFollowingList(user_id);
  followers = await getFollowerList(user_id);

  followings.forEach((following) => {
    const following_list = document.getElementById("following-modal-body");

    const newFollowingBox = document.createElement("div");
    newFollowingBox.setAttribute("class", "following-box");

    const newImage = document.createElement("img");
    newImage.src = `${backend_base_url}${following.profile_img}`;
    newImage.setAttribute("id", following.id);
    newImage.setAttribute("onclick", "getProfilePage(this.id)");
    newFollowingBox.appendChild(newImage);

    const newFollowing = document.createElement("li");
    newFollowing.innerText = following.nickname;
    newFollowing.setAttribute("id", following.id);
    newFollowing.setAttribute("onclick", "getProfilePage(this.id)");
    newFollowingBox.appendChild(newFollowing);

    following_list.appendChild(newFollowingBox);
  });

  followers.forEach((follower) => {
    const follower_list = document.getElementById("follower-modal-body");

    const newFollowerBox = document.createElement("div");
    newFollowerBox.setAttribute("class", "follower-box");

    const newImage = document.createElement("img");
    newImage.src = `${backend_base_url}${follower.profile_img}`;
    newImage.setAttribute("id", follower.id);
    newImage.setAttribute("onclick", "getProfilePage(this.id)");
    newFollowerBox.appendChild(newImage);

    const newFollower = document.createElement("li");
    newFollower.innerText = follower.nickname;
    newFollower.setAttribute("id", follower.id);
    newFollower.setAttribute("onclick", "getProfilePage(this.id)");
    newFollowerBox.appendChild(newFollower);

    follower_list.appendChild(newFollowerBox);
  });
}
FollowList(user_id);

// 해당 프로필 유저가 좋아요한 커뮤니티 게시글 리스트 가져오기
async function LikeCommunityList(user_id) {
  communities = await getLikeCommunityList(user_id);

  const card_list = document.getElementById("card-list");

  communities.forEach((community) => {
    const newCard = document.createElement("li");
    newCard.setAttribute("class", "card");
    newCard.setAttribute("id", community.id);
    newCard.setAttribute("onclick", "getCommunityDetailPage(this.id)");

    const newImg = document.createElement("a");
    newImg.setAttribute("class", "card-image");
    newImg.src = `${backend_base_url}${community.image}`;
    newCard.appendChild(newImg);

    const image = document.createElement("img");
    image.src = `${backend_base_url}${community.image}`;
    image.setAttribute("alt", "Psychopomp");
    newImg.appendChild(image);

    const newDescription = document.createElement("a");
    newDescription.setAttribute("class", "card-description");
    newCard.appendChild(newDescription);

    const newTitle = document.createElement("h2");
    newTitle.innerText = community.title;
    newDescription.appendChild(newTitle);

    const newContent = document.createElement("p");
    newContent.setAttribute("class", "community-content");
    newContent.innerText = community.content;
    newDescription.appendChild(newContent);

    card_list.appendChild(newCard);
  });
}
LikeCommunityList(user_id);
