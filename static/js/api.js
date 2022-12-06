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

  //   if (title.value == "") {
  //     alert("제목을 입력해 주세요!");
  //     return false;
  //   } else if (content.value == "") {
  //     alert("내용을 입력해 주세요!");
  //     return false;
  //   }
  if (response.status == 200) {
    alert("작성 완료!");
    window.location.replace(`${frontend_base_url}/service.html`);
  }
}

// 고객센터 게시글 댓글 조회
async function getServiceComment() {
  const response = await fetch(`${backend_base_url}/posts/service/${service_id}/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 고객센터 게시글 댓글 등록
async function postServiceComment(formdata) {
  const response = await fetch(`${backend_base_url}/posts/service/${service_id}/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "POST",
    body: formdata,
  });

  if (comment.value == "") {
    alert("내용을 입력해 주세요!");
    return false;
  } else if (response.status == 200) {
    alert("작성 완료!");
    window.location.replace(`${frontend_base_url}/service.html`);
  }
}
