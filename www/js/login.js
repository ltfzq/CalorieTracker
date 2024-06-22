$(function () {
  $("#frmLogin").submit(function (e) {
    e.preventDefault();
    e.stopPropagation();

    var email = $("#email").val();
    var password1 = $("#password1").val();

    var datalist = { email: email, password: password1 };

    $.ajax({
      type: "post",
      url: "https://bengkel.odaje.biz/VerifyLogin.php",
      data: datalist,
      cache: false,
      success: function (mydata) {
        try {
          var newdata = JSON.parse(mydata);
          if (newdata.status == 1) {
            sessionStorage.loggedin = newdata.name;

            // Check if user has completed details submission
            if (sessionStorage.detailsSubmitted) {
              location.href = "index.html";
            } else {
              location.href = "userdetails.html";
            }
          } else {
            alert(newdata.msg);
          }
        } catch (e) {
          alert("Error parsing server response.");
        }
      },
      error: function (e) {
        console.log("Ajax error");
        alert("Please contact admin!");
      },
    });
  });
});
