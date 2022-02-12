// const routeResponseMap = {
//   "/info": "<h1>info page</h1>",
//   "/contact": "<h1>contact</h1>",
//   "/about": "<h1>learn more about us</h1>",
//   "/hello": "<h1>say hello by emailing us here</h1>",
//   "/error": "<h1>sorry the page you are looking for is not here</h1>",
// };
// const port = 3000,
//   http = require("http"),
//   httpStatus = require("http-status-codes");
// app = http.createServer((request, response) => {
//   console.log("received an incoming request!");
//   response.writeHead(httpStatus.OK, {
//     "Content-Type": "text/html",
//   });
//   if (routeResponseMap[request.url]) {
//     response.end(routeResponseMap[request.url]);
//   } else {
//     setTimeout(() => {
//       response.end("<h1>Welcome!</h1>");
//     }, 2000);
//   }
// });

// app.listen(port);
// console.log(`the server has started and is listening on port number : ${port}`);
