Module.register("temperatuur", {

    // vaikimisi config
    defaults: {
        textColor: "white",
      },

    temperature: null,
    humidity: null,
  
    // mooduli elemendid
    start: function () {
      setInterval(function() {
        this.updateDom();
      }, 1000); //iga sekund
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
  