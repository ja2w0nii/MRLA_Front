if (!token) {
  window.location.replace(`${frontend_base_url}/login.html`);
}

// 음식 추천 슬라이더 ========================================================================
$(document).ready(function () {
  var i = [1, 2, 3, 4, 5, 6, 7];
  //   Click Left
  $("#ClickRight").click(function () {
    $("#ClickRight").prop("disabled", true);
    setTimeout(function () {
      $("#ClickRight").prop("disabled", false);
    }, 500);
    var getShift = i.shift();
    i.push(getShift);
    $("#recommend_box1")
      .removeClass($("#recommend_box1").attr("class"))
      .addClass("recommend_container" + i[0]);
    $("#recommend_box2")
      .removeClass($("#recommend_box2").attr("class"))
      .addClass("recommend_container" + i[1]);
    $("#recommend_box3")
      .removeClass($("#recommend_box3").attr("class"))
      .addClass("recommend_container" + i[2]);
    $("#recommend_box4")
      .removeClass($("#recommend_box4").attr("class"))
      .addClass("recommend_container" + i[3]);
    $("#recommend_box5")
      .removeClass($("#recommend_box5").attr("class"))
      .addClass("recommend_container" + i[4]);
    $("#recommend_box6")
      .removeClass($("#recommend_box6").attr("class"))
      .addClass("recommend_container" + i[5]);
    $("#recommend_box7")
      .removeClass($("#recommend_box7").attr("class"))
      .addClass("recommend_container" + i[6]);
  });
  //   Click Right
  $("#ClickLeft").click(function () {
    $("#ClickLeft").prop("disabled", true);
    setTimeout(function () {
      $("#ClickLeft").prop("disabled", false);
    }, 400);
    var getPop = i.pop();
    i.unshift(getPop);
    $("#recommend_box1")
      .removeClass($("#recommend_box1").attr("class"))
      .addClass("recommend_container" + i[0]);
    $("#recommend_box2")
      .removeClass($("#recommend_box2").attr("class"))
      .addClass("recommend_container" + i[1]);
    $("#recommend_box3")
      .removeClass($("#recommend_box3").attr("class"))
      .addClass("recommend_container" + i[2]);
    $("#recommend_box4")
      .removeClass($("#recommend_box4").attr("class"))
      .addClass("recommend_container" + i[3]);
    $("#recommend_box5")
      .removeClass($("#recommend_box5").attr("class"))
      .addClass("recommend_container" + i[4]);
    $("#recommend_box6")
      .removeClass($("#recommend_box6").attr("class"))
      .addClass("recommend_container" + i[5]);
    $("#recommend_box7")
      .removeClass($("#recommend_box7").attr("class"))
      .addClass("recommend_container" + i[6]);
  });
});

// 프로필 드롭다운 가져오기
async function ProfileInfo() {
  login_user = await getName();

  const profile_img_box = document.getElementById("profile_img_box");
  let newImage = document.createElement("img");
  newImage.setAttribute("id", login_user.id);
  newImage.setAttribute("class", "profile_img");
  newImage.src = `${backend_base_url}${login_user.profile_img}`;
  profile_img_box.appendChild(newImage);

  const profile_name_box = document.getElementById("profile_name_box");
  const newNickname = document.createElement("a");
  newNickname.setAttribute("id", login_user.id);
  newNickname.setAttribute("class", "nav-link dropdown-toggle");
  newNickname.setAttribute("href", "#");
  newNickname.setAttribute("role", "button");
  newNickname.setAttribute("data-bs-toggle", "dropdown");
  newNickname.setAttribute("aria-expanded", "false");
  newNickname.innerText = login_user.nickname;
  profile_name_box.appendChild(newNickname);

  const profile_dropdown = document.getElementById("profile_dropdown");
  const newItem = document.createElement("li");
  newItem.setAttribute("class", "dropdown-item-box");
  profile_dropdown.appendChild(newItem);

  const newItem_a = document.createElement("a");
  newItem_a.setAttribute("id", login_user.id);
  newItem_a.setAttribute("class", "dropdown-item");
  newItem_a.setAttribute("onclick", "getProfilePage(this.id)");
  newItem_a.innerText = "My 프로필";
  newItem.appendChild(newItem_a);

  const newItem2 = document.createElement("li");
  newItem2.setAttribute("class", "dropdown-item-box");
  profile_dropdown.appendChild(newItem2);

  const newItem_a2 = document.createElement("a");
  newItem_a2.setAttribute("id", login_user.id);
  newItem_a2.setAttribute("class", "dropdown-item");
  // newItem_a2.setAttribute("onclick", "getProfilePage(this.id)")
  newItem_a2.innerText = "로그아웃";
  newItem2.appendChild(newItem_a2);
}
ProfileInfo();

// 추천 메뉴 리스트 가져오기
async function FoodList() {
  foods = await getFoodList();

  let i = 1;
  foods.forEach((food) => {
    const food_list = document.getElementById("recommend_box" + i);

    const newFood = document.createElement("div");
    newFood.setAttribute("id", food.food_id);
    // newFood.setAttribute("onclick", );
    newFood.innerText = food.menu;
    food_list.appendChild(newFood);

    const newImage = document.createElement("img");
    newImage.setAttribute("id", food.food_id);
    // newImage.setAttribute("onclick", );
    newImage.src = food.image;
    newFood.appendChild(newImage);

    i += 1;
  });
}
FoodList();

// 유명 맛집 슬라이더 ================================================================================
var container = document.getElementById("sns_famous_restaurant_container");
var slider = document.getElementById("slider");
var slides = document.getElementsByClassName("slide").length;
var buttons = document.getElementsByClassName("btn");

var currentPosition = 0;
var currentMargin = 0;
var slidesPerPage = 0;
var slidesCount = slides - slidesPerPage;
var containerWidth = container.offsetWidth;
var prevKeyActive = false;
var nextKeyActive = true;

window.addEventListener("resize", checkWidth);

function checkWidth() {
  containerWidth = container.offsetWidth;
  setParams(containerWidth);
}

function setParams(w) {
  if (w < 551) {
    slidesPerPage = 1;
  } else {
    if (w < 901) {
      slidesPerPage = 2;
    } else {
      if (w < 1101) {
        slidesPerPage = 3;
      } else {
        slidesPerPage = 4;
      }
    }
  }
  slidesCount = slides - slidesPerPage;
  if (currentPosition > slidesCount) {
    currentPosition -= slidesPerPage;
  }
  currentMargin = -currentPosition * (100 / slidesPerPage);
  slider.style.marginLeft = currentMargin + "%";
  if (currentPosition > 0) {
    buttons[0].classList.remove("inactive");
  }
  if (currentPosition < slidesCount) {
    buttons[1].classList.remove("inactive");
  }
  if (currentPosition >= slidesCount) {
    buttons[1].classList.add("inactive");
  }
}

setParams();

function slideRight() {
  if (currentPosition != 0) {
    slider.style.marginLeft = currentMargin + 100 / slidesPerPage + "%";
    currentMargin += 100 / slidesPerPage;
    currentPosition--;
  }
  if (currentPosition === 0) {
    buttons[0].classList.add("inactive");
  }
  if (currentPosition < slidesCount) {
    buttons[1].classList.remove("inactive");
  }
}

function slideLeft() {
  if (currentPosition != slidesCount) {
    slider.style.marginLeft = currentMargin - 100 / slidesPerPage + "%";
    currentMargin -= 100 / slidesPerPage;
    currentPosition++;
  }
  if (currentPosition == slidesCount) {
    buttons[1].classList.add("inactive");
  }
  if (currentPosition > 0) {
    buttons[0].classList.remove("inactive");
  }
}
