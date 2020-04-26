$(document).ready(function() {
    var keyApi = "5ea52d621851f96a8ea167a0";

    //get recipe collection from restdb api
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://cookey-8f6f.restdb.io/rest/recipe",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": keyApi,
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function(response) {

        //memisahkan data dari array 
        $.each(response, function(key, value) {
            //menampilkan resep di tanggal 27
            if (value['date'] == '27/04/2020') {
                var component = '<div class="col-md-4">' + '<div class="card mb-4 shadow-sm">' +
                    '<img src="' + value['recipe_poster_url'] + '" alt="" class="bd-placeholder-img card-img-top">' +
                    '<div class="card-body">' +
                    '<p class="card-text">' + value['recipe_title'] + '</p>' +
                    '<div class="d-flex justify-content-between align-items-center">' +
                    '<div class="btn-group">' +
                    '<button type="button" class="btn btn-sm btn-outline-secondary btn-view" data-recipeID="' + value['_id'] + '">View</button>' +
                    '</div>' +
                    '<small class="text-muted">' + value['recipe_time'] + '</small>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $('.table-recipe').append(component);
            }
        })

        //showing recipe details berdasarkan id resep yang dipilih
        $('.btn-view').on('click', function() {
            //pake this biar ga ke button view yg lain tp ke button view yg diplih
            var recipeID = $(this).attr('data-recipeID');
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://cookey-8f6f.restdb.io/rest/recipe/" + recipeID, //tambah recipeID biar langsung ngarah ke ID yg diminta
                "method": "GET",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": keyApi,
                    "cache-control": "no-cache"
                }
            }
            $.ajax(settings).done(function(response) {
                console.log(response);
                var component = '<div class="col-md-12">' +
                    '<img src="' + response['recipe_poster_url'] + '" alt="" />' +
                    '</div>' +
                    '<div class="col-md-12">' +
                    '<div class="col-md-6 ingr">' + response['recipe_ingredients'] +
                    '</div>' +
                    '<div class="col-md-6 steps">' + response['recipe_steps'] +
                    '</div>' +
                    '</div>';
                $('.detail-recipe .row').append(component);
                $('.dashboard-cooking').css('display', 'none');
                $('.detail-recipe').css('display', 'block');

            });
        });
    });






    //validate customer when login
    $('.btn-signin').on('click', function() {
        var userName = $('#inputUsername').val();
        var password = $('#inputPassword').val();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://cookey-8f6f.restdb.io/rest/customer",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": keyApi,
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function(response) {
            $.each(response, function(key, value) {
                if (userName == value['username'] && password == value['password']) {
                    $('.form-signin').css('display', 'none');
                    $('.dashboard-cooking').css('display', 'block');


                } else {
                    $('.login-error-alert').css('display', 'block');
                }

            });

        });
        return false;
    });

});