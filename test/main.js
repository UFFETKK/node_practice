const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  fs = require("fs");

// 주석 1
// const routeMap = {
//   "/": "views/index.html",
// };

// 주석 2
// const getViewUrl = (url) => {
//   return `views${url}.html`;
// };

const sendErrorResponse = (res) => {
  res.writeHead(httpStatus.NOT_FOUND, {
    "Content-Type": "text.html",
  });
  res.write("<h1>FILE NOT FOUND</h1>");
  res.end();
};

http
  .createServer((req, res) => {
    // 주석 1
    // res.writeHead(httpStatus.OK, {
    //   "Content-Type": "text/html",
    // });
    // if (routeMap[req.url]) {
    //   fs.readFile(routeMap[req.url], (err, data) => {
    //     res.write(data);
    //     res.end();
    //   });
    // } else {
    //   res.end("<h1>sorry, not found</h1>");
    // }
    //주석2
    // let viewUrl = getViewUrl(req.url);
    // fs.readFile(viewUrl, (err, data) => {
    //   if (err) {
    //     res.writeHead(httpStatus.NOT_FOUND);
    //     res.write("<h1>FILE NOT FOUND</h1>");
    //   } else {
    //     res.writeHead(httpStatus.OK, {
    //       "Content-Type": "text.html",
    //     });
    //     res.write(data);
    //   }
    //   res.end();
    // });

    let url = req.url;
    if (url.indexOf(".html") !== -1) {
      res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html",
      });
      customReadFile(`./views${url}`, res);
    } else if (url.indexOf(".js") !== -1) {
      res.writeHead(httpStatus.OK, {
        "Content-Type": "text/css",
      });
      customReadFile(`./public/css${url}`, res);
    } else if (url.indexOf(".png") !== -1) {
      res.writeHead(httpStatus.OK, {
        "Content-Type": "image/png",
      });
      customReadFile(`./public/images${url}`, res);
    } else {
      sendErrorResponse(res);
    }
  })
  .listen(port);
console.log(`the server has started and is listening on port number ${port}`);

const customReadFile = (file_path, res) => {
  if (fs.existsSync(file_path)) {
    fs.readFile(file_path, (err, data) => {
      if (err) {
        console.log(err);
        sendErrorResponse(res);
        return;
      }
      res.write(data);
      res.end();
    });
  } else {
    sendErrorResponse(res);
  }
};
