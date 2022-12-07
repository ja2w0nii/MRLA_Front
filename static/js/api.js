console.log("api 로딩 완료");

// 전역 변수
// const backend_base_url = "http://13.209.72.148";  // EC2 인스턴스 연결 시
const backend_base_url = "http://127.0.0.1:8000"; // 백엔드 서버 연결 시
const frontend_base_url = "http://127.0.0.1:5500/templates";

const token = localStorage.getItem("access");

// 로그아웃
function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");

  window.location.replace(`${frontend_base_url}/login.html`);
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
    alert(response.status);
  }
}
