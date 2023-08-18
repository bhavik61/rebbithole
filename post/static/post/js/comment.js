var comment_id = "none";
//  COMMENT BUTTON
$(document).on('click', '.comment-comment', function(){
    comment_id = $(this).attr('comment-id')
    console.log('comment_id');
    console.log(comment_id);

    comment_to = $(this).attr("comment-author");
    comment_text = $(this).parent().parent().prev().text();

    $(".comment-form-modal-comment-to").text(comment_to);
    $(".comment-form-modal-comment-text").text(comment_text);

    $(".comment-reply-submit").attr("comment-id", comment_id);
    c = $(".comment-reply-submit").attr("comment-id");

    console.log("c");
    console.log(c);

    $("#reply-form #comment-text").focus();

    $('#write-comment-reply').css('visibility', 'visible')
    $('#write-comment-reply').css('opacity', 1)
    $('#write-comment-reply').css('pointer-events', 'auto')

    $('#write-comment-reply').css('animation-name', 'post-modal')
    $('#write-comment-reply').css('animation-duration', '1s')
    $('#write-comment-reply').css('animation-fill-mode', 'both')

});
//  MODAL CLOSE BUTTON
$(document).on('click', '.comment-modal-close', function(){
    $('#write-comment-reply').css('visibility', 'hidden')
    $('#write-comment-reply').css('opacity', 0)
    $('#write-comment-reply').css('pointer-events', 'none')
});

var $comment_spinner = "<div id='spinner' style='width:100%; text-align: center;'> Posting <br> <img src='https://s2.svgbox.net/loaders.svg?ic=slow-spinner&color=000000' width='32' height='32'></img></div>";

//COMMENT TO POST
$(document).on('submit', '#comment-form', function(event){
    event.preventDefault();
    console.log("comment-submit");
    
    $('#comment-text').css("height", "29px");

    $('.prepend-comment').prepend($comment_spinner);
    $('.no-comments-oops').hide();
    
    post_id = $('.post-view').attr('post-id');
    console.log('post_id'); 
    console.log(post_id);
    
    var commentFormData = new FormData(this);
    commentFormData.append("post_id", post_id)
    commentFormData.append("comment_id", comment_id)
    
    $.ajax({
        url : "/submit-comment/",
        type : "POST",
        data : commentFormData,
        processData: false,
        contentType: false,
        success : function(data){
            $('#comment-text').val('');

            var comment_id = data.comment_id;

            $new_comment = '<div style="display:none" class="comment-view" id="'+ comment_id +'" comment-id="'+ comment_id +'"><div class="comment-head">'+
            '<img src="'+ data.avatar_url +'" alt="avatar" class="comment-avatar"><span class="comment-head-text">'+
            'u/'+ data.username+ '<span class="time-stamp grey-font"> • now </span></span>'+
            
            '<div class="comment-head-options-dropdown"><span class="comment-head-options">&#8943;</span><div class="comment-head-options-dropdown-content">'+
            '<div class="comment-head-options-delete" comment-id="'+ comment_id +'">Delete</div></div></div></div>'+
            
            '<a class="comment-body-text"><div class="comment-body">'+ data.comment_text +'</div></a>'+
            
            '<div class="comment-activity">'+
            
            '<span class="comment-activity-item comment-activity-bookmark" comment-id="'+ comment_id +'" bookmark="comment"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bookmark p-bookmark" viewBox="0 0 16 16"><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/></svg></span>'+
    
            '<span class="comment-activity-item comment-activity-comment"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-chat-square comment-comment" comment-id="'+ comment_id +'" comment-author="'+ data.username +'" title="reply to comment" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/></svg></span>'+
            
            '<span class="comment-activity-item comment-activity-vote">'+
            '<svg comment-id="'+ comment_id +'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shift-fill comment-downvote" viewBox="0 0 16 16"><path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047z"/></svg>'+
            '<span class="comment-activity-vote-count" title="Vote Count">1</span>'+
            '<svg style="color:hsl(9, 100%, 64%);" comment-id="'+ comment_id +'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shift-fill comment-upvote" viewBox="0 0 16 16"><path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047z"/></svg></span></div><!-- append comment dom --><div></div></div>';

            $('.prepend-comment').prepend($new_comment);

            setTimeout(
                function(){
                    $('#spinner').remove();
                    $("#"+String(comment_id)).fadeIn();
                    $("#q-noti-c").html("🚀<span>Comment was sent</span>");
                    $("#q-noti-c").slideDown();
                },500);
            setTimeout(function(){$("#q-noti-c").slideUp();},2000);
        }
    })
});
// COMMENT TO COMMENT //REPLY
$(document).on('submit', '#reply-form', function(event){
    event.preventDefault();
    console.log("reply-submit");
    // $comment_spinner = "<div id='comment-spinner' style='width:100%; text-align: center;'> Posting <br> <img src='https://s2.svgbox.net/loaders.svg?ic=slow-spinner&color=000000' width='32' height='32'></img></div>";
    //$('.submit-comment-container').append($comment_spinner);
    $('.comment-modal-window').css('visibility', 'hidden')
    $('.comment-modal-window').css('opacity', 0)
    $('.comment-modal-window').css('pointer-events', 'none')

    post_id = $('.post-view').attr('post-id');
    console.log('post_id'); 
    console.log(post_id);

    comment_id = $(".comment-reply-submit").attr("comment-id");
    console.log("comment_id");
    console.log(comment_id);

    cid = $('#'+comment_id+"> div:nth-child(4)");
    console.log('cid');
    console.log(cid);

    cid.prepend($comment_spinner);

    var commentFormData = new FormData(this);
    commentFormData.append("post_id", post_id)
    commentFormData.append("comment_id", comment_id)
    $.ajax({
        url : "/submit-comment/",
        type : "POST",
        data : commentFormData,
        processData: false,
        contentType: false,
        success : function(data){

            $('.reply-text').val('');
            ///CLOSES COMMENT MODAL
            //$(".write-comment-reply-close").hide();   

            data_comment_id = data.comment_id;
            console.log('data_comment_id');
            console.log(data_comment_id);

            $new_comment = '<div style="display:none" class="comment-view" id="'+ data_comment_id +'" comment-id="'+ data_comment_id +'"><div class="comment-head">'+
            '<img src="'+ data.avatar_url +'" alt="avatar" class="comment-avatar"><span class="comment-head-text">'+
            'u/'+ data.username+ '<span class="time-stamp grey-font"> • now </span></span>'+
            
            '<div class="comment-head-options-dropdown"><span class="comment-head-options">&#8943;</span><div class="comment-head-options-dropdown-content">'+
            '<div class="comment-head-options-delete" comment-id="'+ data_comment_id +'">Delete</div></div></div></div>'+
            
            '<a class="comment-body-text"><div class="comment-body">'+ data.comment_text +'</div></a>'+
            
            '<div class="comment-activity">'+
            
            '<span class="comment-activity-item comment-activity-bookmark" comment-id="'+ comment_id +'" bookmark="comment"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bookmark p-bookmark" viewBox="0 0 16 16"><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/></svg></span>'+
    
            '<span class="comment-activity-item comment-activity-comment"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-chat-square comment-comment" comment-id="'+ data_comment_id +'" comment-author="'+ data.username +'" title="reply to comment" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/></svg></span>'+
            
            '<span class="comment-activity-item comment-activity-vote">'+
            '<svg comment-id="'+ data_comment_id +'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shift-fill comment-downvote" viewBox="0 0 16 16"><path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047z"/></svg>'+
            '<span class="comment-activity-vote-count" title="Vote Count">1</span>'+
            '<svg style="color:hsl(9, 100%, 64%);" comment-id="'+ data_comment_id +'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shift-fill comment-upvote" viewBox="0 0 16 16"><path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047z"/></svg></span></div><!-- append comment dom --><div></div></div>';
            
            setTimeout(
                function(){
                    $('#spinner').remove();
                    $("#"+String(data_comment_id)).fadeIn();
                    $("#q-noti-c").html("🚀<span>Reply was sent</span>");
                    $("#q-noti-c").slideDown();
                },
                500);
            setTimeout(function(){$("#q-noti-c").slideUp();},2000);
            $(cid).prepend($new_comment);
        }
    })
});
//VIEW REPLY IN POST
/*
$(document).on('click', '.comment-head-options-view-in-post', function(){
    //let post_id = $(this).attr('comment-id');
    let comment_id = $(this).attr('comment-id');
    //let this_comment = $(this).parent().parent().parent().parent();

    console.log("cccccccccccccc")
    
    $.ajax({
        url : "/repy-view-in-post/",
        type : "POST",
        data : {
            //'post_id' : post_id,
            'comment_id' : comment_id,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
        }
    })
});
*/
// DELETE COMMENT
$(document).on('click', '.comment-head-options-delete', function(){
    let comment_id = $(this).attr('comment-id');
    let this_comment = $(this).parent().parent().parent().parent();

    $.ajax({
        url : "/delete-comment/",
        type : "POST",
        data : {
            'comment_id' : comment_id,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            $(this_comment).remove();
            $("#q-noti-c").html("🔥<span>Comment was deleted</span>");
            $("#q-noti-c").css('border-left', '5px solid #ffad69');
            $("#q-noti-c").slideDown();

            setTimeout(function(){$("#q-noti-c").slideUp();},2000);
        }
    })

});
// UPVOTE
$(document).on('click', '.comment-upvote', function(){
    let comment_id = $(this).attr('comment-id');
    vote_type = "upvote";

    let this_upvote = $(this);
    let this_downvote = $(this).prev().prev();
    let this_vote_count = $(this).prev();

    $.ajax({
        url : "/vote-comment/",
        type : "POST",
        data : {
            'comment_id' : comment_id,
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
$(document).on('click', '.comment-downvote', function(){
    let comment_id = $(this).attr('comment-id');
    vote_type = "downvote";

    let this_downvote = $(this);
    let this_upvote = $(this).next().next();
    let this_vote_count = $(this).next();

    $.ajax({
        url : "/vote-comment/",
        type : "POST",
        data : {
            'comment_id' : comment_id,
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
$(document).on('click', '.comment-activity-bookmark', function(){
    let comment_id = $(this).attr('comment-id');
    let bookmark = $(this).attr('bookmark');
    let this_bookmark = $(this);

    $.ajax({
        url : "/bookmark/",
        type : "POST",
        data : {
            'comment_id' : comment_id,
            'bookmark' : bookmark,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            console.log(data);
            if(data.bookmark == "True"){
                $bicon="<svg style='color:black' xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' class='bi bi-bookmark-check-fill' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z'/></svg>";
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
$(document).on('click', '.comment-head-options-report', function(){
    let comment_id = $(this).attr('comment-id');
    let report = $(this).attr('report');
    let this_comment = $(this).parent().parent().parent().parent();

    $.ajax({
        url : "/report/",
        type : "POST",
        data : {
            'comment_id' : comment_id,
            'report' : report,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            console.log(data);
            if(data.report == "reported"){
                $report = "<div style='text-align:center;'>You reported this Comment</div>";
                $(this_comment).html($report);
            }
        }
    })
});