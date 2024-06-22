$(document).ready(function () {
  const foodItems = [
    { name: "Nasi Lemak", calories: 640 },
    { name: "Nasi Ayam", calories: 580 },
    { name: "Mee Goreng", calories: 540 },
    { name: "Donut", calories: 195 },
    { name: "Pizza", calories: 285 },
    { name: "Burger", calories: 354 },
    { name: "Kimchi", calories: 23 },
    { name: "Ramen", calories: 436 },
  ];

  function populateFoodDropdown() {
    const foodSelect = $("#foodSelect");
    foodSelect.empty();
    foodSelect.append(
      '<option value="" disabled selected>Select Food</option>'
    );
    foodItems.forEach((food) => {
      foodSelect.append(
        `<option value="${food.calories}" data-name="${food.name}">${food.name} - ${food.calories} cal</option>`
      );
    });
  }

  function logFood(foodName, calories) {
    let loggedFoods = JSON.parse(sessionStorage.getItem("loggedFoods")) || [];
    loggedFoods.push({ foodName, calories: parseInt(calories) });
    sessionStorage.setItem("loggedFoods", JSON.stringify(loggedFoods));
    window.parent.postMessage("updateDashboard", "*");
  }

  $("#foodForm").submit(function (event) {
    event.preventDefault();
    const mealType = $("#mealType").val();
    const foodSelect = $("#foodSelect option:selected");
    const selectedFood = foodSelect.data("name");
    const calories = foodSelect.val();
    alert(`Meal Type: ${mealType}\nSelected Food: ${selectedFood}`);

    logFood(selectedFood, calories);

    location.href = "index.html"; // Redirect to index.html after submission
  });

  populateFoodDropdown();
});
