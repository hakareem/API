const deleteText = document.querySelectorAll(".fa-trash");
const thumbsText = document.querySelectorAll(".fa-thumbs-up");

Array.from(deleteText).forEach((el) => {
  el.addEventListener("click", deleteTeam);
});

Array.from(thumbsText).forEach((el) => {
  el.addEventListener("click", addLike);
});

async function deleteTeam() {
  const name = this.parentNode.childNodes[1].innerText;
  const nickname = this.parentNode.childNodes[3].innerText;

  try {
    const res = await fetch("deleteTeam", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        nickname: nickname,
      }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function addLike() {
  const founded = this.parentNode.childNodes[1].innerText;
  const nickname = this.parentNode.childNodes[3].innerText;
  const likes = Number(this.parentNode.childNodes[5].innerText);
  try {
    const res = await fetch("addOneLike", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        founded: founded,
        nickname: nickname,
        likes: likes,
      }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
