var mongoose  =require('mongoose');

module.exports = new mongoose.Schema({
	name:String,
	password:String,
	time:{
		type:Date,
		default:Date.now
	}
});