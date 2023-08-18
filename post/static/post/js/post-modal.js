// TEXTAREA AUTO HEIGHT
document.querySelectorAll('textarea').forEach(el => {
    el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
    el.classList.add('auto');
    el.addEventListener('input', e => {
      el.style.height = 'auto';
      el.style.height = (el.scrollHeight) + 'px';
    });
  }); 
/*
DISABLE POST SUBMIT BUTTON

function manage(title) {
    var bt = $('#post-submit');

    if (title.value != '') {
        console.log('y');
        bt.disabled = false;
        bt.css({'cursor': 'pointer'});  
    }
    else {
        console.log('x');
        bt.disabled = true;
        bt.css({'cursor': 'not-allowed'});
    }
}  
*/
$('.rebbithole-input').on('focus', function(){
    $('.add-rh-i').hide();
    $('.rebbithole-input').css('padding-left', '10px');
});

$('.rebbithole-input').on('blur', function(){
    $('.add-rh-i').show();
    $('.rebbithole-input').css('padding-left', '25px');
});
/*
$('#rebbithole-input').keyup(function() {
    $.ajax({
        type: "POST",
        url: "/get-rebbithole/",
        data: {
            'search_text' : $('#search').val(),
            'csrfmiddlewaretoken' : $("input[name=csrfmiddlewaretoken]").val()
        },
        success: searchSuccess,
        dataType: 'html'
    });
});
*/
$(document).on('click', '.post-rebbithole-item-remove', function(){
    console.log($(this).parent().html());
    $(this).parent().remove();
});
$('#rebbithole-input').autocomplete({
    source : "/get-rebbithole/",
    select: function (e, ui) {
        rebbithole_text = ui.item.value;
        flag=1;
        $('.post-rebbithole-item').each(function(index, value){
            this_text = $(this).text().slice(0, -1);
            if(rebbithole_text == this_text){
                flag=0;
                ui.item.value = $('#rebbithole-input').val();
                //error message already added
            }
        });
        if(flag==1 && $('.post-rebbithole-item').length < 3){
            $rebbithole_span = "<span class='post-rebbithole-item'>"+ rebbithole_text +"<span class='post-rebbithole-item-remove'>&#10799;</span></span>";
            $(".post-rebbithole-items").append($rebbithole_span);       
            ui.item.value = "" // CLEAR INPUTB0X
        }
        else{
            flag=0;
            //error message max 3
        }
    }
});
// CREATE-POST BUTTON | OPEN MODAL
$(".create-post-b").click(function(){
    
    $('.modal-window').css('visibility', 'visible')
    $('.modal-window').css('opacity', 1)
    $('.modal-window').css('pointer-events', 'auto')

    $('.modal-window').css('animation-name', 'post-modal')
    $('.modal-window').css('animation-duration', '1s')
    $('.modal-window').css('animation-fill-mode', 'both')
    
    //e.preventDefault();
    //$(document).attr('title', 'Harry clicked | CodeBaker.in');

    //var href = $('.create-post-b').attr('href');
    //window.location.href = href;

    //var writePostURL = "";//the new URL
    //window.history.replaceState({}, document.title, "/" + writePostURL );
});
// CLOSE BUTTON
$(".modal-close").click(function(){
    $('.modal-window').css('visibility', 'hidden')
    $('.modal-window').css('opacity', 0)
    $('.modal-window').css('pointer-events', 'none')
    
    //e.preventDefault();
    //var href = $('.modal-close').attr('href');
    //window.location.href = href;
    //var emptyURL = "";//the new URL
    //window.history.replaceState({}, document.title, "/" + emptyURL );
});
/* Appending Images To List tag */
$(function(){
    var previewImage = function(input) {
        for(i=0; i<input.files.length; i++){
            var reader = new FileReader();
            reader.onload = function(e) {
                img_count = $('.image-preview-area ul li').length;
                if(img_count < 4){
                    $('.image-preview-area ul').append('<li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg trash-ico" viewBox="0 0 16 16"><path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/></svg><img src="'+e.target.result+'" id="img'+ img_count +'"></li>')
                    var elmnt = document.getElementById("img"+img_count);
                    $(function(){
                        elmnt.scrollIntoView();
                    });
                }
                else{
                    // ERROR MESSAGE of max 4 images has been selected
                }
            };
            reader.readAsDataURL(input.files[i]);
        }
    };
    $('#upload-image').on('change', function() {
        previewImage(this);
        setTimeout(function(){showpreview()}, 300);
    })
});


function showpreview(){
    $(".image-preview-area ul li .trash-ico").click(function(){   
        $(this).parent().remove(); 
        $("#upload-image").val(''); 
        showpreview();
    });
}
function allowDrop(event) {
    $(".image-dropezone-wrapper").css("height","+100px");
}
function dragLeave(event) {
    $(".image-dropezone-wrapper").css("height","50px");
}
function drop(event) {
    $(".image-dropezone-wrapper").css("height","50px");
}