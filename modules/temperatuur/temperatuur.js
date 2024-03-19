Module.register("temperatuur", {

    // vaikimisi config
    defaults: {
        sensor: {
          type: "DHT11",
          pin: 4,
          library: require("dht-sensor")
        },
        textColor: "white",
        interval: 1000, //iga sekund
      },

    sensor: null,
    temperature: null,
    humidity: null,
  
    // mooduli elemendid
    start: function () {
      var self = this;
      setInterval(function() {
        self.updateDom();
      }, this.config.interval); 
      self.sensor = require("node-dht-sensor");
      return sensor;
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
      return this.read().temperature;
    },
  
    // Loe andurilt niiskusenäit
    getHumidity: function () {
      return this.read().humidity;
    },

    read: function () {
      this.sensor.read(11, 4, function(err, temperature, humidity) {
        if (!err) {
          return {temperature: temperature, humidity: humidity};
        } else {};
      }
    }
});
  