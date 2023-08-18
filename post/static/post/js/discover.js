$('#d-search-input').on('focus', function(){
    $(this).css("background-color", "#F5F5F5")
});
$('#d-search-input').on('blur', function(){
    $(this).css("background-color", "#fcfcfc")
    if($('#d-search-input').val() == '') {
    }
});
// CLEAR INPUT
$(document).on('click', '.d-search-block-ci', function(){
    $('.d-search-input').val('');
    $('.d-search-block-ci').hide();
});
// LIVE SEARCH RESULTS
$('#d-search-input').on('keyup', function(){
    search = $('#d-search-input').val();
    if(search == ''){
        $('.d-search-block-ci').hide();
    }
    else{
        $('.d-search-block-ci').show();
        if(search.slice(0,2) == "r/" || search.slice(0,2) != "u/" ){
            $("#d-search-input").autocomplete({
                source : "/get-rebbithole/",
                minLength: 4,
                select: function (e, ui) {
                    rebbithole = ui.item.value;
                    window.location = "/rebbithole/"+rebbithole.slice(2)+"/";
                }
            });
        }
        if(search.slice(0,2) != "r/" || search.slice(0,2) != "u/" ){
            $("#d-search-input").autocomplete({
                source : "/get-rebbithole/",
                minLength: 2,
                select: function (e, ui) {
                    rebbithole = ui.item.value;
                    window.location = "/rebbithole/"+rebbithole.slice(2)+"/";
                }
            });
        }
        if(search.slice(0,2) == "u/" ){
            console.log("key -> u");
            $("#d-search-input").autocomplete({
                source : "/get-user/",
                minLength: 4,
                select: function (e, ui) {
                    user = ui.item.value;
                    window.location = "/profile/"+user.slice(2)+"/";
                }
            });
        }
    }
});
$(document).on('click', '.d-search-block-si', function(){
    search = $('#d-search-input').val();
    if(search != ""){
        console.log(search);
        window.location = "/discover-results/"+search+"/";
    }
    else{
        //error         
    }
});
$(document).on('submit', '#dis-res', function(e){
    e.preventDefault();
    search = $('#d-search-input').val();
    if(search != ""){
        console.log(search);
        window.location = "/discover-results/"+search+"/";
    }
});
// DISCOVER SEARCH NAV
$(document).on('click', '.dis-nav-tab-post', function() {
    console.log('p');
    $('#dis-nav-rh').hide();
    $('#dis-nav-profile').hide();
    $('#dis-nav-post').fadeIn();

    $(this).addClass('dis-nav-actice');
    $('.dis-nav-tab-rh').removeClass('dis-nav-actice');
    $('.dis-nav-tab-profile').removeClass('dis-nav-actice');
});
$(document).on('click', '.dis-nav-tab-rh', function() {
    console.log('r');
    $('#dis-nav-post').hide();
    $('#dis-nav-profile').hide();
    $('#dis-nav-rh').fadeIn();
    
    $(this).addClass('dis-nav-actice');
    $('.dis-nav-tab-post').removeClass('dis-nav-actice');
    $('.dis-nav-tab-profile').removeClass('dis-nav-actice');
});
$(document).on('click', '.dis-nav-tab-profile', function() {
    console.log('p');
    $('#dis-nav-post').hide();
    $('#dis-nav-rh').hide();
    $('#dis-nav-profile').fadeIn();
    
    $(this).addClass('dis-nav-actice');
    $('.dis-nav-tab-post').removeClass('dis-nav-actice');
    $('.dis-nav-tab-rh').removeClass('dis-nav-actice');
});