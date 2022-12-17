if (!token) {
  window.location.replace(`${frontend_base_url}/signin_signup.html`);
}

// url id 값 받아오기
const urlParams = new URLSearchParams(window.location.search);
const community_id = urlParams.get("id");

// 프로필 드롭다운 가져오기
async function ProfileInfo() {
  login_user = await getName();

  const profile_img_box = document.getElementById("profile_img_box");
  let newImage = document.createElement("img");
  newImage.setAttribute("id", login_user.id)
  newImage.setAttribute("class", "profile_img")
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

// 게시물 상세보기
async function CommunityDetail(community_id) {
  const community = await getCommunityDetail(community_id);

  const image_box = document.getElementById("wrapper");
  const image = document.createElement("img");
  image.setAttribute("class", "image_box");
  image.src = `${backend_base_url}${community.image}`;
  image_box.appendChild(image);

  const detail_user = document.getElementById("detail_user");
  const user = document.createElement("h5");
  user.innerText = community.user
  detail_user.appendChild(user);

  const detail_title = document.getElementById("detail_title");
  const title = document.createElement("h3");
  title.setAttribute("id", "title");
  title.innerText = community.title;
  detail_title.appendChild(title);

  const detail_content = document.getElementById("detail_content");
  const content = document.createElement("h5");
  content.setAttribute("class", "detail_content_box");
  content.innerText = community.content;
  detail_content.appendChild(content);
}
CommunityDetail(community_id);


// 댓글 목록 조회하기
async function CommunityComment(community_id) {
  const comments = await getCommunityComment(community_id);
  const userinfo = await getName();

  const comment_list = document.getElementById("comment-inner-box")

  comments.forEach((comment) => {
    const newComment_box = document.createElement("div");
    newComment_box.setAttribute("class", "small-comment-box");

    const newUser = document.createElement("li");
    newUser.setAttribute("class", "user_list");
    const newComment = document.createElement("li");
    newComment.setAttribute("class", "comment_list");
    const newCreatedat = document.createElement("li");
    newCreatedat.setAttribute("class", "createdat_list");
    newUser.innerText = "🐥 " + comment.user;
    newComment.innerText = comment.comment;
    newCreatedat.innerText = comment.created_at.replace("T", " ").substr(0, 16);
    newComment_box.appendChild(newUser);
    newComment_box.appendChild(newComment);
    newComment_box.appendChild(newCreatedat);

    const update_comment_button = document.createElement("button");
    const delete_comment_button = document.createElement("button");

    update_comment_button.innerText = "수정";
    delete_comment_button.innerText = "삭제";

    update_comment_button.setAttribute("id", comment.id);
    update_comment_button.setAttribute("class", "btn btn-success create_button");
    update_comment_button.setAttribute("data-bs-toggle", "modal");
    update_comment_button.setAttribute("data-bs-target", "#exampleModal");

    delete_comment_button.setAttribute("id", comment.id);
    delete_comment_button.setAttribute("class", "btn btn-danger create_button");
    update_comment_button.setAttribute("onclick", "UpdateComment(this.id)");
    delete_comment_button.setAttribute("onclick", "DeleteComment(this.id)");
    newComment_box.appendChild(update_comment_button);
    newComment_box.appendChild(delete_comment_button);

    comment_list.appendChild(newComment_box);

    if (userinfo.nickname != comment.user) {
      update_comment_button.style.visibility = "hidden";
      delete_comment_button.style.visibility = "hidden";
    }
  });
}
CommunityComment(community_id);

// 고객센터 게시글 등록
async function CreateCommunityComment() {
  const comment = document.getElementById("comment-input").value;

  if (comment == "") {
    alert("내용을 입력해 주세요!");
    return false;
  }

  postCreateCommunityComment(community_id, comment);
}
