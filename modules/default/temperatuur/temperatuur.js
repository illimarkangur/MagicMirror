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

    // Loe andurilt temperatuurinäit
    getTemperature: function () {
      return this.readFromSensor().temperature;
    },
  
    // Loe andurilt niiskusenäit
    getHumidity: function () {
      return this.readFromSensor().humidity;
    },

    
    getDom: function () {
      var wrapper = document.createElement("div");
      wrapper.style.color = this.config.textColor;

      wrapper.innerHTML = this.getTemperature() + "°C" + " - " + this.getHumidity() + "%";
      /*
      text = document.createTextNode(this.getTemperature() + "°C" + " - " + this.getHumidity() + "%");
      wrapper.appendChild(text);
      */
      return wrapper;
    }
});
  