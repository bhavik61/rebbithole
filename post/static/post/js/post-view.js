// IMAGE MODAL
$(document).on('click', '.post-body-image', function() {
    $('#post-image-preview').css('display', 'block')
    $("#post-image-preview-image").attr('src', $(this).attr('src'));
});
$(document).on('click', '#post-image-preview-cls', function(){
    $('#post-image-preview').css('display', 'none');
});

// UPVOTE
$(document).on('click', '.p-upvote', function(){
    let post_id = $(this).attr('post-id');
    vote_type = "upvote";

    let this_upvote = $(this);
    let this_downvote = $(this).prev().prev();
    let this_vote_count = $(this).prev();

    $.ajax({
        url : "/vote/",
        type : "POST",
        data : {
            'post_id' : post_id,
            'vote_type' : vote_type,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            if(data.upvote == "True"){
                $(this_upvote).css("color", "hsl(9, 100%, 64%)");

                vote_count = parseInt(this_vote_count.text()) + 1;
                $(this_vote_count).text(vote_count);
            }
            else if(data.upvote == "False"){
                $(this_upvote).css("color", "grey");

                vote_count = parseInt(this_vote_count.text()) - 1;
                $(this_vote_count).text(vote_count);
            }
            else if(data.upvote == "TrueF"){
                $(this_upvote).css("color", "hsl(9, 100%, 64%)");
                $(this_downvote).css("color", "grey");
                
                vote_count = parseInt(this_vote_count.text()) + 2;
                $(this_vote_count).text(vote_count);
            }  
        }
    })
});

// DOWNVOTE
$(document).on('click', '.p-downvote', function(){
    let post_id = $(this).attr('post-id');
    vote_type = "downvote";

    let this_downvote = $(this);
    let this_upvote = $(this).next().next();
    let this_vote_count = $(this).next();

    $.ajax({
        url : "/vote/",
        type : "POST",
        data : {
            'post_id' : post_id,
            'vote_type' : vote_type,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            if(data.downvote == "True"){
                $(this_downvote).css("color", "hsl(293, 70%, 46%)");
                vote_count = parseInt(this_vote_count.text()) - 1;
                $(this_vote_count).text(vote_count);
            }
            else if(data.downvote == "False"){
                vote_count = parseInt(this_vote_count.text()) + 1;
                $(this_vote_count).text(vote_count);
                $(this_downvote).css("color", "grey");
            }
            else if(data.downvote == "TrueF"){
                vote_count = parseInt(this_vote_count.text()) - 2;
                $(this_vote_count).text(vote_count);
                $(this_downvote).css("color", "hsl(293, 70%, 46%)");
                $(this_upvote).css("color", "grey");
            }  
        }
    })
});

// BOOKMARK
$(document).on('click', '.post-activity-bookmark', function(){
    let post_id = $(this).attr('post-id');
    let bookmark = $(this).attr('bookmark');
    let this_bookmark = $(this);

    console.log('bookmark');
    console.log(bookmark);


    $.ajax({
        url : "/bookmark/",
        type : "POST",
        data : {
            'post_id' : post_id,
            'bookmark' : bookmark,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            console.log(data);
            if(data.bookmark == "True"){
                $bicon="<svg style='color:black' xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' class='bi bi-bookmark-check-fill' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z'/></svg>";
                //$bicon = "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' class='bi bi-bookmark-fill' viewBox='0 0 16 16'><path d='M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z'/></svg>";
                $(this_bookmark).html($bicon);
            }
            else if(data.bookmark == "False"){
                $bicon = "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' class='bi bi-bookmark p-bookmark' viewBox='0 0 16 16'><path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z'/></svg>";
                $(this_bookmark).html($bicon);
            }   
        }
    })    
});

// REPORT
$(document).on('click', '.post-head-options-report', function(){
    let post_id = $(this).attr('post-id');
    let report = $(this).attr('report');
    let this_post = $(this).parent().parent().parent().parent();

    $.ajax({
        url : "/report/",
        type : "POST",
        data : {
            'post_id' : post_id,
            'report' : report,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            console.log(data);
            if(data.report == "reported"){
                $report = "<div style='text-align:center;'>You reported this Post</div>";
                $(this_post).html($report);
            }
        }
    })    
});

// NOT INTERESTED
$(document).on('click', '.post-head-options-not-interested', function(){
    let post_id = $(this).attr('post-id');
    let this_post = $(this).parent().parent().parent().parent();

    $.ajax({
        url : "/not-interested/",
        type : "POST",
        data : {
            'post_id' : post_id,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            if(data.interested == "not"){
                $report = "<div style='text-align:center;'>You won't see this post again</div>";
                $(this_post).html($report);
            }
        }
    })    
});

// DELETE POST
$(document).on('click', '.post-head-options-delete', function(){
    let post_id = $(this).attr('post-id');
    let this_post = $(this).parent().parent().parent().parent();

    $.ajax({
        url : "/delete-post/",
        type : "POST",
        data : {
            'post_id' : post_id,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            $(this_post).remove();
            $("#q-noti-c").html("🔥<span>Post was deleted</span>");
            $("#q-noti-c").css('border-left', '5px solid #ffad69');
            $("#q-noti-c").slideDown();

            setTimeout(function(){$("#q-noti-c").slideUp();},2000);
        }
    })    
});