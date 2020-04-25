$(document).ready(function() {
    $('.btn-signin').on('click', function() {
        var userName = $('#inputUsername').val();
        console.log(userName);
        var password = $('#inputPassword').val();
        $.ajax({
            url: "https://245be805-ad0e-4710-8e59-1d1f51ee10ab.mock.pstmn.io/user",
            dataType: "json",
            success: function(data) {
                console.log(data['password']);
                if (userName == data['username'] && password == data['password']) {
                    $('.form-signin').css('display', 'none');
                    $('.dashboard-cooking').css('display', 'block');

                } else {
                    alert('Username or Password is wrong');
                }

            }
        });
        return false;
    });

})