window.onload = function () {
    let menuClick = true
    $(".header_right_app img").click(function () {
        if(menuClick) {
            $(".nav_app").animate({
                top:"50px"
            });
            menuClick = false
        } else {
            $(".nav_app").animate({
                top:"-150px"
            })
            menuClick = true
        }
    })
}