var URL1 = "http://83.69.213.178:8081/init?device_id=01";
var URL2;
var game_id;
var data1;
var data2;
var latitude;
var longitude;

function Request1(){
	$(document).ready(function () {
		$.ajax({
			type: "GET",
			url: URL1,
			dataType: "json",
			success: Response1
		});
	});
}

function Request2(){
//function Request2(latitude, longitude){
for(var i = 55.79; i < 55.81; i+=0.00001){
	for(var j = 37.59; j < 37.61; j+=0.000001){
	URL2 = "http://83.69.213.178:8081/check_point?game_id=" + String(game_id) + "&latitude=" + String(i) + "&longitude=" + String(j);
	$("#response3").html(String(i) + "<br>" + String(j));
	//URL2 = "http://83.69.213.178:8081/check_point?game_id=" + String(game_id) + "&latitude=" + String(latitude) + "&longitude" + String(longitude);
	$(document).ready(function () {
		$.ajax({
			type: "GET",
			url: URL2,
			dataType: "json",
			success: Response2
		});
	});
}
}
}

function Response1(response){
	$("#response1").html("status: " + response['status'] + "<br>game_id: " + response['game_id']);
	game_id = response['game_id']
}


function Response2(response){
	$("#response2").html("<br>status: " + response['status']
			+ "<br>distance: " + response['distance']
			+ "<br>remained_points: " + response['remained_points']
			+ "<br>current_point: " + response['current_point']
			+ "<br>description: " + response['description']);
}

Request1();

function Error(){
	alert("Error");
}

function getLocation()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(Request2, Error);
    }
    else
    {
        alert("Geolocation is not supported by this browser.");
    }
    setTimeout("getLocation();", 1000);
}
setTimeout("Request2();", 1000);
//setTimeout("getLocation();", 500);
//55.80
//37.60