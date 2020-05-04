var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/calendar");

app.set("view engine", "ejs");
app.use(express.static("/public"));
app.use(bodyparser.urlencoded({extended:true}));

var calendarschema= new mongoose.Schema({
	day:String,
	time:String,
	subject:String,
	location:String
});

var appointment=mongoose.model("appointment",calendarschema);

app.get("/", function(req, res){
	res.redirect("/calendar");
});

app.get("/calendar", function(req, res){
	appointment.find({}, function(err, appointments){
		if(err){
			console.log(err);
		}else{
			res.render("index",{appointments:appointments});
		}
	});
	
});

app.post("/calendar", function(req, res){
	appointment.create(req.body.appointment, function(err,newapp){
		if(err){
			console.log(err);
		}else{
			res.redirect("/calendar");
		}
		
	});
	
});



app.listen(process.env.PORT || 3000, process.env.IP , function(){
	console.log("server of my caledar has started!!!");
});