$(document).ready(function () {
  function updateCalories() {
    const calorieGoal = parseInt(sessionStorage.getItem("calorieGoal")) || 2000;
    const calorieFood = parseInt($("#calorieFood").text()) || 0;
    const calorieExercise = parseInt($("#calorieExercise").text()) || 0;
    const calorieRemaining = calorieGoal - calorieFood - calorieExercise;

    $("#calorieGoal").text(calorieGoal);
    $("#calorieRemaining").text(calorieRemaining);

    const progress = ((calorieFood + calorieExercise) / calorieGoal) * 100;
    $("#calorieProgressBar").css("width", `${progress}%`);
  }

  function updateDashboard() {
    const loggedFoods = JSON.parse(sessionStorage.getItem("loggedFoods")) || [];
    const loggedExercises =
      JSON.parse(sessionStorage.getItem("loggedExercises")) || [];
    let calorieFood = 0;
    let calorieExercise = 0;

    loggedFoods.forEach((food) => {
      calorieFood += parseInt(food.calories);
    });

    loggedExercises.forEach((exercise) => {
      calorieExercise += parseInt(exercise.calories);
    });

    $("#calorieFood").text(calorieFood);
    $("#calorieExercise").text(calorieExercise);
    $("#calorieExerciseBox").text(calorieExercise);
    updateCalories(); // Call the updateCalories function to update remaining calories
  }

  // Listen for messages from food.js and exercise.js
  window.addEventListener("message", function (event) {
    if (event.data === "updateDashboard") {
      updateDashboard();
    }
  });

  // Initial call to update dashboard
  updateDashboard();
});
