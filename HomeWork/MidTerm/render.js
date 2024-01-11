// render.js

export async function home(user) {
  if (user) {
    return `
      <html>
        <body>
          <h1>Welcome, ${user.username}!</h1>
          <p><a href="/contacts/search">Search Contacts</a></p>
          <p><a href="/contacts/new">Add New Contact</a></p>
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
          <p>Email: <input type="email" name="email" required></p>
          <p><input type="submit" value="Signup"></p>
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
        </form>
        <p><a href="/">Home</a></p>
      </body>
    </html>
  `;
}

export async function searchContacts(contacts) {
  const contactList = contacts.map(contact => `<li>${contact.name} - ${contact.phone}</li>`).join('');
  return `
    <html>
      <body>
        <h1>Contact List</h1>
        <ul>${contactList}</ul>
        <p><a href="/">Home</a></p>
      </body>
    </html>
  `;
}

export async function addContactForm() {
  return `
    <html>
      <body>
        <h1>Add New Contact</h1>
        <form action="/contacts/new" method="post">
          <p>Name: <input type="text" name="name" required></p>
          <p>Phone: <input type="text" name="phone" required></p>
          <p><input type="submit" value="Add Contact"></p>
        </form>
        <p><a href="/">Home</a></p>
      </body>
    </html>
  `;
}

export async function deleteContactForm(contact) {
  return `
    <html>
      <body>
        <h1>Delete Contact</h1>
        <p>Are you sure you want to delete ${contact.name}?</p>
        <form action="/contacts/delete/${contact.id}" method="post">
          <p><input type="submit" value="Delete"></p>
        </form>
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
        <a href="/">Home</a>
      </body>
    </html>
  `;
}

export async function fail() {
  return `
    <html>
      <body>
        <h1>Operation Failed</h1>
        <p>An error occurred during the operation.</p>
        <a href="/">Home</a>
      </body>
    </html>
  `;
}
