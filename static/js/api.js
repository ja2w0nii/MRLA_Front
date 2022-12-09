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

// 프로필 가져오기
async function getMyProfile() {
  const response = await fetch(`${backend_base_url}/users/profile/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 프로필 수정하기
async function updateMyProfile(formdata) {
  const response = await fetch(`${backend_base_url}/users/profile/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "PUT",
    body: formdata,
  });

  if (response.status == 200) {
    alert("프로필 변경 완료!");
    window.location.replace(`${frontend_base_url}/profile.html`);
  } else {
    alert("잘못된 입력입니다!");
  }
}

// 추천 메뉴 리스트 가져오기
async function getFoodList() {
  const response = await fetch(`${backend_base_url}/foods/main/filtering/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 팔로잉/팔로워 리스트 가져오기
async function getFollowList() {
  const response = await fetch(`${backend_base_url}/users/follow/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 해당 프로필 유저가 좋아요한 메뉴 리스트 가져오기
async function getMyFoodList() {
  const response = await fetch(`${backend_base_url}/foods/main/myfood/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 해당 프로필 유저가 좋아요한 커뮤니티 게시글 리스트 가져오기
async function getMyCommunityList() {
  const response = await fetch(`${backend_base_url}/posts/community/mycommunity/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

