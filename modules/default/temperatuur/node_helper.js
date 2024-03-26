var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({

  start: function() {
    this.dhtSensor = require('node-dht-sensor'); 
  },


  /*
  readFromSensor: function () {
    //sensorilt lugemise funktsioon
    var sensor = require("node-dht-sensor")    
    sensor.read(11, 4, function(err, temperature, humidity) {
      if (!err) {
        return {temperature: temperature, 
                humidity: humidity,
        };
      }
    });
  },
  */

  readFromSensor: function (callback) {
    this.dhtSensor.read(11, 4, (err, temperature, humidity) => { 
      if (err) {
        console.log('Error reading sensor:', err);
        if (callback) { 
          callback(err); 
        }
        return;
      } else {
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
          }
        });
        break;
    }
  },
})