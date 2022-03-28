async function addComment (event) {
    event.preventDefault();
    const comment_text = document.querySelector('#comment_text').value.trim();
    const user_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const blog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 2
    ];
    const response = await fetch(`/api/comments/${blog_id}/${user_id}`, {
        method: 'POST',
        body: JSON.stringify({
            comment_text,
            blog_id,
            user_id
        })
    });
    if (response.ok) {
        window.location.reload();
    } else {
        alert(response.statusText)
    }
}
document.querySelector('#post_comment').addEventListener('submit', addComment)