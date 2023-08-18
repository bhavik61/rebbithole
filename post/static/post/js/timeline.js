



/*
$(document).on('click', '.post-body-title' , function() {
    console.log("post view");

    post_id = $(this).parents('.post-view').attr('post-id');
    $post_html = $(this).parents('.post-view').html();

    console.log(post_id);
    //console.log($post_html);   

    $.ajax({
        url : "load-comments/",
        method : 'POST',
        data : {
            post_id : post_id,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(data){
            for(i=0; i<data.comments.length; i++){
                $comment = "<div class='comment-view'><div class='comment-head grey-font'>" +
                
                "<img src='' alt='avatar' class='comment-avatar'>" +
                "<span class='comment-head-text'>u/"+ data.comments[i].author +
                "<span class='time-stamp'>"+ data.comments[i].created +"</span></span></div>" +
                
                "<div class='comment-body'>" +
                data.comments[i].text +
                
                "</div><div class='comment-activity'>"+
                "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-three-dots comment-options grey-font' viewBox='0 0 16 16'><path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z'/></svg>" +
                "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' class='bi bi-chat-square-dots-fill comment-comment' viewBox='0 0 16 16'><path d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'/></svg>"+
                "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-shift-fill comment-upvote' viewBox='0 0 16 16'><path d='M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047z'/></svg>" +
                "1"+
                "<svg style='transform: rotate(180deg)' xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-shift-fill comment-downvote' viewBox='0 0 16 16'><path d='M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047z'/></svg></div></div>";

                $('#post-preview').append($comment);

            }

        }
    });

    //var postViewURL = 'post/'+post_id;//the new URL
    //window.history.replaceState({}, document.title, "/" + postViewURL );

    $('article').hide();
    $('#post-preview .post-view').prepend($post_html);
    $('#post-preview').show();


});

$(document).on('click', '.post-body-text', function() {
    console.log("post view");

    post_id = $(this).parents('.post-view').attr('id');
    $post_html = $(this).parents('.post-view').html();
    

    console.log(post_id);
    //console.log($post_html);

    $('article').hide();
    $('#post-preview .post-view').prepend($post_html);
    $('#post-preview').show();

});

*/
/*
$(document).on('click', '.post-view', function() {
    console.log("post view");
    post_id = $(this).attr('id');
    console.log(post_id);
});
*/