/*window.history.replaceState(obj, obj.page, obj.url);

<script>
    $(document).ready(function(){

console.log("shit");

$(".r-link").click(function(e) {
    console.log("shit.");

    e.preventDefault(); //so the browser doesn't follow the link

    $(".body-l").load("{% url 'login' %}");
    
    console.log("shit..");
    var obj = {tit:"tit", titt:"titt"}
    window.history.replaceState(obj, obj.tit, "/new_url");


});
});
</script>
*/
