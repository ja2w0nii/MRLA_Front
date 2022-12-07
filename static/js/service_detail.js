console.log("서비스 디테일 로딩 완료");

if (!token) {
  window.location.replace(`${frontend_base_url}/login.html`);
}

// url id 값 받아오기
const urlParams = new URLSearchParams(window.location.search);
const service_id = urlParams.get("id");

// 고객센터 게시글 디테일 조회
async function loadgetServiceDetail(service_id) {
  const service = await getServiceDetail(service_id);

  const user = document.getElementById("user");
  user.innerText = service.user;

  const title = document.getElementById("title");
  title.innerText = "[ 제목 ]\n" + service.title;

  const content = document.getElementById("content");
  content.innerText = "[ 내용 ]\n" + service.content;

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
    newService.innerText = "admin";
    comment_list.appendChild(newService);

    const newCreatedAt = document.createElement("span");
    newCreatedAt.setAttribute("id", servicecomment.service);
    newCreatedAt.setAttribute("class", "servicecomment_created_at");
    newCreatedAt.innerText = servicecomment.created_at.replace("T", " ").substr(0, 16);
    comment_list.appendChild(newCreatedAt);

    const newComment = document.createElement("p");
    newComment.setAttribute("id", servicecomment.service);
    newComment.setAttribute("class", "servicecomment_comment");
    newComment.innerText = "[ 답변 ]\n" + servicecomment.comment;
    comment_list.appendChild(newComment);
  });
}
loadgetServiceComment(service_id);

// 고객센터 게시글 디테일 댓글 등록
async function loadpostServiceComment() {
  const comment = document.getElementById("comment").value;

  if (comment == "") {
    alert("내용을 입력해 주세요!");
    return false;
  }

  const formdata = new FormData();
  console.log(formdata);
  formdata.append("comment", comment);

  postServiceComment(formdata);
}
