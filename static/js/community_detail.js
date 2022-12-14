if (!token) {
  window.location.replace(`${frontend_base_url}/login.html`);
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
    newItem_a2.innerText = "로그아웃"
    newItem2.appendChild(newItem_a2)
}
ProfileInfo()

// 디테일 페이지 보여주기 //
const urlParams = new URLSearchParams(window.location.search);
const community_id = urlParams.get("id");

async function CommunityDetail(community_id) {
  const community = await getCommunityDetail(community_id);

  const user = document.getElementById("user");
  const title = document.getElementById("title");
  const content = document.getElementById("content");

  user.setAttribute("id", community.user);
  user.setAttribute("onclick", "getProfilePage(this.id)");

  user.innerText = community.user;
  title.innerText = community.title;
  content.innerText = community.content;
}
CommunityDetail(community_id);
