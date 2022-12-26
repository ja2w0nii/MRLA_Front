// 전역 변수
// const backend_base_url = "https://www.mrla.tk";
// const backend_base_url = "http://3.36.132.172";
const backend_base_url = "http://127.0.0.1:8000";
// const frontend_base_url = "";
const frontend_base_url = "http://localhost:5500/templates";
const token = localStorage.getItem("access");

// 브라우저 종료 시 로그인한 유저의 토큰값 로컬 스토리지에서 삭제 --------------------
// 유저가 window 사용 시에는 window가 닫힌 것이 아님
var closing_window = false;
$(window).on("focus", function () {
  closing_window = false;
});

$(window).on("blur", function () {
  closing_window = true;
  if (!document.hidden) {
    // window가 최소화된 것은 닫힌 것이 아님
    closing_window = false;
  }
  $(window).on("resize", function (e) {
    // window가 최대화된 것은 닫힌 것이 아님
    closing_window = false;
  });
  $(window).off("resize"); // multiple listening 회피
});

// 유저가 html을 나간다면 window가 닫힌 것으로 간주
$("html").on("mouseleave", function () {
  closing_window = true;
});

// 유저의 마우스가 window 안에 있다면 토큰들을 삭제하지 않음
$("html").on("mouseenter", function () {
  closing_window = false;
});

$(document).on("keydown", function (e) {
  if (e.keyCode == 91 || e.keyCode == 18) {
    closing_window = false; // 단축키 ALT+TAB (창 변경)
  }
  if (e.keyCode == 116 || (e.ctrlKey && e.keyCode == 82)) {
    closing_window = false; // 단축키 F5, CTRL+F5, CTRL+R (새로고침)
  }
});

// a 링크를 눌렀을 때 토큰값 삭제 방지
$(document).on("click", "a", function () {
  closing_window = false;
});

// 버튼이 다른 페이지로 redirect한다면 토큰값 삭제 방지
$(document).on("click", "button", function () {
  closing_window = false;
});

// submit이나 form 사용 시 토큰값 삭제 방지
$(document).on("submit", "form", function () {
  closing_window = false;
});

// toDoWhenClosing 함수를 통해 window가 닫히면 토큰 관련 값 전부 삭제
var toDoWhenClosing = function () {
  localStorage.removeItem("payload");
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  return;
};

// unload(window가 닫히는 이벤트)가 감지되면 closing_window가 true가 되고 토큰 관련 값들 전부 삭제
window.addEventListener("unload", function (e) {
  if (closing_window) {
    toDoWhenClosing();
  }
});
// --------------------------------------------------------------------------------

// 로그아웃
function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");

  window.location.replace(`${frontend_base_url}/signin_signup.html`);
}

// 로그인한 유저 정보 조회
async function getName() {
  const response = await fetch(`${backend_base_url}/users/myprofile`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });

  if (response.status == 200) {
    response_json = await response.json();
    return response_json;
  } else {
    return null;
  }
}

// 메인 페이지 연결
function getMainPage(category_id) {
  const url = `${frontend_base_url}/main.html?id=${category_id}`;
  location.href = url;
}

// 프로필 페이지 연결
function getProfilePage(user_id) {
  const url = `${frontend_base_url}/profile.html?id=${user_id}`;
  location.href = url;
}

// 프로필 수정 페이지 연결
function getProfileUpdatePage(user_id) {
  const url = `${frontend_base_url}/profile_update.html?id=${user_id}`;
  location.href = url;
}

// 프로필 페이지 좋아요 커뮤니티 탭 연결
function getProfileCommunityPage(user_id) {
  const url = `${frontend_base_url}/profile_community.html?id=${user_id}`;
  location.href = url;
}

// 프로필 페이지 작성한 게시글 탭 연결
function getProfileMyCommunityPage(user_id) {
  const url = `${frontend_base_url}/profile_my_community.html?id=${user_id}`;
  location.href = url;
}

// 프로필 가져오기
async function getProfile(user_id) {
  const response = await fetch(`${backend_base_url}/users/profile/${user_id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 회원 탈퇴
async function handleUnregister() {
  const response = await fetch(`${backend_base_url}/users/signup/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "DELETE",
  });

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");

  response_json = await response.json();
  return response_json;
}

// 프로필 수정하기
async function updateMyProfile(formdata) {
  const response = await fetch(`${backend_base_url}/users/profile/${user_id}/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "PUT",
    body: formdata,
  });

  if (response.status == 200) {
    alert("프로필 변경 완료!");
    window.location.replace(`${frontend_base_url}/profile.html?id=${user_id}`);
  } else {
    alert("잘못된 입력입니다!");
  }
}

// 누구랑 먹나요? _ 전체 메뉴 리스트 가져오기
async function getAllFoodList() {
  const response = await fetch(`${backend_base_url}/foods/main/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 추천 메뉴 리스트 가져오기
async function getFoodList(category_id) {
  const response = await fetch(`${backend_base_url}/foods/main/filtering/${category_id}/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 팔로우 등록/취소
async function DoFollow(user_id) {
  const response = await fetch(`${backend_base_url}/users/follow/${user_id}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "POST",
  });
  response_json = await response.json();

  if (response.status == 200) {
    alert(response_json["message"]);
    window.location.reload();
  }
}

// 팔로잉/팔로워 리스트 가져오기
async function getFollowList(user_id) {
  const response = await fetch(`${backend_base_url}/users/follow/${user_id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 해당 프로필 유저가 좋아요한 메뉴 리스트 가져오기
async function getLikeFoodList(user_id) {
  const response = await fetch(`${backend_base_url}/foods/main/profile/${user_id}/likefood/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 해당 프로필 유저가 좋아요한 커뮤니티 게시글 리스트 가져오기
async function getLikeCommunityList(user_id) {
  const response = await fetch(`${backend_base_url}/posts/community/profile/${user_id}/likecommunity/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 해당 프로필 유저가 작성한 커뮤니티 게시글 리스트 가져오기
async function getMyCommunityList(user_id) {
  const response = await fetch(`${backend_base_url}/posts/community/profile/${user_id}/mycommunity/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 고객센터 게시글 조회
async function getService() {
  const response = await fetch(`${backend_base_url}/posts/service/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 고객센터 게시글 등록
async function postService(formdata) {
  const response = await fetch(`${backend_base_url}/posts/service/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "POST",
    body: formdata,
  });

  if (response.status == 200) {
    alert("작성 완료!");
    window.location.reload();
  } else if (response.status == 400) {
    alert("제목은 50 글자를 넘을 수 없습니다!");
  } else {
    alert(response.status);
  }
}

// 고객센터 게시글 디테일 페이지 연결
function ServiceDetail(service_id) {
  const url = `${frontend_base_url}/service_detail.html?id=${service_id}`;
  location.href = url;
}

// 고객센터 게시글 디테일 조회
async function getServiceDetail(service_id) {
  const response = await fetch(`${backend_base_url}/posts/service/${service_id}/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });

  if (response.status == 200) {
    response_json = await response.json();
    return response_json;
  } else if (response.status == 401) {
    alert("권한이 없습니다!");
    window.location.replace(`${frontend_base_url}/service.html`);
  } else {
    alert(response.status);
  }
}

// 고객센터 게시글 디테일 댓글 조회
async function getServiceComment(service_id) {
  const response = await fetch(`${backend_base_url}/posts/service/${service_id}/comment/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 고객센터 게시글 디테일 댓글 등록
async function postServiceComment(formdata) {
  const response = await fetch(`${backend_base_url}/posts/service/${service_id}/comment/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "POST",
    body: formdata,
  });

  if (response.status == 200) {
    alert("작성 완료!");
    window.location.reload();
  } else if (response.status == 401) {
    alert("권한이 없습니다!");
    window.location.reload();
  } else {
    alert("내용을 입력해 주세요.");
    window.location.reload();
  }
}

// 메뉴 디테일 페이지 연결
function FoodDetail(food_id) {
  const url = `${frontend_base_url}/food_detail.html?id=${food_id}`;
  location.href = url;
}

// 메뉴 디테일 가져오기
async function getFooddetail(food_id) {
  const response = await fetch(`${backend_base_url}/foods/main/${food_id}/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 메뉴 코멘트 가져오기
async function getFoodComment(food_id) {
  const response = await fetch(`${backend_base_url}/foods/main/${food_id}/comment/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 메뉴 코멘트 등록
async function postFoodComment(food_id, newComment) {
  const response = await fetch(`${backend_base_url}/foods/main/${food_id}/comment/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "POST",
    body: JSON.stringify({
      comment: newComment,
    }),
  });

  if (response.status == 200) {
    alert("작성 완료!");
    window.location.reload();
  } else if (response.status == 400) {
    alert("댓글을 작성해 주세요!");
  } else {
    alert(response.status);
  }
}

// 메뉴 코멘트 수정
async function loadUpdateFoodComment(comment_id) {
  const input_comment = document.getElementById("modal_comment").value;

  const response = await fetch(`${backend_base_url}/foods/main/${food_id}/comment/${comment_id}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "PUT",
    body: JSON.stringify({
      menu_id: food_id,
      comment: input_comment,
    }),
  });
  response_json = await response.json();

  if (response.status == 200) {
    alert("수정이 완료되었습니다!");
    window.location.replace(`${frontend_base_url}/food_detail.html?id=${food_id}`);
  } else {
    alert(response.status);
  }
}

// 메뉴 코멘트 삭제
async function loadDeleteFoodComment(comment_id) {
  const response = await fetch(`${backend_base_url}/foods/main/${food_id}/comment/${comment_id}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "DELETE",
  });

  if (response.status == 204) {
    alert("해당 댓글을 삭제합니다.");
    window.location.replace(`${frontend_base_url}/food_detail.html?id=${food_id}`);
  } else {
    alert(response.status);
  }
}

// 메뉴 좋아요 등록/취소
async function DoFoodLike(Food_id) {
  const response = await fetch(`${backend_base_url}/foods/main/${food_id}/like/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "POST",
  });
  response_json = await response.json();

  if (response.status == 200) {
    window.location.replace(`${frontend_base_url}/food_detail.html?id=${food_id}`);
    alert(response_json["message"]);
  } else {
    alert(response.status);
  }
}

// 커뮤니티 게시글 목록 조회 //
async function getCommunity() {
  const response = await fetch(`${backend_base_url}/posts/community/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 커뮤니티 상세 페이지 연결 //
function getCommunityDetailPage(community_id) {
  const url = `${frontend_base_url}/community_detail.html?id=${community_id}`;
  location.href = url;
}

// 커뮤니티 상세 페이지 _ 게시글 상세 정보 조회 //
async function getCommunityDetail(community_id) {
  const response = await fetch(`${backend_base_url}/posts/community/${community_id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 커뮤니티 상세 페이지 _ 게시글 상세 정보 수정 //
async function putUpdateCommunityDetail(formdata) {
  const response = await fetch(`${backend_base_url}/posts/community/${community_id}/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "PUT",
    body: formdata,
  });
  response_json = await response.json();

  if (response.status == 200) {
    alert("수정이 완료되었습니다!");
    window.location.replace(`${frontend_base_url}/community_detail.html?id=${community_id}`);
  } else {
    alert(response.status);
  }
}

// 커뮤니티 상세 페이지 _ 게시글 상세 정보 삭제 //
async function loadDeleteCommunityDetail(community_id) {
  const response = await fetch(`${backend_base_url}/posts/community/${community_id}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "DELETE",
  });

  if (response.status == 204) {
    alert("해당 게시글을 삭제합니다.");
    window.location.replace(`${frontend_base_url}/community.html`);
  } else {
    alert(response.status);
  }
}

// 커뮤니티 게시글 좋아요 등록/취소 //
async function DoCommunityLike(community_id) {
  const response = await fetch(`${backend_base_url}/posts/community/${community_id}/like/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "POST",
  });
  response_json = await response.json();

  if (response.status == 200) {
    window.location.replace(`${frontend_base_url}/community_detail.html?id=${community_id}`);
    alert(response_json["message"]);
  } else {
    alert(response.status);
  }
}

// 커뮤니티 상세 페이지 _ 댓글 조회 //
async function getCommunityComment(community_id) {
  const response = await fetch(`${backend_base_url}/posts/community/${community_id}/comment/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 커뮤니티 상세 페이지 _ 댓글 작성 //
async function postCreateCommunityComment(community_id, comment) {
  const response = await fetch(`${backend_base_url}/posts/community/${community_id}/comment/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "POST",
    body: JSON.stringify({
      comment: comment,
    }),
  });

  response_json = await response.json();

  if (response.status == 200) {
    window.location.replace(`${frontend_base_url}/community_detail.html?id=${community_id}`);
  } else {
    alert(response.status);
  }
}

// 커뮤니티 상세 페이지 _ 댓글 수정 //
async function putUpdateCommunityComment(comment_id) {
  const input_comment = document.getElementById("modal_comment").value;

  const response = await fetch(`${backend_base_url}/posts/community/${community_id}/comment/${comment_id}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "PUT",
    body: JSON.stringify({
      comment: input_comment,
    }),
  });
  response_json = await response.json();

  if (response.status == 200) {
    alert("수정이 완료되었습니다!");
    window.location.replace(`${frontend_base_url}/community_detail.html?id=${community_id}`);
  } else {
    alert(response.status);
  }
}

// 커뮤니티 상세 페이지 _ 댓글 삭제 //
async function loadDeleteCommunityComment(comment_id) {
  const response = await fetch(`${backend_base_url}/posts/community/${community_id}/comment/${comment_id}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "DELETE",
  });

  if (response.status == 204) {
    alert("해당 댓글을 삭제합니다.");
    window.location.replace(`${frontend_base_url}/community_detail.html?id=${community_id}`);
  } else {
    alert(response.status);
  }
}

// 커뮤니티 게시글 검색 페이지 연결 //
function CommunitySearch() {
  const word = document.getElementById("inputSearch").value;
  const url = `${frontend_base_url}/community_search.html?search=${word}`;

  if (word == "") {
    alert("검색어를 입력하세요!");
  } else {
    location.href = url;
  }
}

// 커뮤니티 게시글 검색 //
async function getCommunitySearch() {
  const response = await fetch(`${backend_base_url}/posts/community/search?` + new URLSearchParams(window.location.search), {
    method: "GET",
  });

  response_json = await response.json();
  return response_json;
}

// 커뮤니티 게시글 등록
async function postCommunity(formdata) {
  const response = await fetch(`${backend_base_url}/posts/community/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "POST",
    body: formdata,
  });

  if (response.status == 200) {
    alert("작성 완료!");
    window.location.reload();
  } else if (response.status == 400) {
    alert("이미지를 등록해 주세요!");
  } else {
    alert(response.status);
  }
}

// 메뉴 상세 페이지 _ 근처 맛집 연결
function getNearRestaurant(food) {
  const url = `${frontend_base_url}/map_search.html?id=${food}`;
  location.href = url;
}
