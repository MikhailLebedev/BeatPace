(function() {
    var page = document.querySelector('#bottomButtonWithMorePage'),
        drawer = page.querySelector('#moreoptionsDrawer'),
        handler = page.querySelector('.ui-more');

    page.addEventListener('pagebeforeshow', function() {
        if (tau.support.shape.circle) {
            tau.helper.DrawerMoreStyle.create(drawer, {
                handler: '.drawer-handler',
            });
        }
    });
})();



(function () {
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
$(".ui-content").css("color", "red");
$("#abc").css("color", "green");
$("#abc")[0].innerHTML  = screen.width + " " + screen.height;
