$(function() {
    $('#input-word').focus();

    $('#input-word').keypress(function(e) {
        if(e.which == 13) {
            $('#submit-btn').click();
        }
    })

    $('#submit-btn').on('click', function() {
        let word = $('#input-word').val().toUpperCase()

        $.ajax({
              url : 'anagram.php'
            , type : 'POST'
            , headers : {"content-type": 'application/json'}
            , dataType : 'json'
            , data: {word: word}
        }).done(function(data){
            $('#input-word').val('');
            let html = '';

            if (data.error) {
                html += "<div class='alert alert-danger' role='alert'>Não são aceitos caracteres especiais, acentuações ou números. Tente novamente.</div>"
            } else if (data.data) {
                html += "<p><u><b>" + word + "</b></u></p>";

                if (data.data.length == 0) {
                    html += "<div class='alert alert-warning' role='alert'>Não foi encontrado nenhum anagrama dessa palavra. Tente novamente.</div>"
                } else {

                    if (data.data.length == 1) {
                        html += "<div class='alert alert-success' role='alert'>Foi encontrado 1 anagrama.</div>";
                    } else {
                        html += "<div class='alert alert-success' role='alert'>Foram encontrados " + (data.data).length + " anagramas.</div>";
                    }

                    html += "<ul class='list-group'>";
                    (data.data).forEach(function(word) {
                        html += "<li class='list-group-item'>" + word + "</li>";
                    })
                    html += '</ul>';
                }
            }

            $('#result').html(html);

        }).fail(function(jqXHR, textStatus, msg){
            console.log(jqXHR, textStatus, msg)
        })
    })
})
