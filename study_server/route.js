// 1. fs 사용
//   const port = 3000,
//   http = require("http"),
//   httpStatus = require("http-status-codes"),
//   fs = require("fs");

// const routeMap = {
//   "/info": "<h1>info page</h1>",
//   "/contact": "<h1>contact</h1>",
//   "/about": "<h1>learn more about us</h1>",
//   "/hello": "<h1>say hello by emailing us here</h1>",
//   "/error": "<h1>sorry the page you are looking for is not here</h1>",
// };

// http
//   .createServer((req, res) => {
//     res.writeHead(httpStatus.OK, {
//       "Content-Type": "text/html",
//     });
//     if (routeMap[req.url]) {
//       fs.readFile(routeMap[req.url], (err, data) => {
//         res.write(data);
//         res.end();
//       });
//     } else {
//       setTimeout(() => {
//         res.end("<h1>Welcome!</h1>");
//       }, 1000);
//     }
//   })
//   .listen(port);
// console.log(`the server has started and is listening on port number : ${port}`);

// 2. 동적인 읽기와 파일제공을 위한 fs와 라우팅
//views 파일 있어야함
// const port = 3000,
//   http = require("http"),
//   httpStatus = require("http-status-codes"),
//   fs = require("fs");

// const getViewUrl = (url) => {
//   return `views${url}.html`;
// };

// http
//   .createServer((req, res) => {
//     let viewUrl = getViewUrl(req.url);
//     fs.readFile(viewUrl, (err, data) => {
//       if (err) {
//         res.writeHead(httpStatus.NOT_FOUND);
//         res.write("<h1>sorry not found</h1>");
//       } else {
//         res.writeHead(httpStatus.OK, {
//           "Content-Type": "text/html",
//         });
//         res.write(data);
//       }
//       res.end();
//     });
//   })
//   .listen(port);
// console.log(`the server has started and is listening on port number : ${port}`);

//3. 각 파일별 특정 라우트를 가지는 웹서버 구현
// public > images, css, js 가 있어야함
// const port = 3000,
//   http = require("http"),
//   httpStatus = require("http-status-codes"),
//   fs = require("fs");

// const sendErrRes = (res) => {
//   //에러 핸들링 함수
//   res.writeHead(httpStatus.NOT_FOUND, {
//     "Content-Type": "text/html",
//   });
//   res.write("<h1>sorry not found</h1>");
//   res.end();
// };

// http
//   .createServer((req, res) => {
//     let url = req.url; //요청 url 저장
//     if (url.indexOf(".html") !== -1) {
//       //url에 파일 확장자가 있는지 확인
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/html", //요청 콘텐츠 유형지정
//       });
//       customReadFile(`views${url}`, res); //readFile 호출
//     } else if (url.indexOf(".js") !== -1) {
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/javascript",
//       });
//       customReadFile(`./public/js${url}`, res);
//     } else if (url.indexOf(".css") !== -1) {
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/css",
//       });
//       customReadFile(`./public/css${url}`, res);
//     } else if (url.indexOf(".png") !== -1) {
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "image/png",
//       });
//       customReadFile(`./public/images${url}`, res);
//     } else {
//       sendErrRes(res);
//     }
//   })
//   .listen(port);
// console.log(`the server has started and is listening on port number : ${port}`);

// const customReadFile = (file_path, res) => {
//   //이름으로 요청된 파일 찾기
//   if (fs.existsSync(file_path)) {
//     //파일이 존재하는지 확인
//     fs.readFile(file_path, (err, data) => {
//       if (err) {
//         console.log(err);
//         sendErrRes(res);
//         return;
//       }
//       res.write(data);
//       res.end();
//     });
//   } else {
//     sendErrRes(res);
//   }
// };

//route.js로 분리하고 exports 객체에 함수 추가
//3번 방식, 라우팅할게 많으면 코드가 백줄이 넘어갈수도 있기때문에 route를 아예 main에서 분리
// const httpStatus = requrie("http-status-codes"),
//   htmlContentType = {
//     "Content-Type": "text/html",
//   },
//   routes = {
//     //post 및 get 요청에 맵핑된 라우트를 저장할 routes 객체 정의
//     GET: {
//       "/info": (rep, res) => {
//         res.writeHead(httpStatus.OK, {
//           "Content-Type": "text/plain",
//         });
//         res.end("welcome to the info page");
//       },
//     },
//     POST: {},
//   };

// exports.handle = (req, res) => {
//   //라우트에 따른 콜백 함수를 처리하기 위한 함수 handle 작성
//   try {
//     //try- catch로 오류를 로깅
//     if (routes[req.method][req.url]) {
//       routes[req.method][req.url](req.res);
//     } else {
//       res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
//       res.end("<h1>no such file exists</h1>");
//     }
//   } catch (ex) {
//     console.log("error : " + ex);
//   }
// };

// exports.get = (url, action) => {
//   //main.js로 부터 routes에 등록하기 위한 get 및 post 함수 생성, main에서 get('contact.html',<callback func>)를 입력해 routes 객체에 /contact.html 페이지와 같은 새로운 콜백 함 관련 추가를 할 수 있음
//   routes["GET"][url] = action;
// };
// exports.post = (url, action) => {
//   routes["POST"][url] = action;
// };
// //get 또는 post 호출시 해당 라우트에 도달할때 실행할 라우트와 함수를 전달해야함.
// //이 함수는 라우트를 routes객체에 추가해 등록하며 handle함수에 의해 사용된다.

// //main.js에서 router.js가져오기=> require('./router')
// const port = 3000,
//   http = require("http"),
//   httpStatusCodes = require("http-status-codes"),
//   router = require("./router"),
//   fs = require("fs"),
//   plainTextContentType = {
//     "Content-Type": "text/plain",
//   },
//   htmlContentType = {
//     "Content-Type": "text/html",
//   },
//   customReadFile = (file, res) => { //코드 반복을 줄이기 위한 변경된 readfile
//     fs.readFile(`./${file}`, (err, res) => {
//       if (err) {
//         console.log("err reading the file...");
//       }
//       res.end(data);
//     });
//   };

// //get과 post로 라우트 등록
// router.get("/", (req, res) => {
//   res.writeHead(httpStatusCodes.OK, plainTextContentType);
//   res.end("INDEX");
// });
// router.get("/index.html", (req, res) => {
//   res.writeHead(httpStatusCodes.OK, htmlContentType);
//   customReadFile("views/index.html", res);
// });

// router.post("/", (req, res) => {
//   res.writeHead(httpStatusCodes.OK, plainTextContentType);
//   customReadFile("POSTED");
// });

// http.createServer(router.handle).listen(3000); //router.js를 통한 모든 요청 처리
// console.log(`the server has started and is listening on port number : ${port}`);
