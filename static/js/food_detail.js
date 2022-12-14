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
    // newItem_a2.setAttribute("onclick", "getProfilePage(this.id)")
    newItem_a2.innerText = "로그아웃";
    newItem2.appendChild(newItem_a2);
  }
ProfileInfo();


window.onload = async function loadFooddetail() {
    const food = await getFooddetail(food_id);
    console.log(response_json);

    const food_title = document.getElementById("food-title");
    food_title.innerText = response_json.menu;
    const food_image = document.getElementById("viewer");
    food_image.src = response_json.image;


    comment = await getFoodComment(food_id);
    console.log(response_json);
    // const user = document.getElementById("user");
    // const comments = document.getElementById("comments");
    // const edit_button = document.getElementById("edit_btn");
    // const delete_button = document.getElementById("delete_btn");

    // comments.forEach((comment) => {
    //     const newUser = document.createElement("li");
    //     const newComment = document.createElement("li");
    //     newUser.setAttribute("id", comment.user);
    //     newUser.innerText = comment.user;
    //     newComment.innerText = comment.comment;
    //     user.appendChild(newUser);
    //     comments.appendChild(newComment);

    
    // });
}

// 댓글 작성
async function createComment() {
    const comment = document.getElementById("input-reply-detail").value;
    loadcreateComment(commnet);   
  }