$(document).ready(function() {
    $('#signupButton').click(function(event) {
        event.preventDefault();
        const name = $('#nameInput').val().trim();
        const email = $('#emailInput').val().trim();
        const password = $('#passwordInput').val().trim();

        if (name === '' || email === '' || password === '') {
            alert('Please fill in all fields.');
            return;
        }
        const newUser = {
            "name": name,
            "email": email,
            "password": password
        };

        $.ajax({
            url: 'http://localhost:3000/users',
            method: 'POST',
            data: newUser,
            success: function(response) {
                console.log('Signup successful!', response);
                window.location.href = 'main_page.html';
            },
            error: function(xhr, status, error) {
                console.error('Error signing up:', status, error);
                alert('Error signing up. Please try again.');
            }
        });
    });
});

$(document).ready(function() {
    $('#loginButton').click(function(event) {
        event.preventDefault();
        const email = $('#loginEmail').val().trim();
        const password = $('#loginPassword').val().trim();
        if (email === '' || password === '') {
            alert('Please enter both email and password.');
            return;
        }

        $.ajax({
            url: 'informations.json',
            dataType: 'json',
            success: function(response) {
                const data = response.users;

                if (Array.isArray(data)) {
                    const foundUser = data.find(user => user.email === email && user.password === password);

                    if (foundUser) {
                        console.log('Login successful!');
                        window.location.href = 'main_page.html';
                    } else {
                        console.error('Invalid credentials');
                        alert('Invalid email or password.');
                    }
                } else {
                    console.error('Invalid data format');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error loading users data:', status, error);
            }
        });
    });
});




