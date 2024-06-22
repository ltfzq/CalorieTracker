$(function () {
  $("#btnLogin").click(function () {
    location.href = "login.html";
  });

  $("#frmRegister").submit(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var name = $("#name").val();
    var email = $("#email").val();

    var password1 = $("#password1").val();
    var password2 = $("#password2").val();

    if (!enoughLength(password1, password2)) {
      alert("Password must be at least 7 characters long");
      return;
    } else if (!match(password1, password2)) {
      alert("Passwords do not match");
      return;
    } else {
      var datalist =
        "name=" + name + "&email=" + email + "&password=" + password1;
      $.ajax({
        type: "post",
        url: "https://bengkel.odaje.biz/register.php",
        data: datalist,
        cache: false,
        success: function (mydata) {
          if (mydata.status === -1) {
            alert(mydata.msg);
          } else {
            alert(mydata.msg);
            location.href = "login.html";
          }
        },
        error: function (e) {
          console.log("Ajax error");
          alert("Please contact admin!");
        },
      });
    }
  });

  function match(p1, p2) {
    return p1 === p2;
  }

  function enoughLength(p1, p2) {
    return p1.length >= 7 && p2.length >= 7;
  }
});
