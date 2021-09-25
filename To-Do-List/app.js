const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items = [];
let workItems = [];

app.get("/", function(req, res) {
  // HAS BEEN MOVED TO date.js
  // let today = new Date();
  // let options = {weekday: 'long',month: 'long',day: 'numeric'};
  // let day = today.toLocaleDateString("en-US", options)
  const day = date.getDate();
  res.render("list.ejs", {listTitle: day,listItems: items,});
});


app.post("/", function(req, res) {
  // console.log(req.body);
  if(req.body.listType === "Work List") {
    workItems.push(req.body.nextItem);
    res.redirect("/work");
  }
  else {
    items.push(req.body.nextItem);
    res.redirect("/");
  }

});

app.get("/work", function(req,res) {
  res.render("list.ejs", {listTitle: "Work List", listItems: workItems});
})

app.post("/work", function(req,res) {

  workItems.push(req.body.nextItem);
  res.redirect("/work");
})

app.listen(8888, function() {
  console.log("Server running on Port 8888");
});
