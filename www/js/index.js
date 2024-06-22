$(function () {
  if (!sessionStorage.loggedin || sessionStorage.loggedin == null) {
    location.href = "login.html";
  } else if (!sessionStorage.detailsSubmitted) {
    location.href = "userdetails.html";
  }

  var link1 = crossroads.addRoute("/logout", function () {
    sessionStorage.removeItem("loggedin");
    location.href = "login.html";
  });

  function parseHash(newHash, oldHash) {
    crossroads.parse(newHash);
  }

  hasher.initialized.add(parseHash);
  hasher.changed.add(parseHash);
  hasher.init();
});
