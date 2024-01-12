export async function home(user) {
  if (user) {
    return `
      <html>
        <body>
          <h1>Welcome, ${user.username}!</h1>
          <p><a href="/posts">View Posts</a></p>
          <p><a href="/logout">Logout</a></p>
        </body>
      </html>
    `;
  } else {
    return `
      <html>
        <body>
          <h1>Welcome!</h1>
          <p><a href="/signup">Signup</a></p>
          <p><a href="/login">Login</a></p>
        </body>
      </html>
    `;
  }
}

export async function signupForm({ error } = {}) {
  return `
    <html>
      <body>
        <h1>Signup</h1>
        ${error ? `<p style="color: red;">${error}</p>` : ''}
        <form action="/signup" method="post">
          <p>Username: <input type="text" name="username" required></p>
          <p>Password: <input type="password" name="password" required></p>
          <p><input type="submit" value="Signup"></p>
          <style>
          input[type=text],input[type=password],
          textarea {
          border: 1px solid #F7CAC9;
          border-top-color: #B3CEE5;
          border-left-color: #B3CEE5;
          border-radius: 1px;
          padding: 6px;
          font-size: .8em;
      }
  
      input[type=text],input[type=password] {
        width: 250px;
      }
          </style>
        </form>
        <p><a href="/">Home</a></p>
      </body>
    </html>
  `;
}

export async function loginForm({ error } = {}) {
  return `
    <html>
      <body>
        <h1>Login</h1>
        ${error ? `<p style="color: red;">${error}</p>` : ''}
        <form action="/login" method="post">
          <p>Username: <input type="text" name="username" required></p>
          <p>Password: <input type="password" name="password" required></p>
          <p><input type="submit" value="Login"></p>
          <style>
          input[type=text],input[type=password],
          textarea {
          border: 1px solid #1488CC;
          border-top-color: #2B32B2;
          border-left-color: #2B32B2;
          border-radius: 1px;
          padding: 6px;
          font-size: .8em;
      }
      input[type=text],input[type=password] {
        width: 250px;
      }
          </style>
        </form>
        <p><a href="/">Home</a></p>
      </body>
    </html>
  `;
}

export async function listPosts(posts) {
  const postList = posts.map(post => `<li><a href="/posts/${post.id}">${post.title}</a></li>`).join('');
  return `
    <html>
      <body>
        <h1>Posts</h1>
        <ul>${postList}</ul>
        <p><a href="/posts/new">New Post</a></p>
        <p><a href="/">Home</a></p>
      </body>
    </html>
  `;
}

export async function newPost() {
  return `
    <html>
      <body>
        <h1>New Post</h1>
        <form action="/posts" method="post">
          <p>Title: <input type="text" name="title" required></p>
          <p>Content: <textarea name="content" required></textarea></p>
          <p><input type="submit" value="Create Post"></p>

          <style>
          input[type=text],input[type=password],
          textarea {
          border: 1px solid #C6FFDD;
          border-top-color: #FBD786;
          border-left-color: #f7797d;
          border-right-color: #C6FFDD;
          border-radius: 1px;
          padding: 6px;
          font-size: .8em;
      }
      input[type=text],input[type=password] {
        width: 250px;
      }
        </style>
        </form>
        <p><a href="/posts">Cancel</a></p>
        <p><a href="/">Home</a></p>
      </body>
    </html>
  `;
}

export async function showPost(post) {
  return `
    <html>
      <body>
        <h1>${post.title}</h1>
        <p>Author: ${post.author}</p>
        <p>${post.content}</p>
        <p><a href="/posts">Back to Posts</a></p>
        <p><a href="/">Home</a></p>
      </body>
    </html>
  `;
}

export async function deleteConfirmation(post) {
  return `
    <html>
      <body>
        <h1>Delete Confirmation</h1>
        <p>Are you sure you want to delete this post?</p>
        <p>Title: ${post.title}</p>
        <form action="/posts/delete/${post.id}" method="post">
          <p><input type="submit" value="Delete"></p>
        </form>
        <p><a href="/posts">Cancel</a></p>
        <p><a href="/">Home</a></p>
      </body>
    </html>
  `;
}

export async function success() {
  return `
    <html>
      <body>
        <h1>Success!</h1>
        <p>Operation completed successfully.</p>
        <p><a href="/">Home</a></p>
      </body>
    </html>
  `;
}

export async function fail({ error } = {}) {
  return `
    <html>
      <body>
        <h1>Operation Failed</h1>
        ${error ? `<p style="color: red;">${error}</p>` : ''}
        <p><a href="/">Home</a></p>
      </body>
    </html>
  `;
}
