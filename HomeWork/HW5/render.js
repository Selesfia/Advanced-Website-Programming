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
            border-bottom: 1px solid #F7CAC9;
            list-style: none;
          }
  
          #posts li:last-child {
            border-bottom: none;
          }
  
          textarea {
            width: 500px;
            height: 300px;
          }
  
          input[type=text],
          [type=tel] {
            border: 1px solid #F7CAC9;
            border-top-color: #B3CEE5;
            border-left-color: #B3CEE5;
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
    </html>`;
  }
  
  export function list(posts) {
    const listItems = posts.map(post => `
      <li>
        <h2>${post.title}</h2>
        <p><a href="/post/${post.id}">Detail</a></p>
      </li>
    `).join('\n');
  
    return layout('Address Book', `
      <h1>Address Book</h1>
      <p>You have <strong>${posts.length}</strong> person contact!</p>
      <p><a href="/post/search">Find contact</a></p>
      <p><a href="/post/new">Add new contact</a></p>
      <ul id="posts">
        ${listItems}
      </ul>
    `);
  }
  
  export function newPost() {
    return layout('Add new contact', `
      <h1>Add new contact</h1>
      <p>Contact Information</p>
      <form action="/post" method="post">
        <p><input type="text" placeholder="Name" name="title" required></p>
        <p><input type="tel" placeholder="Phone Number" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" name="body" required></p>
        <p><input type="submit" value="Create"></p>
      </form>
    `);
  }
  
  export function show(post) {
    return layout(post.title, `
      <h1>${post.title}</h1>
      <pre>${post.body}</pre>
    `);
  }
  
  export function search() {
    return layout('Find a contact', `
      <h1>Find a contact</h1>
      <form action="/search" method="post">
        <p><input type="text" placeholder="Name" name="name" required></p>
        <p><input type="submit" value="Search"></p>
      </form>
    `);
  }
  
  export function notfound() {
    return layout('Find a contact', `
      <h1>Find a contact</h1>
      <form action="/search" method="post">
        <p><input type="text" placeholder="Name" name="name" required></p>
        <p><input type="submit" value="Search"></p>
      </form>
      <h1>Contact not found</h1>
    `);
  }
  