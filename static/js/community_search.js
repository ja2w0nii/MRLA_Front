if (!token) {
  window.location.replace(`${frontend_base_url}/signin_signup.html`);
}

// 프로필 드롭다운 가져오기
async function ProfileInfo() {
  login_user = await getName();

  const profile_img_box = document.getElementById("profile_img_box");
  let newImage = document.createElement("img");
  newImage.setAttribute("id", login_user.id)
  newImage.setAttribute("class", "profile_img")
  newImage.src = `${backend_base_url}${login_user.profile_img}`;
  profile_img_box.appendChild(newImage);

  const profile_name_box = document.getElementById("profile_name_box");
  const newNickname = document.createElement("a")
  newNickname.setAttribute("id", login_user.id)
  newNickname.setAttribute("class", "nav-link dropdown-toggle")
  newNickname.setAttribute("href", "#")
  newNickname.setAttribute("role", "button")
  newNickname.setAttribute("data-bs-toggle", "dropdown")
  newNickname.setAttribute("aria-expanded", "false")
  newNickname.innerText = login_user.nickname
  profile_name_box.appendChild(newNickname)

  const profile_dropdown = document.getElementById("profile_dropdown")
  const newItem = document.createElement("li")
  newItem.setAttribute("class", "dropdown-item-box")
  profile_dropdown.appendChild(newItem)

  const newItem_a = document.createElement("a")
  newItem_a.setAttribute("id", login_user.id)
  newItem_a.setAttribute("class", "dropdown-item")
  newItem_a.setAttribute("onclick", "getProfilePage(this.id)")
  newItem_a.innerText = "My 프로필"
  newItem.appendChild(newItem_a)

  const newItem2 = document.createElement("li")
  newItem2.setAttribute("class", "dropdown-item-box")
  profile_dropdown.appendChild(newItem2)

  const newItem_a2 = document.createElement("a")
  newItem_a2.setAttribute("id", login_user.id)
  newItem_a2.setAttribute("class", "dropdown-item")
  newItem_a2.setAttribute("onclick", "handleLogout()")
  newItem_a2.innerText = "로그아웃"
  newItem2.appendChild(newItem_a2)
}
ProfileInfo()

// 검색 페이지 보여주기 //
async function loadCommunitySearch() {
  communitys = await getCommunitySearch();

  const search_list = document.getElementById("search");
  communitys.forEach((community) => {
    const newSpan = document.createElement("span");
    newSpan.setAttribute("id", community.id);
    newSpan.setAttribute("class", "search_span");
    newSpan.setAttribute("onclick", "getCommunityDetailPage(this.id)");

    // const newImage = document.createElement("img");
    // newImage.src = `${backend_base_url + community.image}`;
    // newImage.setAttribute("id", community.id);
    // newImage.setAttribute("onclick", "getCommunityDetailPage(this.id)");
    // newSpan.appendChild(newImage);

    const newEmail = document.createElement("p");
    newEmail.innerText = community.user_nickname;
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
