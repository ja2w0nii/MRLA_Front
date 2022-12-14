if (!token) {
  window.location.replace(`${frontend_base_url}/signin_signup.html`);
}

// 검색 페이지 보여주기 //
async function loadCommunitySearch() {
  communitys = await getCommunitySearch();

  const search_list = document.getElementById("search");
  communitys.forEach((community) => {
    const newSpan = document.createElement("span");
    newSpan.setAttribute("class", "search_span");

    // 사진 버전 //
    const newImage = document.createElement("img");
    newImage.src = community.image;
    newImage.setAttribute("id", community.id);
    newImage.setAttribute("onclick", "CommunityDetail(this.id)");
    newSpan.appendChild(newImage);

    const newEmail = document.createElement("p");
    newEmail.innerText = community.user;
    newEmail.setAttribute("id", community.id);
    newSpan.appendChild(newEmail);

    const newTitle = document.createElement("p");
    newTitle.innerText = community.title;
    newTitle.setAttribute("id", community.id);
    newSpan.appendChild(newTitle);

    const newContent = document.createElement("p");
    newContent.innerText = community.content;
    newContent.setAttribute("id", community.id);
    newSpan.appendChild(newContent);

    search_list.appendChild(newSpan);
  });
}
loadCommunitySearch();
