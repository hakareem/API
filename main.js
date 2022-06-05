"use strict";
document.querySelector("button").addEventListener("click", apiRequest);

async function apiRequest() {
  try {
    const userInput = document.querySelector("input").value;
    const res = await fetch(`/api?month=${userInput}`);
    const data = await res.json();

    console.log(data);
    document.querySelector("#period").textContent = data.period;
    document.querySelector("#traits").textContent = data.traits;
  } catch (err) {
    console.log(err);
  }
}
