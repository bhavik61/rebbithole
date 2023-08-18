// CSRF TOKEN FOR AJAX REQUEST
let csrfcookie = function() {
    let cookieValue = null,
        name = "csrftoken";
    if (document.cookie && document.cookie !== "") {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};
// GO TO TOP
function ToTop() {
    pos = $(".second").scrollTop();
    console.log(pos);
    if(pos > 50){
        $("#go-to-top").css("display", "block");
    }
    else{
        $("#go-to-top").css("display", "none");
    }
}
// TOP BUTTON
$(document).on('click', '#go-to-top', function(){
    console.log('pos');
    /*var el = document.getElementsByClassName("second");
    $(el).animate({scrollTop:0}, '300');*/
    $(".second").animate({scrollTop:0}, '300');

});
// QUICK NOTIFICATION
$(document).on('click', '.q-noti', function(){
    console.log('main_url');
    $("#q-noti-c").slideDown();
    setTimeout(function(){$("#q-noti-c").slideUp();},5000);
});
/*
const elnr = 0;
$(document).ready(function(){
    var main_url = window.location.href
    //console.log('main_url');
    //console.log(main_url);
    if(main_url.slice(22,33) == 'write-post/' && elnr == 0){

        var href = $('.create-post-b').attr('href');
        window.location.href = href;

        var writePostURL = "write-post";//the new URL
        window.history.replaceState({}, document.title, "/" + writePostURL );
    }
});
*/
/*
$(document).ready(function(){
        
    window.addEventListener('popstate', (event) => {
        console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
        currentURL = document.location;

        if(currentURL ==  "http://127.0.0.1:8000/write-post"){
            console.log("ddddddd");

            var writePostURL = "";//the new URL
            window.history.replaceState({}, document.title, "/" + writePostURL );

            var href = $('.create-post-b').attr('href');
            window.location.href = href;
            
            var writePostURL = "write-post";//the new URL
            window.history.replaceState({}, document.title, "/" + writePostURL );
        }

    });
});
*/