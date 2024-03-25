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
            this.updateDom(500);
          }, 1000);
          break;
      }
    },
    
    /*
    readFromSensor: function () {
      //sensorilt lugemis funktsioon
      var sensor = require("node-dht-sensor");
      sensor.read(11, 4, function(err, temperature, humidity) {
        if (!err) {
          return {temperature: temperature, humidity: humidity}
        } else {
          // errori korral ei tee midagi ehk jääb viimatise õnnestunud lugemise väärtused
        }
      });
    },
    */    

    
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
  