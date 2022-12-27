if (!token) {
  window.location.replace(`${frontend_base_url}/signin_signup.html`);
}

// url id 값 받아오기
const urlParams = new URLSearchParams(window.location.search);
const service_id = urlParams.get("id");

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

// 고객센터 게시글 디테일 조회
async function loadgetServiceDetail(service_id) {
  const service = await getServiceDetail(service_id);

  const user = document.getElementById("user");
  user.innerText = service.user;

  const title = document.getElementById("title");
  title.innerText = service.title;
  const content = document.getElementById("content");
  content.innerText = service.content;

  const created_at = document.getElementById("created_at");
  created_at.innerText = service.created_at.replace("T", " ").substr(0, 16);
}
loadgetServiceDetail(service_id);

// 고객센터 게시글 디테일 댓글 조회
async function loadgetServiceComment(service_id) {
  const comments = await getServiceComment(service_id);

  comments.forEach((servicecomment) => {
    const comment_list = document.getElementById("comment_list");

    const newService = document.createElement("span");
    newService.setAttribute("id", servicecomment.service);
    newService.setAttribute("class", "servicecomment_user");
    newService.innerText = "고객센터";
    comment_list.appendChild(newService);

    const newUpdatedat = document.createElement("span");
    newUpdatedat.setAttribute("id", servicecomment.service);
    newUpdatedat.setAttribute("class", "servicecomment_updated_at");
    newUpdatedat.innerText = servicecomment.updated_at.replace("T", " ").substr(0, 16);
    comment_list.appendChild(newUpdatedat);

    const newComment = document.createElement("p");
    newComment.setAttribute("id", servicecomment.service);
    newComment.setAttribute("class", "servicecomment_comment");
    newComment.innerText = servicecomment.comment;

    comment_list.appendChild(newComment);
  });
}
loadgetServiceComment(service_id);

// 고객센터 게시글 디테일 댓글 등록
async function loadpostServiceComment() {
  const comment = document.getElementById("comment").value;

  const formdata = new FormData();
  formdata.append("comment", comment);

  postServiceComment(formdata);
}
