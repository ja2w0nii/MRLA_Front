if (!token) {
  window.location.replace(`${frontend_base_url}/signin_signup.html`);
}

const urlParams = new URLSearchParams(window.location.search);
const food_id = urlParams.get("id");


// 프로필 드롭다운 가져오기
async function ProfileInfo() {
  login_user = await getName();

  const profile_img_box = document.getElementById("profile_img_box");
  let newImage = document.createElement("img");
  newImage.setAttribute("id", login_user.id);
  newImage.setAttribute("class", "profile_img");
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

// 음식 사진, 이름, 코멘트 조회
window.onload = async function loadFooddetail() {
  food = await getFooddetail(food_id);

  const food_title = document.getElementById("food-title");
  food_title.innerText = response_json.menu;
  const food_image = document.getElementById("viewer");
  food_image.src = response_json.image;


  comments = await getFoodComment(food_id);
  login_user = await getName();

  const commentList = document.getElementById("comment-list")

  comments.forEach(comment => {
    const newComment_box = document.createElement("div");
    newComment_box.setAttribute("class", "comment-div")
    console.log(comment)

    newComment_box.innerHTML += `
    <li class="media">
    <div class="media-body" id=${comment.user} onclick="getProfilePage(this.id)" style="flex-direction: column;>
      <h4 class="mt-0 mb-10">${comment.user_nickname} |</h4> 
      ${comment.comment}
    </div>  
    `

    const update_comment_button = document.createElement("button");
    const delete_comment_button = document.createElement("button");

    update_comment_button.innerText = "수정";
    delete_comment_button.innerText = "삭제";

    update_comment_button.setAttribute("id", comment.id);
    update_comment_button.setAttribute("class", "btn btn-modify-comment-detail");
    update_comment_button.setAttribute("data-bs-toggle", "modal");
    update_comment_button.setAttribute("data-bs-target", "#exampleModal");

    delete_comment_button.setAttribute("id", comment.id);
    delete_comment_button.setAttribute("class", "btn btn-delete-comment-detail");
    update_comment_button.setAttribute("onclick", "UpdateFoodComment(this.id)");
    delete_comment_button.setAttribute("onclick", "DeleteFoodComment(this.id)");
    newComment_box.appendChild(update_comment_button);
    newComment_box.appendChild(delete_comment_button);

    commentList.appendChild(newComment_box);

    if (login_user.nickname != comment.user_nickname) {
      update_comment_button.style.visibility = "hidden";
      delete_comment_button.style.visibility = "hidden";
    }
  });
  const like_button = document.getElementById("food-like-button");
  like_button.setAttribute("id", food.id)
  like_button.setAttribute("onclick", "DoFoodLike(this.id)")

  const like_count = document.getElementById("food-like-count");
  like_count.innerText = food.likes + " 명이 좋아합니다.";
}

// 댓글 작성
async function submitComment() {
  const newComment = document.getElementById("new-comment").value;
  const response = await postFoodComment(food_id, newComment)
}

// 댓글 수정
async function UpdateFoodComment(comment_id) {
  const save_button = document.getElementById("save_button");

  save_button.setAttribute("id", comment_id);
  save_button.setAttribute("onclick", "loadUpdateFoodComment(this.id)");
}

// 댓글 삭제
async function DeleteFoodComment(comment_id) {
  await loadDeleteFoodComment(comment_id);
}