if (!token) {
  window.location.replace(`${frontend_base_url}/signin_signup.html`);
}

window.addEventListener("load", function () {
  setTimeout(lazyLoad, 1000);
});

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

function lazyLoad() {
  var card_images = document.querySelectorAll(".card-image");
  card_images.forEach(function (card_image) {
    var image_url = card_image.getAttribute("data-image-full");
    var content_image = card_image.querySelector("img");

    content_image.src = image_url;

    content_image.addEventListener("load", function () {
      card_image.style.backgroundImage = "url(" + image_url + ")";
      card_image.className = card_image.className + " is-loaded";
    });
  });
}

// 게시글 작성 모달
var upload_modals = document.getElementsByClassName("post-upload-modal-container"); // 모달창 띄우는 자바스크립트 시작
var upload_btns = document.getElementsByClassName("post-upload-button"); // Modal을 띄우는 클래스 이름을 가져옵니다.
var upload_spanes = document.getElementsByClassName("post-upload-modal-close"); // Modal을 닫는 close 클래스를 가져옵니다.

var upload_funcs = [];

function Modal(num) {
  return function () {
    upload_btns[num].onclick = function () {
      upload_modals[num].style.display = "block";
    };

    upload_spanes[num].onclick = function () {
      upload_modals[num].style.display = "none";
    };
  };
}

for (var i = 0; i < upload_btns.length; i++) {
  upload_funcs[i] = Modal(i);
}

for (var j = 0; j < upload_btns.length; j++) {
  upload_funcs[j]();
}

window.onclick = function (event) {
  if (event.target.className == "post-upload-modal-container") {
    event.target.style.display = "none";
  }
};

// 게시글 작성 모달 - 이미지 미리보기
const fileDOM = document.querySelector("#community_image");
const previews = document.querySelectorAll(".image-box");

fileDOM.addEventListener("change", () => {
  const reader = new FileReader();
  reader.onload = ({ target }) => {
    previews[0].src = target.result;
  };
  reader.readAsDataURL(fileDOM.files[0]);
});

// 제목 글자수 제한
$(".post-modal-input-text-top input").keyup(function () {
  var content = $(this).val();
  $(".post-modal-input-text-top .title-count span").html(content.length);
  if (content.length > 15) {
    alert("제목은 최대 15자까지 입력 가능합니다.");
    $(this).val(content.substring(0, 15));
    $(".post-modal-input-text-top .title-count span").html(15);
  }
});

// 위치 글자수 제한
$(".post-modal-input-text-middle input").keyup(function () {
  var content = $(this).val();
  $(".post-modal-input-text-middle .title-count span").html(content.length);
  if (content.length > 15) {
    alert("위치는 최대 15자까지 입력 가능합니다.");
    $(this).val(content.substring(0, 15));
    $(".post-modal-input-text-middle .title-count span").html(15);
  }
});

// 글자수 제한
$(".text_box textarea").keyup(function () {
  var content = $(this).val();
  $(".text_box .count span").html(content.length);
  if (content.length > 200) {
    alert("내용은 최대 200자까지 입력 가능합니다.");
    $(this).val(content.substring(0, 200));
    $(".text_box .count span").html(200);
  }
});

// 커뮤니티 게시글 목록 조회
async function Community() {
  communities = await getCommunity();

  const card_list = document.getElementById("card-list");

  communities.forEach((community) => {
    const newCard = document.createElement("li");
    newCard.setAttribute("class", "card");

    const newImg = document.createElement("a");
    newImg.setAttribute("class", "card-image");
    newImg.src = `${backend_base_url}${community.image}`;
    newImg.setAttribute("style", newImg.src);
    newImg.setAttribute("data-image-full", newImg.src);

    const image = document.createElement("img");
    image.src = `${backend_base_url}${community.image}`;
    newImg.appendChild(image);
    newCard.appendChild(newImg);

    const newDescription = document.createElement("a");
    newDescription.setAttribute("class", "card-description");
    newCard.appendChild(newDescription);

    const newTitle = document.createElement("h2");
    const newContent = document.createElement("p");
    newContent.setAttribute("class", "community-content");
    newTitle.innerText = community.title;
    newContent.innerText = community.content;
    newDescription.appendChild(newTitle);
    newDescription.appendChild(newContent);
    newCard.setAttribute("id", community.id);
    newCard.setAttribute("onclick", "getCommunityDetailPage(this.id)");

    card_list.appendChild(newCard);
  });
}
Community();

// 커뮤니티 게시글 등록
async function loadpostCommunity() {
  const title = document.getElementById("community_title").value;
  const content = document.getElementById("community_content").value;
  const image = document.getElementById("community_image").files[0];
  const location = document.getElementById("location").value;

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
  formdata.append("image", image);
  formdata.append("location", location);

  postCommunity(formdata);
}
