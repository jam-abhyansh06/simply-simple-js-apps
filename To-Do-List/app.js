//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/todolistDB");
mongoose.connect("mongodb+srv://admin-abhyansh:Mongosh-2004@cluster0.5k7fi.mongodb.net/todolistDB");
const itemsSchema = {
  name: String
};
const customListSchema = {
  name: String,
  items: [itemsSchema]
};

const Item = mongoose.model("Item", itemsSchema);
const customList = mongoose.model("customList", customListSchema)

const item1 = new Item({
  name: "Welcome to todolist!"
});
const item2 = new Item({
  name: "Hit the + button to add a new item."
});
const item3 = new Item({
  name: "<-- Hit this to delete an item"
});

const defaulItems = [item1, item2, item3];



app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaulItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully added.");
        }
      })
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems
      });
    }
  })
});


app.post("/", function(req, res) {
  const item = new Item({
    name: req.body.newItem
  });
  const listName = req.body.list;

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  }
  else {
    customList.findOne({name: listName}, function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName)
    })
  }


});


app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today") {
    Item.findByIdAndDelete(checkedItemId, function(err) {
      if(!err) {
        res.redirect("/");
      }
    })
  } else {
      customList.findOneAndUpdate( {name: listName},{$pull: {items: {_id:checkedItemId}}}, function(err, foundList) {
      if(!err) {
        res.redirect("/"+listName);
      }
    })
  }
})




app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);
  customList.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        // Create a new list
        const list = new customList({
          name: customListName,
          items: defaulItems
        });
        list.save();
        res.redirect("/" + customListName)
      } else {
        // Show an existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      }
    }


  });
});



app.get("/about", function(req, res) {
  res.render("about");
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8888;
}
app.listen(port);
