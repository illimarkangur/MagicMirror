Module.register("temperatuur", {

    // vaikimisi config
    defaults: {
        textColor: "white",
        interval: 1000, //iga sekund
      },

    sensor: require("node-dht-sensor"),
    temperature: null,
    humidity: null,
  
    // mooduli elemendid
    start: function () {
      setInterval(function() {
        this.updateDom();
      }, this.config.interval); 
    },
    
    readFromSensor: function () {
      //sensorilt lugemis funktsioon
      this.sensor.read(11, 4, function(err, temperature, humidity) {
        if (!err) {
          return {temperature: temperature, humidity: humidity};
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

      text = document.createTextNode(this.getTemperature() + "°C" + " - " + this.getHumidity() + "%");
      wrapper.appendChild(text);

      return wrapper;
    }
});
  