const exerciseItems = [
  { name: "Walking", calories: -150 },
  { name: "Running", calories: -400 },
  { name: "Swimming", calories: -300 },
  { name: "Cycling", calories: -250 },
  { name: "Yoga", calories: -120 },
  { name: "Weightlifting", calories: -200 },
  { name: "Jumping Rope", calories: -180 },
];

$(document).ready(function () {
  function populateExerciseDropdown() {
    const exerciseSelect = $("#exerciseType");
    exerciseSelect.empty();
    exerciseSelect.append(
      '<option value="" disabled selected>Select Exercise</option>'
    );
    exerciseItems.forEach((exercise) => {
      exerciseSelect.append(
        `<option value="${exercise.calories}" data-name="${exercise.name}">${
          exercise.name
        } - ${Math.abs(exercise.calories)} cal</option>`
      );
    });
  }

  function logExercise(exerciseName, calories) {
    let loggedExercises =
      JSON.parse(sessionStorage.getItem("loggedExercises")) || [];
    loggedExercises.push({ exerciseName, calories: parseInt(calories) });
    sessionStorage.setItem("loggedExercises", JSON.stringify(loggedExercises));
    window.parent.postMessage("updateDashboard", "*");
  }

  $("#exerciseForm").submit(function (event) {
    event.preventDefault();
    const exerciseSelect = $("#exerciseType");
    const selectedExercise = exerciseSelect
      .find("option:selected")
      .data("name");
    const calories = exerciseSelect.val();
    alert(`Logged Exercise: ${selectedExercise}`);

    logExercise(selectedExercise, calories);

    location.href = "index.html"; // Redirect to index.html after submission
  });

  populateExerciseDropdown();
});
