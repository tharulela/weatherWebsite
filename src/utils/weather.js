const req = require('request');

const forecast=(longt,lat,callback)=> {
    const url="http://api.weatherstack.com/current?access_key=393455d22f7f9c6b86320231c0ba76c3&query="+encodeURIComponent(lat) + "," +encodeURIComponent(longt);
    req({url, json :true}, (error,{body}) =>{
		if(error){
			callback("Unable to connect to weather servece!",undefined);
			console.log(error);
		}else if (body.error){
			callback("Unable to find weather!",undefined);
		} 
		else{
			callback(undefined, {
				weatherdescription :  body.current.weather_descriptions[0],
				temperature : body.current.temperature ,
				feelslike :  body.current.feelslike 

			})
		}
	});
}
module.exports =forecast