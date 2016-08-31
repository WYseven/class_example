var mongoose  =require('mongoose');

module.exports = new mongoose.Schema({
	name:String,
	age:Number,
	time:{
		type:Date,
		default:Date.now
	}
});