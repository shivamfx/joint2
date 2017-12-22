'use Strict'

var BestDish = require('../../app/models/bestdish');
var DishDetails = require('../../app/models/dishdetails');
var Logger=require('../../app/services/loggerService');


exports.addBestDish = function (req, res) {
    
var dishDetails=new DishDetails({
    DishImgUrl:req.body.DishImgUrl,
    ResImgUrl:req.body.ResImgUrl,
    Flavour:req.body.Flavour,
    Description:req.body.Description,
    Location:req.body.Location,
    Address:req.body.Address,
    Price:req.body.Price,
    UserId:req.body.UserId,
});

      var bestDish = new BestDish({
        Name:req.body.Name,
        Type:req.body.Type,
        IsNew:req.body.IsNew,
        Sort:req.body.Sort,
        DishDetails:null
      });
    
      var Invalid = bestDish.validateSync();
      if (Invalid) {
       
        res.status(400).send({
          success: false,
          msg: 'Schema Invalid'
        });
      } else {
        bestDish.save(function (err, result) {
          if (err) {
            
            res.status(500).send({
              success: false,
              message: "Something gone wrong"
            });
          } else if (result.nModified === 0) {
            
            res.status(400).send({
              success: false,
              message: "not found"
            });
          } else {
            res.status(200).send({
              success: true,
              message: "request succesfully completed"
            });
          }
        });
    
      }
    }

    exports.doBestDishExists=function(req,res)
    {
      var _Name=req.body.Name;
      BestDish.find({Name:_Name},function(err,result)
    {
    if(err)
    {
     console.log(err);
    }
    if(!result)
    {
      res.status(200).send({success:true,value:0,Msg:"Not Found"});
    }
    else
    {
      res.status(200).send({success:true,value:1,Msg:"Not Found"});     
    }
    });
    }



    exports.getBestDish = function (req,res) {
       
        BestDish.find({},function(err,result){
            if(err)
            {
                console.log(err);
            }
if(!result)
{
    console.log(result)

}
else
{
    res.status(200).send({success:true,msg:"request completed sucessfully",data:result});
}

        });
    
    }


    exports.getSingleDishDetails=function(req,res)
    {
      var Id=req.params.id;
      BestDish.findOne({"DishDetails._id":Id},{"DishDetails.$.":1},function(err,result)
      {
if(err)
{
  console.log(err);
}
else if(result)
{
return res.status(200).send(result);
}
      });
    
    }
