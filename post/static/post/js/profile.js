// UPDATE PROFLE BUTTON | OPEN MODAL
$(document).on('click', '.profile-edit-butt', function(){
    $('.profile-update-modal-window').css('visibility', 'visible')
    $('.profile-update-modal-window').css('opacity', 1)
    $('.profile-update-modal-window').css('pointer-events', 'auto')

    $('.profile-update-modal-window').css('animation-name', 'post-modal')
    $('.profile-update-modal-window').css('animation-duration', '1s')
    $('.profile-update-modal-window').css('animation-fill-mode', 'both')

    p_name = $('.r-u-name').text();
    p_url = $('.profile-url-text').text().trim();
    p_bio = $('.profile-bio').text();

    $('#profile_name').val(p_name);

    if (p_url != "None"){
        $('#profile_url').val(p_url);
    }
    if (p_bio != "None"){
        $('#profile_bio').val(p_bio);
    } 
});
//  CLOSE BUTTON
$(document).on('click', '.profile-update-modal-close', function(){
    $('.profile-update-modal-window').css('visibility', 'hidden')
    $('.profile-update-modal-window').css('opacity', 0)
    $('.profile-update-modal-window').css('pointer-events', 'none')

    $('.profile_avatar_img').attr("src", $(".profile-avatar").attr("src")); //reset select image
});
// ASSIGNS UPLOADED IMAGE TO SRC OF IMG
$(document).on('change', '#profile_avatar', function(){
    var input = this;
    var reader = new FileReader();
    reader.onload = function (e) {
        $('.profile_avatar_img').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
});
// UPDATE PROFILE SUBMIT
$(document).on('submit', '#profile-update-form', function(event){
    event.preventDefault();
    var updateProfileForm = new FormData(this);
    $.ajax({
        url : "/update-profile/",
        type : 'POST',
        beforeSend: function(request, settings) {
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                request.setRequestHeader("X-CSRFToken", csrfcookie());
        }},
        data : updateProfileForm,
        cache: false,
        processData: false,
        contentType: false,
        success : function(data){
            $('.r-u-name').text(data.profile_name);
            $('.profile-url-text').text(data.profile_url);
            $('.profile-bio').text(data.profile_bio);
            $('.profile-avatar').attr("src",data.profile_image);

            $("#q-noti-c").html("🚀<span>Profile updated</span>");
            $("#q-noti-c").slideDown();

            setTimeout(function(){$("#q-noti-c").slideUp();},3000);

            $('.profile-update-modal-window').css('visibility', 'hidden')
            $('.profile-update-modal-window').css('opacity', 0)
            $('.profile-update-modal-window').css('pointer-events', 'none')
        }
    });
});
// FOLLOWING OPEN MODAL
$(document).on('click', '.profile-following-butt', function(){
    $('.profile-follow-list-modal-window').css('visibility', 'visible')
    $('.profile-follow-list-modal-window').css('opacity', 1)
    $('.profile-follow-list-modal-window').css('pointer-events', 'auto')

    $('.profile-follow-list-modal-window').css('animation-name', 'post-modal')
    $('.profile-follow-list-modal-window').css('animation-duration', '1s')
    $('.profile-follow-list-modal-window').css('animation-fill-mode', 'both')

    $('#profile-follow-list-nav-followers').hide();
    $('#profile-follow-list-nav-following').fadeIn();

    $('.profile-follow-list-nav-tab-following').addClass('profile-follow-list-nav-actice');
    $('.profile-follow-list-nav-tab-followers').removeClass('profile-follow-list-nav-actice');
});
// FOLLOWERS OPEN MODAL
$(document).on('click', '.profile-followers-butt', function(){
    $('.profile-follow-list-modal-window').css('visibility', 'visible')
    $('.profile-follow-list-modal-window').css('opacity', 1)
    $('.profile-follow-list-modal-window').css('pointer-events', 'auto')

    $('.profile-follow-list-modal-window').css('animation-name', 'post-modal')
    $('.profile-follow-list-modal-window').css('animation-duration', '1s')
    $('.profile-follow-list-modal-window').css('animation-fill-mode', 'both')

    $('#profile-follow-list-nav-following').hide();
    $('#profile-follow-list-nav-followers').fadeIn();

    $('.profile-follow-list-nav-tab-followers').addClass('profile-follow-list-nav-actice');
    $('.profile-follow-list-nav-tab-following').removeClass('profile-follow-list-nav-actice');

});
//  CLOSE BUTTON
$(document).on('click', '.profile-follow-list-modal-close', function(){
    $('.profile-follow-list-modal-window').css('visibility', 'hidden')
    $('.profile-follow-list-modal-window').css('opacity', 0)
    $('.profile-follow-list-modal-window').css('pointer-events', 'none')
});

// FOLLOWING NAV IN MODAL
$(document).on('click', '.profile-follow-list-nav-tab-following', function() {
    console.log('wers-nav');
    $('#profile-follow-list-nav-followers').hide();
    $('#profile-follow-list-nav-following').fadeIn();

    $(this).addClass('profile-follow-list-nav-actice');
    $('.profile-follow-list-nav-tab-followers').removeClass('profile-follow-list-nav-actice');
});
// FOLLOWERS NAV IN MODAL
$(document).on('click', '.profile-follow-list-nav-tab-followers', function() {
    console.log('wing-nav');
    $('#profile-follow-list-nav-following').hide();
    $('#profile-follow-list-nav-followers').fadeIn();
    
    $(this).addClass('profile-follow-list-nav-actice');
    $('.profile-follow-list-nav-tab-following').removeClass('profile-follow-list-nav-actice');
});
// POST COMMENT NAV
$(document).on('click', '.profile-nav-tab-post', function() {
    console.log('post-nav');
    $('#profile-nav-comment').hide();
    $('#profile-nav-post').fadeIn();

    $(this).addClass('profile-nav-actice');
    $('.profile-nav-tab-comment').removeClass('profile-nav-actice');
});
$(document).on('click', '.profile-nav-tab-comment', function() {
    console.log('c-nav');
    $('#profile-nav-post').hide();
    $('#profile-nav-comment').fadeIn();
    
    $(this).addClass('profile-nav-actice');
    $('.profile-nav-tab-post').removeClass('profile-nav-actice');
});
//------------------------------------USER PROFILE---------------------------------------------
// REPORT ACCOUNT 
$(document).on('click', '.user-profile-options-report-user', function(){
    let user_id = $(this).attr('user-id');
    let report = $(this).attr('report');

    $.ajax({
        url : "/report/",
        type : "POST",
        data : {
            'user_id' : user_id,
            'report' : report,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            console.log(data);
            if(data.report == "reported"){
                $report = "<div style='text-align:center;padding:10px;margin:30px 80px;border: 1px solid grey'>You Reported this Account</div>";
                $("article").html($report);
                $(".profile-nav-tab-post").hide();
                $(".profile-nav-tab-comment").hide();
                $(".profile").text("u/user");
                $(".user-profile-options-dropdown").hide();
            }
        }
    })    
});
// BLOCK USER
$(document).on('click', '.user-profile-options-block-user', function(){
    let user_id = $(this).attr('user-id');

    $.ajax({
        url : "/block/",
        type : "POST",
        data : {
            'user_id' : user_id,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            console.log(data);
            if(data.blocked == "yes"){
                $report = "<div style='text-align:center;padding:10px;margin:30px 80px;border: 1px solid grey'>You Blocked this Account</div>";
                $("article").html($report);
                $(".profile-nav-tab-post").hide();
                $(".profile-nav-tab-comment").hide();
                $(".profile").text("u/user");
                $(".user-profile-options-dropdown").hide()
            }
        }
    })    
});
//------------------------------------Account Options---------------------------------------------
// Account Options Modal
// CREATE-POST BUTTON | OPEN MODAL
$(document).on('click', '.profile-card', function(){
    $('.account-options-modal-window').css('visibility', 'visible')
    $('.account-options-modal-window').css('opacity', 1)
    $('.account-options-modal-window').css('pointer-events', 'auto')

    $('.account-options-modal-window').css('animation-name', 'post-modal')
    $('.account-options-modal-window').css('animation-duration', '1s')
    $('.account-options-modal-window').css('animation-fill-mode', 'both')
});
// CLOSE BUTTON
$(document).on('click', '.account-options-modal-close', function(){
    $('.account-options-modal-window').css('visibility', 'hidden')
    $('.account-options-modal-window').css('opacity', 0)
    $('.account-options-modal-window').css('pointer-events', 'none')

    $(".acc-op-ch-pw-con").slideUp();
    $(".acc-op-del-acc-con").slideUp();
    $(".acc-op-lo-p").slideUp();
    
    $(".acc-op-ch-pw-d").text("");
});
// CHANGE PASSWORD CLICK
$(document).on('click', '.acc-op-ch-pw', function(){
    $(".acc-op-ch-pw-con").slideDown();
    $(".acc-op-del-acc-con").slideUp();
    $(".acc-op-lo-p").slideUp();

    $('#f-password-c').val("");
    $('#f-password1').val("");
    $('#f-password2').val("");

    $(".f-show-p-c").show();
    $(".f-show-p1").show();
    $(".f-show-p2").show();
    //$(".acc-op-lo").hide();
});
// CHANGE PASSWORD CANCEL BUTTON
$(document).on('click', '.acc-op-ch-pw-con-cancel', function(){
    $(".f-show-p-c").hide();
    $(".f-show-p1").hide();
    $(".f-show-p2").hide();

    $(".acc-op-ch-pw-con").slideUp();

    $(".acc-op-ch-pw-e").text("");
    $(".acc-op-ch-pw-d").text("");

    //$(".acc-op-del-acc").show();
    //$(".acc-op-lo").show();
});
// SHOW PASSWORD
$(document).on('click', '.f-show-p1', function(){
    if($('#f-password1').attr("type") == "password"){
        $(this).text("Hide");
        $('#f-password1').attr("type", "text");
    }else{
        $(this).text("Show");
        $('#f-password1').attr("type", "password");
    }
});
$(document).on('click', '.f-show-p2', function(){
    if($('#f-password2').attr("type") == "password"){
        $(this).text("Hide");
        $('#f-password2').attr("type", "text");
    }else{
        $(this).text("Show");
        $('#f-password2').attr("type", "password");
    }
});
$(document).on('click', '.f-show-p-c', function(){
    if($('#f-password-c').attr("type") == "password"){
        $(this).text("Hide");
        $('#f-password-c').attr("type", "text");
    }else{
        $(this).text("Show");
        $('#f-password-c').attr("type", "password");
    }
});
// CHANGE PASSWORD
$(document).on('click', '#f-sub-pass', function(e){
    pwc = $('#f-password-c').val();
    pw1 = $('#f-password1').val();
    pw2 = $('#f-password2').val();

    if(pwc.length < 8){
        $(".acc-op-ch-pw-e").text("wrong password");
    }
    else if(pw1.length < 8){
        $(".acc-op-ch-pw-e").text("password too short");
    }
    else if(pw1 != pw2){
        $(".acc-op-ch-pw-e").text("password doesn't match");
    }
    else if(/^\d+$/.test(pw1)){
        $(".acc-op-ch-pw-e").text("password can’t be entirely numeric");
    }
    else{
        $.ajax({
            url : "/change-pw/",
            type : "POST",
            beforeSend: function(request, settings) {
                if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                    request.setRequestHeader("X-CSRFToken", csrfcookie());
            }},
            data : {
                'pwc' : pwc,
                'pw' : pw1,
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
            },
            success : function(data){
                console.log(data);
                if(data.pw == "changed"){
                    $(".acc-op-ch-pw-e").text("");
                    $(".acc-op-ch-pw-con").slideUp();
                    $(".acc-op-ch-pw-d").text("Pasword changed");
                    $('#f-password-c').val("");
                    $('#f-password1').val("");
                    $('#f-password2').val("");
                }
                else if(data.pw == "wrong"){
                    $(".acc-op-ch-pw-e").text("wrong password");
                }
                else{
                    $(".acc-op-ch-pw-e").text("something went wrong, try again!");
                }
            }
        })
    }
});
// DELETE ACCOUNT
$(document).on('click', '.acc-op-del-acc', function(){
    $(".f-show-p-c").hide();
    $(".f-show-p1").hide();
    $(".f-show-p2").hide();

    $(".acc-op-del-acc-con").slideDown();
    $(".acc-op-ch-pw-con").slideUp();
    $(".acc-op-lo-p").slideUp();
    //$(".acc-op-ch-pw").slideUp();
    //$(".acc-op-lo").hide();
});
// DELETE ACCOUNT ACTION
var count10s;
$(document).on('click', '.acc-op-del-acc-del', function(){
    $('.acc-op-del-acc-con-10').text("10 seconds");
    $(".acc-op-del-acc-con-a").slideDown();
    $(".account-options-modal-activity").slideUp();
    $(".account-options-modal-close").slideUp();
    var timeleft = 9;
    count10s = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(count10s);
            $('.acc-op-del-acc-con-10').text("0 seconds");

            setTimeout(function(){window.location.pathname = '/account-has-been-deleted/'},1000);
        }
        else{
            $('.acc-op-del-acc-con-10').text(timeleft + " seconds");
        }
        timeleft -= 1;
    }, 1200);
});
// DELETE ACCOUNT WAIT CANCEL
$(document).on('click', '.acc-op-del-acc-cancel-a', function(){
    $(".account-options-modal-activity").slideDown();
    $(".account-options-modal-close").slideDown();
    $(".acc-op-del-acc-con-a").slideUp();
    clearInterval(count10s);
});
// DELETE ACCOUNT CANCEL
$(document).on('click', '.acc-op-del-acc-cancel', function(){
    $(".acc-op-del-acc-con").slideUp();
   // $(".acc-op-ch-pw").slideDown();
   //$(".acc-op-lo-p").slideDown();
});
// LOGOUT
$(document).on('click', '.acc-op-lo', function(){
    $(".f-show-p-c").hide();
    $(".f-show-p1").hide();
    $(".f-show-p2").hide();

    $(".acc-op-lo-p").slideDown();
    $(".acc-op-del-acc-con").slideUp();
    $(".acc-op-ch-pw-con").slideUp();
});
// LOGOUT
$(document).on('click', '.acc-op-logout-cancel', function(){
    $(".acc-op-lo-p").slideUp();
});