async function editBlog(event) {
    event.preventDefault();
    const blog_title = document.querySelector('#blog_title_edit').value.trim();
    const blog_text = document.querySelector('#blog_text_edit').value.trim();
    const blog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/blogs/edit-post/${blog_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            blog_title,
            blog_text
        }),
        headers: { 'Content-Type': 'application/json' }   
    });
    if(response.ok) {
        window.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#edit-blog').addEventListener('submit', editBlog)