Module.register("temperatuur", {

    // vaikimisi config
    defaults: {
        textColor: "white",
      },
    
    // mooduli elemendid
    start: function () {

    },

    notificationReceived: function(notification) {
      switch(notification) {
        case "DOM_OBJECTS_CREATED":

          setInterval(()=>{
            this.updateDom();
          }, 2000);
          break;
      }
    },
    
    getDom: function () {
      var wrapper = document.createElement("div");
      wrapper.style.color = this.config.textColor;

      this.sendSocketNotification("READ_FROM_SENSOR");
      var element = document.createElement("p");
      element.id = "text";

      wrapper.appendChild(element);
      
      return wrapper;
    },

    socketNotificationReceived: function(notification, payload) {
      switch(notification) {
        case "READ":
          var p = document.getElementById("text");
          p.innerHTML = payload;
          break
      }
    },
});
  