Module.register("temperatuur", {

    // vaikimisi config
    defaults: {
        textColor: "white",
        interval: 1000, //iga sekund
        sensor: require("node-dht-sensor"),
      },

    sensor: null,
    temperature: null,
    humidity: null,
  
    // mooduli elemendid
    start: function () {
      setInterval(function() {
        this.updateDom();
      }, this.config.interval); 
    },

    getDom: function () {
      var wrapper = document.createElement("div");
      wrapper.style.color = this.config.textColor;
  
      var tempSpan = document.createElement("span");
      tempSpan.innerHTML = "Temperatuur: " + this.getTemperature() + "°C";
      wrapper.appendChild(tempSpan);
  
      var niiskSpan = document.createElement("span");
      niiskSpan.innerHTML = "Niiskus: " + this.getHumidity() + "%";
      wrapper.appendChild(niiskSpan);
  
      return wrapper;
    },
  
    // Loe andurilt temperatuurinäit
    getTemperature: function () {
      return this.readFromSensor().temperature;
    },
  
    // Loe andurilt niiskusenäit
    getHumidity: function () {
      return this.readFromSensor().humidity;
    },

    readFromSensor: function () {
      this.config.sensor.read(11, 4, function(err, temperature, humidity) {
        if (!err) {
          return {temperature: temperature, humidity: humidity};
        } else {
          // errori korral ei tee midagi ehk jääb viimatise õnnestunud lugemise väärtused
        }
      });
    }
});
  