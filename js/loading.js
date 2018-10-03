var loading_alpha = 1.0;
var flag = 1;
function loading(){
	if (loading_alpha > 0) {
		loading_alpha -= 0.01;
		if (flag === 1) {
			$(".loading").children().css("color", "rgba(255,255,255," + String(loading_alpha) + ")");
			setTimeout("loading();", 0);
		} else {
			if (loading_alpha < 0) {
				$(".loading").css("display", "none");
			} else {
				$(".loading").css("background-color", "rgba(00,00,00," + String(loading_alpha) + ")");
				setTimeout("loading();", 0);
			}	
		}
	} else {
		if (flag == 1){
			flag = 0;
			loading_alpha = 1.0;
			loading();
		}
	}
}
setTimeout("loading();", 0);