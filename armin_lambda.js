console.log('Loading function');

var config = {
    "thingName": 'mynxpthing',
    "endpointAddress": "a14vle4fydszd5.iot.us-east-1.amazonaws.com"
}

var AWS = require('aws-sdk');
var iotdata = new AWS.IotData({endpoint: config.endpointAddress});

exports.handler = function(event, context, callback) {
    iotdata.getThingShadow({
        thingName: config.thingName
    }, function(err, data) {
        if (err) {
            callback(null, err)
        } else {
            
            var result =  JSON.parse(data.payload)
            var polen = parseInt(result.state.reported['polen'])
            var ozone = parseInt(result.state.reported['ozone'])
            var particles = parseInt(result.state.reported['particles '])
            
            var ozone_answer =""
            var polen_answer = ""
            var particles_answer = ""
            if(ozone < 100){
                ozone_answer = "is a good day for enjoying the outdoors"
            }else{
                ozone_answer = "you need to take special measures to be outdoor"
            }
            
            if(polen > 500){
                polen_answer = "remember to take your alergies medicament"
            }
            else{
                polen_answer = "It seems like you don't need your alergies medicament at home"
            }
            
            if(particles > 3){
                particles_answer = "It may sound silly... but consider to use face masks.... It's for your own good"
            }
        
            callback(null, { 
                polen : polen, 
                ozone: ozone,  
                particles : particles,
                alexa : {
                particles_answer : particles_answer,
                polen_answer : polen_answer,
                ozone_answer : ozone_answer
                }
            } )
        }
    });
};
