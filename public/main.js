const deleteText = document.querySelectorAll(".fa-trash");
const thumbText = document.querySelectorAll(".fa-thumbs-up");

Array.from(deleteText).forEach((el) => {
  el.addEventListener("click", deleteTeam);
});

Array.from(thumbText).forEach((el) => {
  el.addEventListener("click", addLike);
});

async function deleteTeam() {
  const teamName = this.parentNode.childNodes[1].innerText;
  const leagueName = this.parentNode.childNodes[3].innerText;
  try {
    const response = await fetch("deleteTeam", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teamName: teamName,
        leagueName: leagueName,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function addLike() {
  const teamName = this.parentNode.childNodes[1].innerText;
  const leagueName = this.parentNode.childNodes[3].innerText;
  const likes = Number(this.parentNode.childNodes[5].innerText);
  try {
    const response = await fetch("addOneLike", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teamName: teamName,
        leagueName: leagueName,
        likes: likes,
      }),
    });

    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
