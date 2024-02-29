const URL = "https://api.pexels.com/v1/search?query=[cat]";

// eseguire una fetch fa partire in automatico una richiesta HTTP ad un indirizzo specifico
fetch(URL)
  // nel primo step la fetch ci restituisce SEMPRE un oggetto Response
  .then((response) => {
    // per ricavare il dato contenuto nella proprietà body dell'oggetto Response
    // dobbiamo andare a convertirlo con il metodo più appropriato
    // nel nostro caso è contenuto un dato di tipo JSON e quindi useremo il metodo .json()
    // questo metodo contiene una Promise, che ci metterà un certo tempo per convertire il dato.
    // Occorre quindi ASPETTARE che finisca per poter ricevere il dato che stavamo cercando
    console.log(response);

    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 400) {
        throw new Error("400 - Errore lato client");
      }

      if (response.status === 404) {
        throw new Error("404 - Dato non trovato");
      }

      if (response.status === 500) {
        throw new Error("500 - Errore lato server");
      }

      throw new Error("Errore nel reperimento dati");
    }
  })
  .then((agendaList) => {
    // questo contesto si avvierà in automatico nel momento in cui la precedente Promise (response.json()) si sarà risolta.
    // questo ci sincronizza PERFETTAMENTE col momento nel tempo in cui il dato è ARRIVATO! (questo sarà vero a prescindere alle varibili di: connessione, tempi di risposta del server, ecc..)
    // il valore di ritorno di response.json() lo troviamo nel parametro che noi abbiamo nominato agendaList

    console.log(agendaList);

    const ul = document.getElementById("currentAppointments");
    agendaList.forEach((appointment) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex align-items-center column-gap-2";
      li.innerHTML = `<strong>${new Date(appointment.time).toLocaleDateString()}</strong> — <span class="me-auto">${
        appointment.name
      }</span>  <span class="badge ${appointment.price ? "text-bg-dark" : "text-bg-success"}">${
        appointment.price ? appointment.price : "gratis"
      }</span> <a href="./details.html?agendaId=${appointment._id}">Dettagli</a>`;
      ul.appendChild(li);
    });
  })
  .catch((err) => console.log(err));
