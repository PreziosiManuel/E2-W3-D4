const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const imgAll = document.querySelectorAll("img");
const cardAll = document.querySelectorAll(".col-md-4");
const btnHide = document.querySelectorAll(".btn-danger");
const allText = document.querySelectorAll(".textId");
const form = document.getElementById("form");
const input = document.getElementById("input");

form.onsubmit = function (e) {
  e.preventDefault();
  call(input.value);
};

// console.log(imgAll);

btn1.onclick = function () {
  call("cat");
};
btn2.onclick = function () {
  call("house");
};
// buttonClick

function call(nome) {
  fetch(`https://api.pexels.com/v1/search?query=[${nome}]`, {
    method: "GET",
    headers: {
      Authorization: "2e8ZetkDjUODubNN2l9u0OoIBHSjOl6sSfFhN9iVBcXZ1iZmCWVOUQWu",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("ERRORE NEL REPERIMENTO DATI");
      }
    })
    .then((oggetti) => {
      console.log(oggetti);

      imgAll.forEach((img, index) => {
        img.setAttribute("src", oggetti.photos[index].src.tiny);
      });
      allText.forEach((textId, index) => {
        textId.textContent = oggetti.photos[index].id;
      });

      //   console.log(oggetti.photos);
    })
    .catch((error) => console.log(error));
}

btnHide.forEach((btnhide, index) => {
  btnhide.onclick = () => {
    cardAll[index].remove();
  };
});
