// Sends post data to views.py
$(document).on('submit', '#post-form', function(event){
    event.preventDefault();
    console.log("post-submit");

    var $post_spinner = "<div id='post-spinner' style='width:100%; text-align: center;'> Posting <br> <img src='https://s2.svgbox.net/loaders.svg?ic=slow-spinner&color=000000' width='32' height='32'></img></div>";
    $('.prepend-post').prepend($post_spinner);

    // CLOSES POST MODAL
    $('.modal-window').css('visibility', 'hidden')
    $('.modal-window').css('opacity', 0)
    $('.modal-window').css('pointer-events', 'none')

    //var href = $('.modal-close').attr('href'); // assigns 'close-modal' 's URL which is '#'
    //window.location.href = href; // fires 'close-modal' URL and closes 'write-post' modal
    //var emptyURL = "";
    //window.history.replaceState({}, document.title, "/" + emptyURL ); //removes '/#' from URL

    rebbitholes = [];
    images = []
    $('.post-rebbithole-item').each(function(){
        rh = $(this).text().slice(0, -1);
        rebbitholes.push(rh);

        console.log('rh');
        console.log(typeof rh);
        console.log(rh);
    });
    rh1 = rebbitholes[0];
    rh2 = rebbitholes[1];
    rh3 = rebbitholes[2];

    images = []
    $('.image-preview-area ul li img').each(function(){
        var image = new Image();
        image.src = this.src;
        images.push(image.src);
    });
    img1 = images[0];
    img2 = images[1];
    img3 = images[2];
    img4 = images[3];
    
    var postFormData = new FormData(this);

    postFormData.append("rh1", rh1);
    postFormData.append("rh2", rh2);
    postFormData.append("rh3", rh3);

    postFormData.append("img1", img1);
    postFormData.append("img2", img2);
    postFormData.append("img3", img3);
    postFormData.append("img4", img4);
    
    $.ajax({
        url : "/create-post/",
        type : 'POST',
        beforeSend: function(request, settings) {
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                request.setRequestHeader("X-CSRFToken", csrfcookie());
        }},
        data : postFormData,
        processData: false,
        contentType: false,
        success : function(data){
    
            $('#title').val('');
            $('#text').val('');
            $('#upload-image').val('');
            $('.image-preview-area ul').html('');
            $('.post-rebbithole-items').html('');

            function getRhs(rhs, rh_id, rh_avatar){
                if(rhs.length > 0){
                    $rebbitholes = "";
                    for(i=0; i<rhs.length; i++){
                        $rebbitholes = $rebbitholes + '<a href="/rebbithole/'+rhs[i].slice(2)+'" class="post-head-rh" id="'+rh_id+'"> <img src="'+ rh_avatar[i] +'" alt="avatar"> <span> '+ rhs[i] +'</span></a>';                        
                        rh_id = rh_id + 1;
                    }
                    return $rebbitholes;
                }
                else{
                    return "";
                }
            }
            function getPostText(post_text, post_id){
                if(post_text != ""){
                    return '<div class="post-body-text mt-5">'+ post_text +'</div>';
                }
                else{
                    return "";
                }
            }
            function getPostImages(post_images, post_image_id){
                if(data.post_images.length>0){
                    var $post_image_li = "";
                    for(i=0; i<post_images.length; i++){
                         $post_image_li = $post_image_li + '<img class="post-body-image" id="'+ post_image_id +'" src="'+ post_images[i] +'" alt="image <-/->" loading="lazy"></img>';
                         post_image_id = post_image_id + 1;
                    }
                    return "<ul class='post-body-img'>" + $post_image_li + "</ul>";
                }
                else{
                    return "";
                }
            }
            var post_id = data.post_id;

            var $new_post = '<div style="display:none" class="post-view" id="'+ post_id +'" post-id="'+ post_id +'">'+
            '<div class="post-head"><a><img src="'+ data.avatar_url +'" alt="avatar" class="post-head-avatar"></a>'+
            '<div class="post-head-text"><div><a class="post-head-username">u/'+ data.username + '</a><span class="time-stamp">• now</span></div>'+
            
            getRhs(data.rhs, data.rh_id, data.rh_avatar) + '</div>'+
            
            '<div class="post-head-options-dropdown"><span class="post-head-options">&#8943;</span><div class="post-head-options-dropdown-content">'+
            '<a href="/post/'+ post_id +'" class="post-head-options-see-post href color-black" post-id="'+ post_id +'">Comments</a>'+
            '<div class="post-head-options-delete" post-id="'+ post_id +'">Delete</div></div></div></div>'+
            '<div class="post-body"><a href="/post/'+ post_id +'" class="post-body-title"><div>'+
            
            data.post_title +'</div>'+ getPostText(data.post_text, post_id) + '</a>' +
            
            getPostImages(data.post_images, data.post_image_id) +

            '<div id="post-image-preview" class="post-image-preview-modal"><span><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x-lg post-image-preview-close" id="post-image-preview-cls" viewBox="0 0 16 16"><path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/></svg></span><img class="post-image-preview-modal-content" id="post-image-preview-image"></div></div>'+
            '<div class="post-activity">'+
            '<span class="post-activity-item post-activity-bookmark" post-id="'+ post_id +'" bookmark="post" title="Bookmark Post"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bookmark p-bookmark" viewBox="0 0 16 16"><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/></svg></span>'+
        
            '<a href="/post/'+ post_id +'" class="post-comment-href"><span class="post-activity-item post-activity-comment">'+
            '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-chat-square-dots p-comment" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>0 Comments</span></a>'+
        
            '<span class="post-activity-item post-activity-vote">'+
            '<svg post-id="'+ post_id +'" title="Downvote Post" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shift-fill p-downvote" viewBox="0 0 16 16"><path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047z"/></svg>'+
            '<span class="post-activity-vote-count" title="Vote Count"> 1 </span>'+
            '<svg post-id="'+ post_id +'" style="color:hsl(9, 100%, 64%);" title="Upvote Post" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shift-fill p-upvote" viewBox="0 0 16 16"><path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047z"/></svg></span></div></div>';

            $('.prepend-post').prepend($new_post);

            postx = $('.post-view').attr('post-id','#'+post_id);
            setTimeout(
                function(){
                    $('#post-spinner').remove();
                    postx.fadeIn();
                    $("#q-noti-c").html("🚀<span>Post was sent</span>");
                    $("#q-noti-c").slideDown();
                },
                600
            );
            setTimeout(function(){$("#q-noti-c").slideUp();},4000);
        }
    });
});