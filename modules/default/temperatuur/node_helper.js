var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({

  temperature: null,
  humidity: null,

  start: function() {
    this.dhtSensor = require('node-dht-sensor'); 
  },

  readFromSensor: function (callback) {
    this.dhtSensor.read(11, 4, (err, temperature, humidity) => { 
      if (err) {
        console.log('Error reading sensor:', err);
        console.log(this.temperature, this.humidity);
        callback(this.temperature, this.humidity);
      } else {
        this.temperature = temperature;
        this.humidity = humidity;
        callback(temperature, humidity);
      }
    });
  },

  socketNotificationReceived: function(notification) {
    switch(notification) {
      case "READ_FROM_SENSOR":
        this.readFromSensor((temperature, humidity) => {
          
          if (temperature !== undefined && humidity !== undefined) {
            const payload = `${temperature}°C ${humidity}%`;
            this.sendSocketNotification("READ", payload);
          } else {
            console.log('Error reading sensor values (callback)');
            
            const payload = `${this.temperature}°C ${this.humidity}%`;
            this.sendSocketNotification("READ", payload);
          }
        });
        break;
    }
  },
})