async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username_login').value.trim();
    const password = document.querySelector('#password_login').value.trim();
    if(username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST', 
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // check the response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#login_form').addEventListener('submit', signupFormHandler);