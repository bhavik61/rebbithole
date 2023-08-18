$(document).on('click', '.follow-button', function() {
    console.log("follow");
    let user_id = parseInt($(this).attr("user-id"));
    console.log(user_id);

    let this_button = $(this);
    $.ajax({
        url : "/follow/",
        method : "POST",
        data : {
            user_id : user_id,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            console.log(data);
            $(this_button).text('Following');
            $(this_button).css('background-color', '#6c8fb3');
            $(this_button).css('color', 'white');
            $(this_button).addClass('following-button');
            $(this_button).removeClass('follow-button');
        }
    });
});



$(document).on('click', '.following-button', function() {
    console.log("unfollow....");
    let user_id = parseInt($(this).attr("user-id"));
    console.log(typeof user_id);
    console.log(user_id);

    let this_button = $(this);
    $.ajax({
        url : "/unfollow/",
        method : "POST",
        data : {
            user_id : user_id,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            console.log(data)
            $(this_button).text('Follow');
            $(this_button).css('background-color', '#d5d9db');
            $(this_button).css('color', 'black');
            $(this_button).addClass('follow-button');
            $(this_button).removeClass('following-button');
        }
    });

});