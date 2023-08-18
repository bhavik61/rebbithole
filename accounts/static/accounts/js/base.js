$('#id_password1').attr('placeholder', 'Password');
$('#id_password2').attr('placeholder', 'Re-enter Password');

$('.show-p1').click(function(){
    if($('#id_password1').attr("type") == "password"){
        $(this).text("Hide");
        $('#id_password1').attr("type", "text");
    }else{
        $(this).text("Show");
        $('#id_password1').attr("type", "password");
    }
});
$('.show-p2').click(function(){
    if($('#id_password2').attr("type") == "password"){
        $(this).text("Hide");
        $('#id_password2').attr("type", "text");
    }else{
        $(this).text("Show");
        $('#id_password2').attr("type", "password");
    }
});
$('.show-p3').click(function(){
    if($('.l-password').attr("type") == "password"){
        $(this).text("Hide");
        $('.l-password').attr("type", "text");
    }else{
        $(this).text("Show");
        $('.l-password').attr("type", "password");
    }
});
$('.f-show-p1').click(function(){
    if($('#f-password1').attr("type") == "password"){
        $(this).text("Hide");
        $('#f-password1').attr("type", "text");
    }else{
        $(this).text("Show");
        $('#f-password1').attr("type", "password");
    }
});
$('.f-show-p2').click(function(){
    if($('#f-password2').attr("type") == "password"){
        $(this).text("Hide");
        $('#f-password2').attr("type", "text");
    }else{
        $(this).text("Show");
        $('#f-password2').attr("type", "password");
    }
});
// LOGIN USERNAME VALIDATION
$(document).on('submit', '#lin-form', function(e){
    e.preventDefault();
    if(/\s/.test($(".username").val())){
        $(".lin-e-m").text("Invalid username");
    }
    else if($(".l-password").val().length < 8 ){
        $(".lin-e-m").text("Password is too short")    ;
    }
    else{
        $(".lin-e-m").text("");
        e.currentTarget.submit();
    }
});
/*
$('.s-btn').click(function(){
    $('.register').hide();
    $('.verify').show();

    $('.reg-link').hide();
    $('.log-link').hide();
    $('.container-s').hide();
});
$('.r-link').click(function(){
    $('.register').hide();
    $('.login').show();

    $('.reg-link').hide();
    $('.log-link').show();
});
$('.l-link').click(function(){
    $('.login').hide();
    $('.log-link').hide();

    $('.register').show();
    $('.reg-link').show();
});
*/
//$('#id_password2').attr('type', 'text');
$(document).on('click', '.un-f', function(){
    $('#username').val("");
});
/*
$(document).on('keyup', '#username', function(e){
    e.preventDefault();
    console.log("sss") 
});
*/
$(document).on('blur', '#username', function(e){
    e.preventDefault();
    console.log("blur");

    username = $("#username").val();
    console.log(username);
    if($("#username").val().length == 0){
        $('.un-t').hide()
        $('.un-f').show()
        $(".reg-p-e-m").text("");
        $('#reg-un-c').attr('username-checked', 'false');
    }
    if(/\s/.test($("#username").val())){
        $('.un-t').hide()
        $('.un-f').show()
        $(".reg-p-e-m").text("Username can't have whitespaces");
        $('#reg-un-c').attr('username-checked', 'false');
    }
    else{
        $.ajax({
            url : "/get-username/",
            type : "POST",
            data : {
                'username' : username,
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
            },
            success : function(data){
                console.log(data);
                if(data.exist == "True"){
                    $('.un-t').hide()
                    $('.un-f').show()
                    $(".reg-p-e-m").text("");
                    $('#reg-un-c').attr('username-checked', 'false')
                }
                else if(data.exist == "False"){
                    $('.un-f').hide()
                    $('.un-t').show()
                    $(".reg-p-e-m").text("");
                    $('#reg-un-c').attr('username-checked', 'true')
                }

            }
        })
    }
});
/*$(document).on('click', '.s-btn', function(e){
    e.preventDefault();
    console.log("sss");
});
*/
$(document).on('submit', '#reg-form', function(e){
    e.preventDefault();
    console.log("reg-form");
    console.log($("#id_password1").val().length);

    if($('#reg-un-c').attr('username-checked') == 'false'){
        $(".reg-p-e-m").text("Invalid username");
    }
    if(/\s/.test($("#username").val())){
        $(".lin-e-m").text("Invalid username");
    }
    else if($("#id_password1").val().length < 8 ){
        $(".reg-p-e-m").text("Password must contain at least 8 characters")    ;
    }
    else if($("#id_password1").val() != $("#id_password2").val()){
        $(".reg-p-e-m").text("Password does not match");
    }
    else if($("#id_password1").val().match($("#username").val()) ){
        $(".reg-p-e-m").text("Password can’t be too similar to your other information")
    }
    else if(/^\d+$/.test($("#id_password1").val())){
        $(".reg-p-e-m").text("Password can’t be entirely numeric");
    }

    else{
        $(".reg-p-e-m").text("");
        e.currentTarget.submit();
        /*window.location.pathname = '/verification/';*/
    }
});
// FORGOT PASSWORD---CHECK CRED
$("#f-veri-code").hide();
$("#ud-pass-con").hide();
$(".f-shield-c").hide();
var otp=""
$(document).on('click', '#f-check-cred', function(e){
    console.log("f p");
    username = $('#f-i-username').val();
    email = $('#f-i-email').val();

    if(username=="" || email==""){
        $(".f-check-rm").text("Enter valid information");
    }
    else{
        $lin = '<span style="color:black">Wait a moment.. sending confirmation code<img src="https://s2.svgbox.net/loaders.svg?ic=ball-triangle&color=000000" width="18" height="18"><span>';
        $(".f-check-rm").html($lin);
        $.ajax({
            url : "/f-check-cred/",
            type : "POST",
            beforeSend: function(request, settings) {
                if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                    request.setRequestHeader("X-CSRFToken", csrfcookie());
            }},
            data : {
                'username' : username,
                'email' : email,
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
            },
            success : function(data){
                console.log(data);
                if(data.user == "exist"){
                    otp = data.otp
                    $(".f-check-rm").html("");
                    $(".f-veri-c-email").text(data.email)

                    $("#f-check-cred-con").hide()                    
                    $("#ud-pass-con").hide();
                    $("#f-veri-code").show();
                }
                else{
                    $(".f-check-rm").text("Enter valid information");
                }
            }
        })
    }
});
$(document).on('click', '.v-btn', function(e){
    console.log('otp');
    console.log(otp);

    if($(".i-otp").val() == otp){
        console.log('okay');

        $(".f-check-rm").text("");

        $("#f-check-cred-con").hide()
        $("#f-veri-code").hide();
        
        $("#ud-pass-con").show();
    }
    else{
        console.log('not okay');
        $(".f-check-rm").text("That code isn't valid");
    }
});
// FORGOT PASSWORD---UPDATE PASSWORD
$(document).on('click', '#f-sub-pass', function(e){
    console.log("f p");
    pw1 = $('#f-password1').val();
    pw2 = $('#f-password2').val();

    if(pw1.length < 8 ){
        $(".f-check-rm").text("Password must contain at least 8 characters");
    }
    else if(pw1 != pw2){
        $(".f-check-rm").text("Password does not match");
    }
    else if(/^\d+$/.test(pw1)){
        $(".f-check-rm").text("Password can’t be entirely numeric");
    }
    else{
        console.log('username');    
        console.log(username);
        $.ajax({
            url : "/f-update-pw/",
            type : "POST",
            beforeSend: function(request, settings) {
                if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                    request.setRequestHeader("X-CSRFToken", csrfcookie());
            }},
            data : {
                'pw' : pw1,
                'username' : username,
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
            },
            success : function(data){
                console.log(data);
                if(data.updated == "True"){
                    $(".f-check-rm").text("");
                    $('.f-shield-l').hide()
                    $('.f-shield-c').show()

                    $lin = '<span style="color:black">Updated password has been saved<br>redirecting to Login page <img src="https://s2.svgbox.net/loaders.svg?ic=ball-triangle&color=000000" width="18" height="18"><span>';
                    $('.f-check-rm').html($lin);
                    setTimeout(function(){window.location.pathname = '/login/'},3000);

                }
                else{
                    $(".f-check-rm").text("Something went wrong, try again!");
                }
            }
        })
    }
});
let csrfcookie = function() {  // for django csrf protection
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