if (!token) {
  window.location.replace(`${frontend_base_url}/login.html`);
}

// 프로필 보여주기
const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get("id");

// 프로필 드롭다운 가져오기
async function ProfileInfo() {
    login_user = await getName();

    const profile_img_box = document.getElementById("profile_img_box");
    let newImage = document.createElement("img");
    newImage.setAttribute("id", login_user.id)
    newImage.setAttribute("class", "dropdown_profile_img")
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

// 프로필 수정 전 기존 프로필 정보 조회
async function MyProfileUpdate(user_id) {
  profile = await getProfile(user_id);

  const profile_img = document.getElementById("profile_img");
  const nickname = document.getElementById("nickname");
  const email = document.getElementById("email");
  const age = document.getElementById("age");
  const gender = document.getElementById("gender");

  let image = document.createElement("img");
  image.setAttribute("class", "profile_image");
  image.src = `${backend_base_url}${profile.profile_img}`;
  profile_img.appendChild(image);

  nickname.setAttribute("placeholder", profile.nickname);

  if (profile.age) {
    age.setAttribute("placeholder", profile.age);
  } else {
    age.setAttribute("placeholder", "사용 안 함");
  }

  if (profile.gender == true) {
    gender.setAttribute("placeholder", "남");
  } else if (profile.gender == false) {
    gender.setAttribute("placeholder", "여");
  } else {
    gender.setAttribute("placeholder", "사용 안 함");
  }

  email.innerText = profile.email;
}
MyProfileUpdate(user_id);

// 프로필 수정
async function MyProfileUpdateForm() {
  let profile_img = document.getElementById("profile_img_file").files[0];
  let nickname = document.getElementById("nickname").value;
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;

  const formdata = new FormData();

  if (profile_img) {
    formdata.append("profile_img", profile_img);
  }

  if (nickname) {
    formdata.append("nickname", nickname);
  }

  if (age) {
    formdata.append("age", age);
  }

  if (gender == "남") {
    formdata.append("gender", true);
  } else if (gender == "여") {
    formdata.append("gender", false);
  } else {
    formdata.append("gender", "");
  }

  updateMyProfile(formdata);
}

// 드롭다운 선택 시 성별 값 변경
async function ChangeGender(id) {
  const gender = document.getElementById("gender");
  gender.setAttribute("value", id);
}
