document.getElementById("menu").onclick = ()=>{
    document.getElementById("menu").style.display = "none";
    document.getElementById("close").style.display = "block";
    document.getElementById("ul").style.display = "block";
    document.getElementById("menuCont").style.borderRight = "#43afa1 solid 4px";
    document.getElementById("menuCont").style.width = "50vw";
    document.getElementById("menuCont").style.height = "100vh";
    document.getElementById("menuCont").style.animation = "menuAnimStart 0.3s";
}
document.getElementById("close").onclick = ()=>{
    document.getElementById("menu").style.display = "block";
    document.getElementById("close").style.display = "none";
    document.getElementById("ul").style.display = "none";
    document.getElementById("menuCont").style.width = "fit-content";
    document.getElementById("menuCont").style.borderRight = "none";
    document.getElementById("menuCont").style.height = "fit-content";
    document.getElementById("menuCont").style.animation = "menuAnimEnd 0.3s";
}

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});
