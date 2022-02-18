const port = 3000,
  express = require("express"),
  app = express();

app
  .get("/", (req, res) => {
    res.send("hello World");
    console.log(req.params);
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);
  })
  .post("/contact", (req, res) => {
    res.end("contact information submitted successfully");
  })
  .get("/items/:vegetable", (req, res) => {
    let veg = req.params.vegetable;
    res.send(`this is the page for ${veg}`);
  });

app.listen(port, () => {
  console.log(
    "the express.js serverhas started and is listening on port number : " + port
  );
});
