var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
   name:String,
   image:String,
   description:String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
//     {  name: "Whiteowl", 
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTho-MJjrSRxKeH1TlqiBwvCaV7MSRZvYVCVlV6HmPaabxFNDnj",
//       description:"This is an amazing place"
//     }, function(err,campground)
//     {
//         if(err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             console.log("NEWLY CREATED CAMPGROUND");
//             console.log(campground);
//         }
//     });



app.get("/", function(req, res){
    res.render("landing");
    console.log("someone is checking out the landing page");
});

app.get("/campgrounds", function(req, res){
    //get all campgrounds from db
    Campground.find({},function(err, allCampgrounds){
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("index", {campgrounds:allCampgrounds});        
        }
        
    });
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image,description:desc}
  //  campgrounds.push(newCampground);
  Campground.create(newCampground,function(err,newlyCreated)
  {
      if(err)
      {
          console.log(err);
      }
      else{
              res.redirect("/campgrounds");
      }
      
  });
    // redirect to campgrounds page
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
       if(err)
           console.log(err);
        else
           res.render("show",{campground:foundCampground});
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp has started");
});
