Module.register("temperatuur", {

    // vaikimisi config
    defaults: {
        textColor: "white",
      },
    
    start: function () {
      setInterval(()=>{
        this.sendSocketNotification("READ_FROM_SENSOR");
      }, 1000); // saadab sensori lugemis teavituse node_helper failile iga sekund

    },

    // uue objekti loomisel uuendab ekraani
    notificationReceived: function(notification) {
      switch(notification) {
        case "DOM_OBJECTS_CREATED":
          this.updateDom();
          break;
      }
    },
    
    // mooduli elemendid
    getDom: function () {
      var wrapper = document.createElement("div");
      wrapper.style.color = this.config.textColor;
      var element = document.createElement("p");
      element.id = "text";

      wrapper.appendChild(element);
      
      return wrapper;
    },

    // saab node_helper failist teavituse koos väärtustega ja uuendab elemendi
    socketNotificationReceived: function(notification, payload) {
      switch(notification) {
        case "READ":
          var p = document.getElementById("text");
          p.innerHTML = payload;
          break
      }
    },
});
  