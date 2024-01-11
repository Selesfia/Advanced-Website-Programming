export function layout(title, content) {
    return `
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              padding: 80px;
              font: 16px Helvetica, Arial;
            }
  
            h1 {
              font-size: 2em;
            }
  
            h2 {
              font-size: 1.2em;
            }
  
            #posts {
              margin: 0;
              padding: 0;
            }
  
            #posts li {
              margin: 40px 0;
              padding: 0;
              padding-bottom: 20px;
              border-bottom: 1px solid #eee;
              list-style: none;
            }
  
            #posts li:last-child {
              border-bottom: none;
            }
  
            textarea {
              width: 500px;
            }
  
            input[type=text],
            textarea {
              border: 1px solid #eee;
              border-top-color: #ddd;
              border-left-color: #ddd;
              border-radius: 2px;
              padding: 15px;
              font-size: .8em;
            }
  
            input[type=text] {
              width: 500px;
            }
          </style>
        </head>
        <body>
          <section id="content">
            ${content}
          </section>
        </body>
      </html>
    `;
  }
  
  export function list(posts) {
    const postList = posts.map(post => `
      <li>
        <h2>${post.title}</h2>
        <p><a href="/post/${post.id}">Check phone number</a></p>
      </li>
    `).join("\n");
  
    return layout("Posts", `
      <h1>Contact Person</h1>
      <p>You have <strong>${posts.length}</strong> person contact</p>
      <p><a href="/post/new">Add Contact</a></p>
      <p><a href="/search/search">Find a contact</a></p>
      <ul id="posts">
        ${postList}
      </ul>
    `);
  }
  
  export function newPost() {
    return layout(
      "New Post",
      `
        <h1>New Contact</h1>
        <p>Add New Contact</p>
        <form action="/post" method="post">
          <p><input type="text" placeholder="Name" name="title"></p>
          <p><textarea placeholder="Telephone Number" name="body"></textarea></p>
          <p><input type="submit" value="Submit"></p>
        </form>
      `,
    );
  }
  
  export function search() {
    return layout(
      "Search Contacts",
      `
        <h1>Find a contact</h1>
        <form action="/search" method="post">
          <p><input type="text" placeholder="Name to find" name="name"></p>
          <p><input type="submit" value="Search"></p>
        </form>
      `,
    );
  }
  
  export function found(name, number) {
    return layout(
      "Contact Found",
      `
        <h1>Name：${name}</h1>
        <p>Phone Number：${number}</p>
        <form action="/search" method="post">
          <p><input type="text" placeholder="Name to find" name="name"></p>
          <p><input type="submit" value="Search"></p>
        </form>
      `,
    );
  }
  
  export function not_found() {
    return layout(
      "Contact Not Found",
      `
        <h1>Not Found</h1>
        <form action="/search" method="post">
          <p><input type="text" placeholder="Name to find" name="name"></p>
          <p><input type="submit" value="Search"></p>
        </form>
      `,
    );
  }
  
  export function show(post) {
    return layout(
      post.title,
      `
        <h1>${post.title}</h1>
        <pre>${post.body}</pre>
      `,
    );
  }
  