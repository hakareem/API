document.querySelector("#btn").addEventListener("click", apiRequest);

async function apiRequest() {
  const userInput = document.querySelector("input").value;
  const res = await fetch(`https://zodiacc-api.herokuapp.com/api/${userInput}`);
  const data = await res.json();

  console.log(data);
  document.querySelector("img").src = data.img;
  document.querySelector("#founded").textContent = data.founded;
  document.querySelector("#nickname").textContent = data.nickname;
  document.querySelector("#manager").textContent = data.manager;
  document.querySelector("#league").textContent = data.league;
}
