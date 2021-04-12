$(document).ready(function(){
    $("td button").click(function(){
        let id = $(this).attr('id');
        document.location.href = "jeu.php?id_game="+id.toString();
    });
});
