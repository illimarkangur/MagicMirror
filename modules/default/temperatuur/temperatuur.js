Module.register("temperatuur", {

    // vaikimisi config
    defaults: {
        textColor: "white",
      },
    
    // mooduli elemendid
    start: function () {
      setInterval(()=>{
        this.sendSocketNotification("READ_FROM_SENSOR");
      }, 1000);

    },

    notificationReceived: function(notification) {
      switch(notification) {
        case "DOM_OBJECTS_CREATED":
          this.updateDom();
          break;
      }
    },
    
    getDom: function () {
      var wrapper = document.createElement("div");
      wrapper.style.color = this.config.textColor;
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
  