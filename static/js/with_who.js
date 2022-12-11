if (!token) {
    window.location.replace(`${frontend_base_url}/login.html`);
}


// 전체 음식 리스트 target 나누기
async function AllFoodList(id) {

    foods = await getAllFoodList();

    const food_list = document.getElementById("target_foods");
    food_list.innerText = '';

    var i=0;

    foods.forEach((food) => {
        if (food.target == id) {
            if (i < 9){
                const newFood = document.createElement("p");
                newFood.setAttribute("id", food.id);
                newFood.innerText = food.menu;
                if (i % 2 == 1) {
                    newFood.setAttribute("class", "odd_p")
                } else {
                    newFood.setAttribute("class", "even_p")
                }
                food_list.appendChild(newFood)
                i += 1;
            }
        }
    })
}