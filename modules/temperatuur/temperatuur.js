Module.register("temperatuur", {

    // vaikimisi config
    defaults: {
        sensor: {
          type: "DHT11",
          pin: 4,
          library: require("dht-sensor")
        },
        textColor: "white",
      },
  
    // mooduli elemendid
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
      return this.config.sensor.read().temperature;
    },
  
    // Loe andurilt niiskusenäit
    getHumidity: function () {
      return this.config.sensor.read().humidity;
    },
  });
  