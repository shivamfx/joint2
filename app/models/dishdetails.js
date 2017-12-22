var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('DishDetails', new Schema({
    DishImgUrl:{type:String,default:null},
    ResImgUrl:{type:String,default:null},
    Flavour:{type:String,default:null},
    Description:{type:String,default:null},
    Location:{type:String,default:null},
    Address:{type:String,default:null},
    Price:{type:String,default:null},
    UserId:{type:Schema.Types.ObjectId,default:null},
    Created: {type:Date,default:Date.now}
}));