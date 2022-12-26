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

// 게시글 상세보기
async function CommunityDetail(community_id) {
  const community = await getCommunityDetail(community_id);
  const userinfo = await getName();

  const image_box = document.getElementById("wrapper");
  const image = document.createElement("img");
  image.setAttribute("class", "image_box");
  image.src = `${backend_base_url}${community.image}`;
  image_box.appendChild(image);

  const detail_user = document.getElementById("detail_user");
  const user = document.createElement("p");
  user.innerText = community.user_nickname
  user.setAttribute("id", community.user)
  user.setAttribute("onclick", "getProfilePage(this.id)")
  detail_user.appendChild(user);

  const detail_location = document.getElementById("detail_location");
  const location = document.createElement("div");
  location.innerText = community.location;
  location.setAttribute("class", "location");
  detail_location.appendChild(location);

  const detail_title = document.getElementById("detail_title");
  const title = document.createElement("h5");
  title.setAttribute("id", "title");
  title.innerText = community.title;
  detail_title.appendChild(title);

  const detail_content = document.getElementById("detail_content");
  const content = document.createElement("h5");
  content.setAttribute("class", "detail_content_box");
  content.innerText = community.content;
  detail_content.appendChild(content);

  console.log(community)

  const detail_updatedat = document.getElementById("detail_updatedat")
  const updatedat = document.createElement("p");
  updatedat.innerText = community.updated_at.replace("T", " ").substr(0, 16);
  detail_updatedat.appendChild(updatedat);

  const update_botton = document.getElementById("post-update-button");

  const delete_botton = document.getElementById("post-delete-button");
  delete_botton.setAttribute("id", community.id);
  delete_botton.setAttribute("onclick", "DeleteCommunityDetail(this.id)");

  if (userinfo.nickname != community.user_nickname) {
    update_botton.style.visibility = "hidden";
    delete_botton.style.visibility = "hidden";
  }

  const like_button = document.getElementById("post-like-button");
  like_button.setAttribute("id", community.id)
  like_button.setAttribute("onclick", "DoCommunityLike(this.id)")

  for (i in community.likes) {
    if (userinfo.id == community.likes[i]) {
      like_button.setAttribute("class", "material-symbols-sharp")
      break;
    } else {
      like_button.setAttribute("class", "material-symbols-outlined")
    }
  }



  const like_count = document.getElementById("post-like-count");
  like_number = community.likes.length;
  like_count.innerText = like_number + " 명이 좋아합니다.";
}
CommunityDetail(community_id);

// 게시글 수정하기 _ 모달 띄우기
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

const fileDOM = document.querySelector("#community_image");
const previews = document.querySelectorAll(".image-box");

fileDOM.addEventListener("change", () => {
  const reader = new FileReader();
  reader.onload = ({ target }) => {
    previews[0].src = target.result;
  };
  reader.readAsDataURL(fileDOM.files[0]);
});

$(".text_box textarea").keyup(function () {
  var content = $(this).val();
  $(".text_box .count span").html(content.length);
  if (content.length > 200) {
    alert("최대 200자까지 입력 가능합니다.");
    $(this).val(content.substring(0, 200));
    $(".text_box .count span").html(200);
  }
});

//   태그 관련 스트립트 ============================================== 221211 이태은
$(document).ready(function () {
  var tag = {};
  var counter = 0;

  function addTag(value) {
    tag[counter] = value;
    counter++;
  }

  function marginTag() {
    return Object.values(tag).filter(function (word) {
      return word !== "";
    });
  }

  $("#tag").on("keyup", function (e) {
    var self = $(this);

    if (e.key === "Enter" || e.keyCode == 32) {
      var tagValue = self.val();

      if (tagValue !== "") {
        var result = Object.values(tag).filter(function (word) {
          return word === tagValue;
        });

        if (result.length == 0) {
          $("#tag-list").append("<li class='tag-item'>" + tagValue + "<span class='del-btn' idx='" + counter + "'>x</span></li>");
          addTag(tagValue);
          self.val("");
        } else {
          alert("태그값이 중복됩니다.");
        }
      }
      e.preventDefault();
    }
  });

  $(document).on("click", ".del-btn", function (e) {
    var index = $(this).attr("idx");
    tag[index] = "";
    $(this).parent().remove();
  });
});

// 게시글 수정하기 _ 수정 전 정보 조회하기
async function UpdateCommunityDetailBefore(community_id) {
  community = await getCommunityDetail(community_id)

  const title = document.getElementById("community_title")
  const content = document.getElementById("community_content")
  const image = document.getElementById("before_image");
  const location = document.getElementById("location")
  title.value = community.title
  content.value = community.content
  location.value = community.location
  image.src = `${backend_base_url}${community.image}`;

}
UpdateCommunityDetailBefore(community_id)


// 게시글 수정하기 _ 수정 사항 적용하기
async function UpdateCommunityDetail() {
  let title = document.getElementById("community_title").value;
  let content = document.getElementById("community_content").value;
  let location = document.getElementById("location").value;
  let image = document.getElementById("community_image").files[0];

  const formdata = new FormData();

  formdata.append("title", title);
  formdata.append("content", content);
  formdata.append("location", location);

  if (image) {
    formdata.append("image", image);
  }

  putUpdateCommunityDetail(formdata);
}

// 게시글 삭제하기
async function DeleteCommunityDetail(community_id) {
  await loadDeleteCommunityDetail(community_id);
}

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
    newUser.setAttribute("id", comment.user_id);
    newUser.setAttribute("onclick", "getProfilePage(this.id)");
    const newComment = document.createElement("li");
    newComment.setAttribute("class", "comment_list");
    const newUpdatedat = document.createElement("li");
    newUpdatedat.setAttribute("class", "updatedat_list");
    newUser.innerText = "🐥 " + comment.user_nickname;
    newComment.innerText = comment.comment;
    newUpdatedat.innerText = comment.updated_at.replace("T", " ").substr(0, 16);
    newComment_box.appendChild(newUser);
    newComment_box.appendChild(newComment);
    newComment_box.appendChild(newUpdatedat);

    const update_comment_button = document.createElement("button");
    const delete_comment_button = document.createElement("button");

    update_comment_button.innerText = "수정";
    delete_comment_button.innerText = "삭제";

    update_comment_button.setAttribute("id", comment.id);
    update_comment_button.setAttribute("class", "update_comment_button btn btn-success create_button");
    update_comment_button.setAttribute("data-bs-toggle", "modal");
    update_comment_button.setAttribute("data-bs-target", "#exampleModal");

    delete_comment_button.setAttribute("id", comment.id);
    delete_comment_button.setAttribute("class", "delete_comment_button btn btn-danger create_button");
    update_comment_button.setAttribute("onclick", "UpdateCommunityComment(this.id)");
    delete_comment_button.setAttribute("onclick", "DeleteCommunityComment(this.id)");
    newComment_box.appendChild(update_comment_button);
    newComment_box.appendChild(delete_comment_button);

    comment_list.appendChild(newComment_box);

    if (userinfo.nickname != comment.user_nickname) {
      update_comment_button.style.visibility = "hidden";
      delete_comment_button.style.visibility = "hidden";
    }
  });
}
CommunityComment(community_id);

// 댓글 작성하기
async function CreateCommunityComment() {
  const comment = document.getElementById("comment-input").value;

  if (comment == "") {
    alert("내용을 입력해 주세요!");
    return false;
  }

  postCreateCommunityComment(community_id, comment);
}

// 댓글 수정하기
async function UpdateCommunityComment(comment_id) {
  const save_button = document.getElementById("save_button");

  save_button.setAttribute("id", comment_id);
  save_button.setAttribute("onclick", "putUpdateCommunityComment(this.id)");
}

// 댓글 삭제하기 //
async function DeleteCommunityComment(comment_id) {
  await loadDeleteCommunityComment(comment_id);
}