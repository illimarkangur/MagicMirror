Module.register("paevajaanud", {
  // vaikimisi config
  defaults: {
    textColor: "white",
    dates: [
      // sisesta kuupäev formaadis 'dd/MM/yyyy'
      { name: "Aasta 2025", date: "01/01/2025" },
      { name: "Aasta 2026", date: "01/01/2026" },
    ],
  },

  start: function () {
    var self = this;
    setInterval(function () {
      self.updateDom(); // no speed defined, so it updates instantly.
    }, 1000); //perform every 1000 milliseconds.
  },

  getDaysLeft: function (i) {
    const date = Date.now();

    var formattedDate = dateFormat(this.config.dates[i].date);
    const targetDate = new Date(formattedDate);

    const difference = targetDate - date;

    // tagastab päevade arvu, jagades ajavahet millisekundite arvuga ühes päevas
    return Math.floor(difference / (1000 * 60 * 60 * 24));
  },

  //võtab configis kirjutatud dd/MM/yyyy formati ja tõstab selle ümber MM/dd/yyyy formaati, mis on Date() funktsioonis vajalik
  dateFormat: function (date) {
    const dd = date.split("/")[0];
    const mm = date.split("/")[1];
    const yyyy = date.split("/")[2];

    const formattedDate = mm + "/" + dd + "/" + yyyy;
    return formattedDate;
  },

  // mooduli elemendid ja stiil
  getDom: function () {
    var wrapper = document.createElement("div");
    wrapper.style.color = this.config.textColor;

    for (let i in this.config.dates) {
      var text = document.createTextNode(
        this.config.dates[i].name + ": " + getDaysLeft(i) + " päeva."
      );

      wrapper.appendChild(text);

      wrapper.appendChild(document.createElement("br"));
    }
    return wrapper;
  },
});
