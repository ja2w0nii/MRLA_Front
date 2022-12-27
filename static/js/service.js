if (!token) {
  window.location.replace(`${frontend_base_url}/signin_signup.html`);
}

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

// 고객센터 게시글 조회
window.onload = async function loadgetService() {
  const services = await getService();

  const main_section = document.getElementById("main_section");
  services.forEach((service) => {
    const newSpan = document.createElement("span");

    const newId = document.createElement("p");
    newId.setAttribute("id", service.id);
    newId.setAttribute("class", "service_id");
    newId.innerText = service.id;
    newSpan.appendChild(newId);

    const newTitle = document.createElement("p");
    newTitle.setAttribute("id", service.id);
    newTitle.setAttribute("class", "service_title");
    newTitle.setAttribute("onclick", "ServiceDetail(this.id)");
    newTitle.innerText = service.title;
    newSpan.appendChild(newTitle);

    const newUser = document.createElement("p");
    newUser.setAttribute("id", service.id);
    newUser.setAttribute("class", "service_user");
    newUser.innerText = service.user;
    newSpan.appendChild(newUser);

    const newCreatedAt = document.createElement("p");
    newCreatedAt.setAttribute("id", service.id);
    newCreatedAt.setAttribute("class", "service_created_at");
    newCreatedAt.innerText = service.created_at.replace("T", " ").substr(0, 16);
    newSpan.appendChild(newCreatedAt);

    main_section.appendChild(newSpan);
  });
};

// 고객센터 게시글 등록
async function loadpostService() {
  const title = document.getElementById("service_title").value;
  const content = document.getElementById("service_content").value;

  if (title == "") {
    alert("제목을 입력해 주세요!");
    return false;
  } else if (content == "") {
    alert("내용을 입력해 주세요!");
    return false;
  }

  const formdata = new FormData();

  formdata.append("title", title);
  formdata.append("content", content);

  postService(formdata);
}

// 문의하기 텍스트박스 글자수 제한===========================================221213 이태은

//  키보다가 눌릴때 { } 안의 함수 실행
$(".text_box textarea").keyup(function () {
  // 함수	content는 이 함수 이다.
  var content = $(this).val();
  $(".text_box .count span").html(content.length);
  if (content.length > 200) {
    alert("최대 200자까지 입력 가능합니다.");
    $(this).val(content.substring(0, 200));
    $(".text_box .count span").html(200);
  }
});
