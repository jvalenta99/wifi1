$(document).ready(function() {

    $('#updateForm').on('submit', updateDatensatz);

    function updateDatensatz( e ) {
        e.preventDefault();

        var frage = $('#frage').val();
        var antworten = [];

        for(var j = 1; j < 5; j++){
            antworten.push($('#antwort' + j).val());
        }

        $.ajax({
            url: 'http://localhost:8080/quizfragen/' + $('#frage').attr('data-kennung') + '?frage=' + frage + '&antworten=' + antworten,
            method: 'put',
            success: function( data ) {
                $('#output').text(data);

                function relocate() {
                    location.href='/';
                }

                setTimeout(relocate, 3000);
            }
        });
    }
});