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

// 전체 음식 리스트 target 나누기
async function AllFoodList(id) {
  foods = await getAllFoodList();

  const food_list = document.getElementById("target_foods");
  food_list.innerText = "";

  var i = 0;

  foods.forEach((food) => {
    if (food.target == id) {
      if (i < 9) {
        const menu_image = document.createElement("div");

        const newFood = document.createElement("p");
        newFood.setAttribute("class", "food_name")
        newFood.setAttribute("id", food.food_id);
        newFood.setAttribute("onclick", "FoodDetail(this.id)");
        newFood.innerText = food.menu;

        const newImage = document.createElement("img");
        newImage.setAttribute("id", food.food_id);
        newImage.setAttribute("onclick", "FoodDetail(this.id)");
        newImage.src = food.image;

        menu_image.appendChild(newFood);
        menu_image.appendChild(newImage);

        if (i % 2 == 1) {
          menu_image.setAttribute("class", "odd");
        } else {
          menu_image.setAttribute("class", "even");
        }

        food_list.appendChild(menu_image);

        i += 1;
      }
    }
  });
}
