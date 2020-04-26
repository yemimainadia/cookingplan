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
                    '<h1 class="recipe-title">' + response['recipe_title'] + '</h1>' +
                    '<img src="' + response['recipe_poster_url'] + '" alt="" />' +
                    '</div>' +
                    '<div class="col-md-12">' +
                    '<div class="row">' +
                    '<div class="col-md-6 ingr"><h3>Ingredients</h3>' + response['recipe_ingredients'] +
                    '</div>' +
                    '<div class="col-md-6 steps"><h3>Steps</h3>' + response['recipe_steps'] +
                    '</div>' +
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


    $('a.signup').on('click', function() {
        $('.form-signin').css('display', 'none');
        $('.form-signup').css('display', 'block');


        // waktu user klik signup, akan dicek dulu username yg diinput sama gak sm yg di database
        $('.btn-signup').on('click', function() {
            var userName = $('#inputUsernameSignup').val();
            var password = $('#inputPasswordSignup').val();

            //pake json supaya bisa ambil data yg formatnya string/teks 
            var jsonUsername = JSON.stringify({ "username": userName });
            var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://cookey-8f6f.restdb.io/rest/customer?q=" + jsonUsername,
                    "method": "GET", //method GET krn mau cek dulu username nya udh ada apa blm
                    "headers": {
                        "content-type": "application/json",
                        "x-apikey": keyApi,
                        "cache-control": "no-cache"
                    }
                }
                //minta respon dr server apakah username yg diinput udh ada apa blm
            $.ajax(settings).done(function(response) {
                //klo udh ada tampilin pesan error
                if (response.length > 0) {
                    $('.signup-error-alert').css('display', 'block');
                } else { //kalo belum ada, data langsung terinput ke database
                    var jsondata = { "username": userName, "password": password };
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://cookey-8f6f.restdb.io/rest/customer",
                        "method": "POST",
                        "headers": {
                            "content-type": "application/json",
                            "x-apikey": keyApi,
                            "cache-control": "no-cache"
                        },
                        "processData": false,
                        "data": JSON.stringify(jsondata)
                    }

                    $.ajax(settings).done(function(response) {
                        //pas selesai, balik ke halaman sign in
                        $('.form-signin').css('display', 'block');
                        $('.form-signup').css('display', 'none');
                        // terus kasih alert kalo udah registered
                        alert('Your are registered! You can sign in now');
                    });
                }
            });
            return false;
        });
    });
});