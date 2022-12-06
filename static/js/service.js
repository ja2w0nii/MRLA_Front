console.log("서비스 로딩 완료");

if (!token) {
  window.location.replace(`${frontend_base_url}/login.html`);
}

// 고객센터 게시글 조회
window.onload = async function loadgetService() {
  services = await getService();

  const service_list = document.getElementById("service_list");
  services.forEach((service) => {
    const newId = document.createElement("p");
    newId.setAttribute("id", service.id);
    newId.setAttribute("class", "service_id");
    newId.innerText = service.id;
    service_list.appendChild(newId);

    const newTitle = document.createElement("p");
    newTitle.setAttribute("id", service.id);
    newTitle.setAttribute("class", "service_title");
    newTitle.innerText = service.title;
    service_list.appendChild(newTitle);

    const newCreatedAt = document.createElement("p");
    newCreatedAt.setAttribute("id", service.id);
    newCreatedAt.setAttribute("class", "service_created_at");
    newCreatedAt.innerText = service.created_at;
    service_list.appendChild(newCreatedAt);
  });
};

// 고객센터 게시글 등록
async function loadpostService() {
  const title = document.getElementById("service_title").value;
  const content = document.getElementById("service_content").value;

  const formdata = new FormData();

  formdata.append("title", title);
  formdata.append("content", content);

  postService(formdata);
}
