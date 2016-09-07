var mongoose  =require('mongoose');

module.exports = new mongoose.Schema({
	name:String,
	password:Number,
	time:{
		type:Date,
		default:Date.now
	}
});