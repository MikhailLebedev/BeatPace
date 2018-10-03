var audio = new Audio();
var song_url = [];
var song_artist = [];
var song_name = [];
var index = {};

function PlayPauseTrack() {
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
}

function PauseTrack() {
	audio.pause();
}

function PlayTrack() {
	audio.play();
}

function SelectTrack(id) {
	$("#track" + index[String(current_bpm)]).css("background", "transparent");
	var paused = true;
	paused = audio.paused;
	index[String(current_bpm)] = id;
	$("#track" + index[String(current_bpm)]).css("background", "#555599");
	if (index[String(current_bpm)] === song_url.length) {
		GetTrackList();
	}
	audio.src = song_url[index[String(current_bpm)]]; 
	audio.load();
	if (paused === false) {
		audio.play();
	}
}

function NextTrack() {
	$("#track" + index[String(current_bpm)]).css("background", "transparent");
	var paused = true;
	paused = audio.paused;
	index[String(current_bpm)] += 1;
	$("#track" + index[String(current_bpm)]).css("background", "#555599");
	if (index[String(current_bpm)] === song_url.length) {
		GetTrackList();
	}
	audio.src = song_url[index[String(current_bpm)]]; 
	audio.load();
	if (paused === false) {
		audio.play();
	}
}

function InitPlayer() {
	audio = $("#player")[0];
	audio.onended = NextTrack;
}

function GetTrackList() {
	var k = 1;
	/*
	if (current_bpm > TOP_BORDER) {
		k = 0.5;
	}
	if (current_bpm < BOT_BORDER) {
		k = 2;
	}*/
	var URL = "https://muzofond.com/search/" + String(current_bpm) + "%20bpm";
	$(document).ready(function () {
		$.ajax({
			type: "GET",
			url: URL,
			dataType: "html",
			success: Response
		});
	});
}

function Response(data) {
	$(".song-list").html("");
	if (index[String(current_bpm)] === undefined) {
		index[String(current_bpm)] = -1;
	}
	var count = 0;
	song_url = [];
	song_artist = [];
	song_name = [];
	var songs = $(data).find(".songs");
	songs.find(".download").each(
		function (){
			song_url.push($(this).find("a").attr("href"));
		}
	);
	songs.find("h3").each(
		function (){
			song_artist.push($(this).find(".artist").text());
			song_name.push($(this).find(".track").text());
			$(".song-list").append(
					"<div class='song-item' id='track" + count + "' onClick='SelectTrack(" + count + ");'>" +
						"<div class='name'>" + $(this).find(".track").text() + "</div>" +
						"<div class='artist'>" + $(this).find(".artist").text() + "</div>" +
					"</div>");
			count += 1;
		}
	);
	NextTrack();
}

function PressedOK() {
	if ($(".auto-mod").css("display") === "none") {
		GetTrackList();
	}
}