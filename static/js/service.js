console.log("서비스 로딩 완료");

if (!token) {
  window.location.replace(`${frontend_base_url}/login.html`);
}

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
