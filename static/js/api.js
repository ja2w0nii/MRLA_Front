// 전역 변수

const backend_base_url = "http://127.0.0.1:8000";

const frontend_base_url = "http://127.0.0.1:5500/templates";

const token = localStorage.getItem("access");

// 로그아웃
function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");

  window.location.replace(`${frontend_base_url}/login.html`);
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

// 프로필 페이지 커뮤니티 탭 연결
function getProfileCommunityPage(user_id) {
  const url = `${frontend_base_url}/profile_community.html?id=${user_id}`;
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

// 누구랑 먹지? _ 전체 메뉴 리스트 가져오기
async function getAllFoodList() {
  const response = await fetch(`${backend_base_url}/foods/main/`, {
// 로그인한 유저 가져오기 //
async function getName() {
  const response = await fetch(`${backend_base_url}/users/profile`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });

  response_json = await response.json();
  return response_json;
}

// 추천 메뉴 리스트 가져오기
async function getFoodList() {
  const response = await fetch(`${backend_base_url}/foods/main/filtering/`, {
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
    window.location.replace(`${frontend_base_url}/profile.html?id=${user_id}`);
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

  response_json = await response.json();
  return response_json;
}

// 해당 프로필 유저가 좋아요한 커뮤니티 게시글 리스트 가져오기
async function getLikeCommunityList(user_id) {
  const response = await fetch(`${backend_base_url}/posts/community/profile/${user_id}/likecommunity/`, {
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

