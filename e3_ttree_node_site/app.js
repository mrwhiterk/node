var router = require("./router.js");
//Problem: We need a simple way to look at a user's badgecount and js points from a web browser
//Solution: Use Node.js to perform the profile look ups and serve our template via HTTP

//1. Create a web server
const http = require('http');

const hostname = process.env.IP;
const port = process.env.PORT;

const server = http.createServer((request, response) => {
  router.home(request, response);
  router.user(request, response);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




