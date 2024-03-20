Module.register("paevajaanud", {

    // vaikimisi config
    defaults: {
        textColor: "white",
        dates:[
          // sisesta kuupäev formaadis 'dd/mm/yyyy'
            {name:"Aasta 2025", date:"01/01/2025"}, 
            {name:"Aasta 2026", date:"01/01/2026"}
        ]
      },
  
      getDaysLeft: function (i) {
        // leiab hetkeaja millisekundites
          const date = Date.now(); 
          // leiab tuleviku kuupäeva millisekundites
          const targetDate = new Date(dateFormat(this.config.dates.date[i]));
          // leiab ajavahemiku millisekundites
          const difference = targetDate - date; 
          // tagastab päevade arvu, jagades ajavahet millisekundite arvuga ühes päevas
          return Math.round(difference/(1000 * 60 * 60 * 24)) 
      },
  
      //võtab configis kirjutatud dd/MM/yyyy formati ja tõstab selle ümber MM/dd/yyyy formaati, mis on Date() funktsioonis vajalik
      dateFormat: function (date) {
  
        const dd = date.split('/')[0]; 
        const mm = date.split('/')[1]; 
        const yyyy = date.split('/')[2];
  
        const formattedDate = mm + '/' + dd + '/' + yyyy;
        return formattedDate
      },

    // mooduli elemendid ja stiil
    getDom: function () {
      var wrapper = document.createElement("div");
      wrapper.style.color = this.config.textColor;

      for (let i = 0; i < this.config.dates.length; i++) {
          var countdownSpan = document.createElement("span");

          countdowntext = document.createTextNode(this.config.dates.name[i] + ": " + getDaysLeft(i) + " päeva.");
          countdownSpan.appendChild(countdowntext);
          
          var br = document.createElement("br");
          countdownSpan.appendChild(br)

          wrapper.appendChild(countdownSpan);
        }

      return wrapper;
    }
  });