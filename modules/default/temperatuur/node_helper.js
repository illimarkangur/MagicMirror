var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({

  start: function() {

  },
  
  temperature: null,
  humidity: null,

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
    Log.log(this.readFromSensor().humidity);
    return this.readFromSensor().humidity;
  },

  socketNotificationReceived: function(notification) {
    switch(notification) {
      case "READ_FROM_SENSOR":
        var payload = (this.getTemperature() + "°C" + " - " + this.getHumidity() + "%");
        this.sendSocketNotification("READ", payload);
        break
    }
  },
})