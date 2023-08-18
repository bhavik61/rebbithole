// CREATE REBBITHOLE | OPEN MODAL
$(document).on('click', '.rebbithole-nav-create-rh', function(){
    $('.create-rh-modal-window').css('visibility', 'visible')
    $('.create-rh-modal-window').css('opacity', 1)
    $('.create-rh-modal-window').css('pointer-events', 'auto')

    $('.create-rh-modal-window').css('animation-name', 'post-modal')
    $('.create-rh-modal-window').css('animation-duration', '1s')
    $('.create-rh-modal-window').css('animation-fill-mode', 'both')

    $('#rh_avatar').css("visibility", "hidden");
    $('#rh_avatar').css('opacity', 1)
    $('#rh_avatar').css('pointer-events', 'auto')
});
// CLOSE BUTTON
$(document).on('click', '.create-rh-modal-close', function(){
    $('.create-rh-modal-window').css('visibility', 'hidden')
    $('.create-rh-modal-window').css('opacity', 0)
    $('.create-rh-modal-window').css('pointer-events', 'none')
});
// ASSIGNS UPLOADED IMAGE TO SRC OF IMG
$(document).on('change', '#rh_avatar', function(){
    $(".error-mes").text("");
    var input = this;
    var reader = new FileReader();
    reader.onload = function (e) {
        $('.rh_avatar_img').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
});
// CREATE REBBITHOLE
$(document).on('submit', '#create-rh-form', function(event){
    event.preventDefault();
    var RHForm = new FormData(this);
    if(!$("#rh_avatar").val()){
        $(".error-mes").text("Upload avatar");
    }
    else if(/\s/.test($("#rh_name").val())){
        $(".error-mes").text("rebbithole can't have whitespaces");
    }
    else{
        rh = $("#rh_name").val();
        RHForm.append("rh",rh);
        $.ajax({
            url : "/create-rh/",
            type : 'POST',
            beforeSend: function(request, settings) {
                if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                    request.setRequestHeader("X-CSRFToken", csrfcookie());
            }},
            data : RHForm,
            processData: false,
            contentType: false,
            success : function(data){
                if(data.rh == "exists"){
                    $(".error-mes").text("That rebbithole already exists");
                }
                else{
                    $(".error-mes").text("");
                    
                    $rh_d = '<div class="rebbithole-nav-rh-item-con rebbithole-nav-rh-item-con-nav">'+
                    '<a href="/rebbithole/'+ $('#rh_name').val() +'/" class="rebbithole-nav-rh-item">'+
                    '<img src='+ data.avatar +' class="rebbithole-nav-rh-avatar"><div class="rebbithole-nav-rh-name">'+
                    'r/'+$('#rh_name').val()+'<div class="font-14 grey-font">1 member</div></div></a>'+
                    '<button rebbithole-id='+data.id+' type="button" class="join-rebbithole-button joined-rebbithole-button">Joined</button></div>';


                    $(".rebbithole-dom-con").prepend($rh_d);

                    $('#rh_name').val('');
                    $('#rh_topic').val('');
                    $('#rh_des').val('');                    
                    $('.rh_avatar_img').attr("src", "/static/post/images/rh.png");

                    $("#q-noti-c").html("🚀<span>rebbithole created</span>");
                    $("#q-noti-c").slideDown();
                    setTimeout(function(){$("#q-noti-c").slideUp();},4000);

                    $('.create-rh-modal-window').css('visibility', 'hidden');
                    $('.create-rh-modal-window').css('opacity', 0);
                    $('.create-rh-modal-window').css('pointer-events', 'none');
                }
                console.log(data.rh);
            }
        });
    }
});
// JOIN REBBITHOLE 
$(document).on('click', '.join-rebbithole-button', function(){
    let rebbithole_id = $(this).attr('rebbithole-id');
    let this_join = $(this);
    $.ajax({
        url : "/join-rebbithole/",
        type : "POST",
        data : {
            'rebbithole_id' : rebbithole_id,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            if(data.joined == "True"){
                $(this_join).css("background-color", "#7d73b6");
                $(this_join).css("color", "white");
                $(this_join).text("Joined");
                $(".rh-chat").fadeIn();
            }
            else{
                $(this_join).css("background-color", "#cdc8e9");
                $(this_join).css("color", "black");
                $(this_join).text("Join");
                $(".rh-chat").fadeOut();
            }
        }
    })    
});
// REPORT REBBITHOLE 
$(document).on('click', '#options-report-rebbithole', function(){
    let rebbithole_id = $(this).attr('rebbithole-id');
    let report = $(this).attr('report');
    console.log(rebbithole_id);
    console.log(typeof rebbithole_id);
    $.ajax({
        url : "/report/",
        type : "POST",
        data : {
            'rebbithole_id' : rebbithole_id,
            'report' : report,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            console.log(data);
            if(data.report == "reported"){
                $report = "<div style='text-align:center;padding:10px;margin:30px 80px;border: 1px solid grey'>You Reported this rebbithole</div>";
                $("article").html($report);
                $(".profile-nav-tab-post").hide();
                $(".profile-nav-tab-comment").hide();
                $(".profile").text("r/rebbithole");
                $(".user-profile-options-dropdown").hide()
            }
        }
    })    
});