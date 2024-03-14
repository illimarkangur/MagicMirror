Module.register("paevajaanud", {

    // vaikimisi config
    defaults: {
        textColor: "white",
        dates:[
            {name:"Aasta 2025", date:"01/01/2025"},
            {name:"Aasta 2026", date:"01/01/2026"}
        ]
      },
  
    // mooduli elemendid ja stiil
    getDom: function () {
      var wrapper = document.createElement("div");
      wrapper.style.color = this.config.textColor;

      for (let i = 0; i < this.config.dates.lenght; i++) {
          var countdownSpan = document.createElement("span");
          countdownSpan.innerHTML = this.config.dates.name[i] + ": " + getDaysLeft(i) + " päeva.";
          wrapper.appendChild(countdownSpan); // OHUKOHT? (samanimelised appendid) ??
        }

      return wrapper;
    },

    getDaysLeft: function (i) {
        const date = new Date.now(); // leiab hetkeaja millisekundites
        const futureDate = this.config.dates.date[i].getTime(); // leiab tuleviku kuupäeva millisekundites
        const difference = futureDate - date; // leiab ajavahemiku millisekundites
        return Math.round(difference/(1000 * 60 * 60 * 24)) // tagastab päevade arvu, jagades ajavahet millisekundite arvuga ühes päevas
    }
  });