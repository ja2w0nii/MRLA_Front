if (!token) {
  window.location.replace(`${frontend_base_url}/login.html`);
}

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
        newFood.setAttribute("id", food.food_id);
        newFood.innerText = food.menu;

        const newImage = document.createElement("img");
        newImage.setAttribute("id", food.food_id);
        // newImage.setAttribute("onclick", );
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
  console.log(food_list);
}
