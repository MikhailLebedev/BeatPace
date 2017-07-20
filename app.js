var volume_value = 0;
function volume(direction){
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
	var canvas=document.getElementById("volume")
	var x=canvas.getContext("2d");
	x.clearRect(0,0,canvas.width, canvas.height);
	x.fillStyle ="red";
	x.beginPath();
	x.lineWidth = 10;                                                                                              
	x.strokeStyle = "cyan";
	x.arc(180, 180, 175, -1 * 3.1416 / 2, 2 * 3.1416 / 15 * volume_value - 3.1416 / 2 , false);
	x.stroke();
	//setTimeout("hide();", 2000);
}

function hide(){
	
	$(".circle").css("z-index", "-1");
	$("#volume").css("z-index", "-1");
}


var mode = 1;
function changeBPM(direction){
	if (direction === "CW") {
		$(".current-bpm").html(Number($(".current-bpm")[0].innerHTML) + 1);
    }
    else {
    	$(".current-bpm").html(Number($(".current-bpm")[0].innerHTML) - 1);
    }
}

(function () {
	 document.addEventListener('tizenhwkey', function(e) {
         if (e.keyName === 'back') {
             try {
                 tizen.application.getCurrentApplication().exit();
             } catch (ignore) {}
         }
     });
	 document.addEventListener('rotarydetent', function(ev) {
         var direction = ev.detail.direction;
         changeBPM(direction);
         volume(direction);
     });
     
	window.addEventListener("tizenhwkey", function (ev) {
		var activePopup = null,
			page = null,
			pageid = "";

		if (ev.keyName === "back") {
			activePopup = document.querySelector(".ui-popup-active");
			page = document.getElementsByClassName("ui-page-active")[0];
			pageid = page ? page.id : "";

			if (pageid === "main" && !activePopup) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	});
}());
