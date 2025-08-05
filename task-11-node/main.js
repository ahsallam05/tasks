const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/" || req.url === "/home") {
    res.write(`
        <html>
        <head>
            <title>Home Page</title>
        </head>
        <body>
            <h1>Welcome to Home Page</h1>
            <p>This is the Home Page of the website</p>
            <a href="/about">About Us</a>
        </body>
        </html>
        `);
    res.end();
  } else if (req.url === "/about") {
    res.write(`
        <html>
        <head>
            <title>About Page</title>
        </head>
        <body>
            <h1>About Us</h1>
            <p>This is the About Page of the website</p>
            <a href="/home">Back to Home Page</a>
        </body>
        </html>
        `);
    res.end();
  } else {
    res.statusCode = 404;
    res.write(`
        <html>
        <head>
            <title>404 - Not Found</title>
        </head>
        <body>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for doesn't exist</p>
            <a href="/home">Back to Home Page</a>
        </body>
        </html>
        `);
    res.end();
  }
});

server.listen(3000, () => console.log("server is litening"));
