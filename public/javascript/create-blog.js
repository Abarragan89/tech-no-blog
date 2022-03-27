async function addBlog (event) {
    event.preventDefault();
    const blog_title = document.querySelector('#blog_title').value.trim();
    const blog_text = document.querySelector('#blog_text').value.trim();
    const user_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({
            blog_title, 
            blog_text,
            user_id
        }),
        headers: {'Content-Type': 'application/json'}
    });
    if(response.ok) {
        window.location.replace('/dashboard');
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#make-blog').addEventListener('submit', addBlog)