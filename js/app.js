var sound_mode;
var volume_value;
var volume_set_delay;
var current_bpm;
var MIN_BPM = 40;
var MAX_BPM = 320;
var MID_BPM = 120;
var BOT_BORDER = 80;
var TOP_BORDER = 160;
var prev_bpm1 = MID_BPM;
var prev_bpm2 = MID_BPM;
var DELTA1 = 5;
var DELTA2 = 10;

// === INIT FUNCTION ===
(function Init() {
	HideVolumeSet();
	InitPlayer();
	SetBPM(MID_BPM);
	tizen.humanactivitymonitor.start('PEDOMETER', onChangeBPM);
	tizen.sound.setVolumeChangeListener(onChangeVolume);
	sound_mode = 'MEDIA';
	volume_value = Math.round(tizen.sound.getVolume(sound_mode) * 15);
	volume_set_delay = 0;
	$(".volume-val").html(volume_value);
	document.addEventListener('tizenhwkey', TizenHWKey);
	document.addEventListener('rotarydetent', RotaryDetent);
	GetTrackList();
})();
// === END INIT FUNCTION ===

function ChangeVolume(direction){
	volume_set_delay = 6;
	$(".circle").css("z-index", "7");
	$("#volume").css("z-index", "8");
	if (direction === "CW") {
		if (volume_value < 15) {
			volume_value += 1;
			$(".volume-val").html(Number($(".volume-val")[0].innerHTML) + 1);
		}
    }
    else {
    	if (volume_value > 0) {
    		volume_value -= 1;
    		$(".volume-val").html(Number($(".volume-val")[0].innerHTML) - 1);
		}
    }
	tizen.sound.setVolume(sound_mode, volume_value / 15);
	var canvas=document.getElementById("volume")
	var x=canvas.getContext("2d");
	x.clearRect(0,0,canvas.width, canvas.height);
	x.fillStyle ="red";
	x.beginPath();
	x.lineWidth = 10;                                                                                              
	x.strokeStyle = "cyan";
	x.arc(180, 180, 175, -1 * 3.1416 / 2, 2 * 3.1416 / 15 * volume_value - 3.1416 / 2 , false);
	x.stroke();
}

function HideVolumeSet(){
	if (volume_set_delay > 0) {
		volume_set_delay -= 1;
	} else {
		$(".circle").css("z-index", "-1");
		$("#volume").css("z-index", "-1");
	}
	setTimeout("HideVolumeSet();", 100);
}

function ChangeBPM(direction){
	if (direction === "CW") {
		if (current_bpm < MAX_BPM) {
			SetBPM(current_bpm + 1);
		}
    }
    else {
    	if (current_bpm > MIN_BPM) {
    		SetBPM(current_bpm - 1);
		}
    }
}

function SetAutoMod(){
	$(".auto-mod").css("display","block");
}

function SetManualMod(){
	$(".auto-mod").css("display","none");
	if (current_bpm < MIN_BPM || current_bpm > MAX_BPM) {
		SetBPM(MID_BPM);
	}
}

function onChangeVolume(type, volume) {
	volume_value = Math.round(volume * 15);
	$(".volume-val").html(volume_value);
}

function onChangeBPM(info){
	prev_bpm1 = prev_bpm2;
	prev_bpm2 = current_bpm;
	if ($(".auto-mod").css("display") != "none") {
		SetBPM(Math.round(info.walkingFrequency * 60));
		if (Math.abs(Math.round(info.walkingFrequency * 60) - prev_bpm2) < DELTA2) {
			if (Math.abs(prev_bpm1 - prev_bpm2) > DELTA1){
				GetTrackList();
			}
		} else {
			GetTrackList();
		}
		if (Math.round(info.walkingFrequency * 60) === 0) {
			PauseTrack();
		} else {
			if (prev_bpm2 === 0) {
				PlayTrack();
			}
		}
	}
}

function TizenHWKey(event) {
	if (event.keyName === 'back') {
		try {
			tizen.application.getCurrentApplication().exit();
		} catch (ignore) {}
	}
}

function RotaryDetent(event) {
	var direction = event.detail.direction;
	if ($(".ui-page-active")[0].id === "main") {
		if ($(".loading").css("display") === "none") {
			ChangeVolume(direction);
		}
	}
	if ($(".ui-page-active")[0].id === "mode") {
		if ($(".auto-mod").css("display") === "none") {
			ChangeBPM(direction);
		}
	}
	if ($(".ui-page-active")[0].id === "songs") {

	}
}

function SetBPM(bpm) {
	current_bpm = bpm;
	$(".current-bpm").html(bpm);
}