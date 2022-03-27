async function signUp (event) {
    event.preventDefault();
    const username = document.querySelector('#username_signup').value.trim();
    const password = document.querySelector('#password_signup').value.trim();

    const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: { 'Content-Type': 'application/json'}
    });
    if (response.ok) {
        document.location.replace('/')
    } else {
        alert(response.statusText)
    }
}
document.querySelector('#sign-up').addEventListener('submit', signUp)