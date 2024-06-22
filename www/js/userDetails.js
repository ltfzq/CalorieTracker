$(function () {
  $("#userDetailsForm").submit(function (e) {
    e.preventDefault();
    e.stopPropagation();

    const age = parseInt($("#age").val());
    const height = parseInt($("#height").val());
    const weight = parseInt($("#weight").val());
    const targetWeight = parseInt($("#targetWeight").val());
    const workoutFrequency = parseInt($("#workoutFrequency").val());

    const gender = "male"; // Assuming gender is male for simplicity. Add a gender input if needed.

    // Calculate BMR using the Mifflin-St Jeor equation
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate TDEE based on workout frequency
    let activityFactor;
    if (workoutFrequency <= 1) {
      activityFactor = 1.2;
    } else if (workoutFrequency <= 3) {
      activityFactor = 1.375;
    } else if (workoutFrequency <= 5) {
      activityFactor = 1.55;
    } else if (workoutFrequency <= 7) {
      activityFactor = 1.725;
    } else {
      activityFactor = 1.9;
    }

    const tdee = bmr * activityFactor;

    // Adjust TDEE for weight loss or gain
    const calorieGoal = targetWeight < weight ? tdee - 500 : tdee + 500;

    // Store the calorie goal in sessionStorage
    sessionStorage.setItem("calorieGoal", calorieGoal);

    // Assuming details are successfully submitted
    sessionStorage.detailsSubmitted = true;
    location.href = "index.html"; // Redirect to index.html after submitting details
  });
});
