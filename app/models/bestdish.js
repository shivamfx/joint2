var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DishDetails=require('./dishdetails');
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Bestdish', new Schema({ 
    Name:{type:String,default:null},
    Type:{type:String,default:null},
    IsNew:{type:Boolean,default:false},
    Sort:{type:Number,default:50},
    DishDetails:[DishDetails.schema],
    Created: {type:Date,default:Date.now}
}));

