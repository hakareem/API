document.querySelector("#btn").addEventListener("click", apiRequest);

async function apiRequest() {
  const userInput = document.querySelector("input").value;
  const res = await fetch(`https://zodiacc-api.herokuapp.com/api/${userInput}`);
  const data = await res.json();

  console.log(data);
  document.querySelector("img").src = data.img;
  document.querySelector("#founded").textContent = "Founded: " + data.founded;
  document.querySelector("#nickname").textContent =
    "Nickname: " + data.nickname;
  document.querySelector("#manager").textContent = "Manager: " + data.manager;
  document.querySelector("#league").textContent = "League: " + data.league;
}
