$(document).ready(function() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://cookey-8f6f.restdb.io/rest/recipe",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "5ea52d621851f96a8ea167a0",
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function(response) {
        console.log(response);
        $.each(response, function(key, value) {
            if (value['date'] == '27/04/2020') {
                var component = '<div class="col-md-4">' + '<div class="card mb-4 shadow-sm">' +
                    '<img src="' + value['recipe_poster_url'] + '" alt="" class="bd-placeholder-img card-img-top">' +
                    '<div class="card-body">' +
                    '<p class="card-text">' + value['recipe_title'] + '</p>' +
                    '<div class="d-flex justify-content-between align-items-center">' +
                    '<div class="btn-group">' +
                    '<button type="button" class="btn btn-sm btn-outline-secondary">View</button>' +
                    '</div>' +
                    '<small class="text-muted">' + value['recipe_time'] + '</small>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $('.table-recipe').append(component);
            }
        })
    });



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
                "x-apikey": "5ea52d621851f96a8ea167a0",
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