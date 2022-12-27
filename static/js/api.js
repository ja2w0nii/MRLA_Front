// 전역 변수
const backend_base_url = "https://www.mrla.tk";
// const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://localhost:5500/templates";
const token = localStorage.getItem("access");

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

  if (response.status == 200) {
    alert("메추리알 서비스를 이용해 주셔서 감사합니다.");
    window.location.reload();
  } else {
    return false;
  }
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

// 팔로잉 리스트 가져오기
async function getFollowingList(user_id) {
  const response = await fetch(`${backend_base_url}/users/following/${user_id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 팔로워 리스트 가져오기
async function getFollowerList(user_id) {
  const response = await fetch(`${backend_base_url}/users/follower/${user_id}`, {
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
    alert("댓글을 500자 이하로 작성해주세요.");
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

  response_json = await response.json();
  return response_json;
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

// 음식 검색 페이지 연결 //
async function FoodSearch() {
  const word = document.getElementById("inputSearch").value;
  foods = await getFoodSearch();

  var search_food = [];
  for (var i = 0; i < foods.length; i++) {
    var key = foods[i];
    food = key.menu.replace(/\"/gi, "");
    if (food == word) {
      search_food.push(key);
    }
  }
  if (search_food[0]) {
    location.href = `${frontend_base_url}/food_detail.html?id=${search_food[0].food_id}`;
  } else {
    alert("검색한 메뉴가 없습니다.")
    window.location.reload()
  }
}

// 음식 검색 //
async function getFoodSearch() {
  const response = await fetch(`${backend_base_url}/foods/main/search?` + new URLSearchParams(window.location.search), {
    method: "GET",
  });

  response_json = await response.json();
  return response_json;
}
