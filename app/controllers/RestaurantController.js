'use strict'

var Restaurant = require('../../app/models/restaurant'); // get our mongoose model
var Account = require('../../app/models/account'); // get our mongoose model

var Logger = require('../../app/services/loggerService');

//general

exports.getRestaurants = function (req, res) {

  Account.find({
    'Restaurant': {
      $ne: null
    }
  }, {
    Restaurant: 1
  }, function (err, request) {
    if (err) {
      Logger.logger(err, null, req.body, 'RestaurantController getResturants', 'not able to fetch data in the restaurant');
      return res.status(500).send({
        success: false,
        message: "Something gone wrong"
      });
    }
    if (!res) {
      Logger.logger(err, null, req.body, 'RestaurantController getResturants', 'result empty not found');
      return res.status(400).send({
        success: false,
        message: "not found"
      });
    } else {
      res.status(200).send({
        success: true,
        message: "request succesfully completed",
        data: request
      });
    }
  });

};


//specific to perticular user
exports.getRestaurant = function (req, res) {
  var resID=req.params.id
  Account.findOne({
    _id: resID
  }, {
    'Restaurant': 1
  }, function (err, result) {
    if (err) {
      Logger.logger(err, req.decoded.id, req.body, 'RestaurantController getResturant', 'not able to fetch data in the restaurant');
      return res.status(500).send({
        success: false,
        message: "Something gone wrong"
      });
    }
    if (!result) {
      Logger.logger(err, req.decoded.id, req.body, 'RestaurantController getResturant', 'result empty not found');
      return res.status(400).send({
        success: false,
        message: "not found"
      });
    } else {
      res.status(200).send({
        success: true,
        message: "request succesfully completed",
        data: result.Restaurant
      });
    }
  });
}



exports.doRestaurantExists=function(req,res)
{
  var MobId=req.body.MobId;
  console.log(MobId)
  Account.findOne({
    "User.Mob":MobId
  }, function (err, result) {
    if (err) {
      console.log(err);
    } else if (!result) {
      
      res.status(200).send({
        success: true,
        value: 0,
        msg: "no user found"
      });
    } else if (result) {
      if (result.Restaurant == null) {
        res.status(200).send({
          success: true,
          value: 1,
          msg: "no restaurant found"
        });
      } else {
        console.log(result.Restaurant);
      res.status(200).send({success:true,value:2,data:result.Restaurant});
      }
    }
  });
} 

//by admin
exports.addRestaurant = function (req, res) {

  var MobId = req.body.MobId;

  console.log(req.body);

  //req.body.BestDishes=req.body.BestDishes!=undefined?(req.body.BestDishes).split(","):null;
  
    var restaurant = new Restaurant({
      Name: req.body.Name,
      Branch: req.body.Branch,
      Mobile: req.body.Mobile,
      Time: req.body.Time,
      Cuisines: req.body.Cuisines,
      Type: req.body.Type,
      AverageCost: req.body.AverageCost,
      Address: req.body.Address,
      BestDishes: req.body.BestDishes,
      More: req.body.More,
      Deals: req.body.Deals
    });
    console.log(restaurant);

    var Invalid = restaurant.validateSync();
    if (Invalid) {
      Logger.logger(Invalid, req.decoded.id, req.body, 'RestaurantController addResturant', 'SchemaInvalid of resturant');
      res.status(400).send({
        success: false,
        msg: 'Schema Invalid'
      });
    } else {
      Account.update({
        "User.Mob": MobId
      }, {
        $set: {
          Restaurant: restaurant
        }
      }, function (err, result) {
        if (err) {
          Logger.logger(err, req.decoded.id, req.body, 'RestaurantController addResturant', 'not able to add data in the restaurant');
          res.status(500).send({
            success: false,
            message: "Something gone wrong"
          });
        } else if (result.nModified === 0) {
          Logger.logger(err, req.decoded.id, req.body, 'RestaurantController addResturant', 'data not added as nModified==0');
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


exports.editRestaurant = function (req, res) {

  var resturant = new Restaurant();
  Account.findOne({
    _id: req.decoded.id
  }, {
    'Restaurant': 1
  }, function (err, result) {
    if (err) {
      Logger.logger(err, req.decoded.id, req.body, 'RestaurantController editResturant', 'not able to fetch data in the restaurant');
      return res.status(500).send({
        success: false,
        message: "Something gone wrong"
      });
    }
    if (!result) {
      Logger.logger(err, req.decoded.id, req.body, 'RestaurantController editResturant', 'result empty not found');
      return res.status(400).send({
        success: false,
        message: "not found"
      });
    } else {
      restaurant = result.Restaurant;

      Name = req.body.Name;
      Branch = req.body.Branch;
      Mobile = req.body.Mobile;
      Time = req.body.Time;
      Cuisines = req.body.Cuisines;
      Type = req.body.Type;
      AverageCost = req.body.AverageCost;
      Address = req.body.Address;
      BestDishes = req.body.BestDishes;
      More = req.body.More;
      Deals = req.body.Deals;

      Account.update({
        _id: req.decoded.id
      }, {
        $set: {
          Restaurant: restaurant
        }
      }, function (err, result) {
        if (err) {
          Logger.logger(err, req.decoded.id, req.body, 'RestaurantController editResturant', 'not able to add data in the restaurant');
          return res.status(500).send({
            success: false,
            message: "Something gone wrong"
          });
        } else if (result.nModified === 0) {
          Logger.logger(err, req.decoded.id, req.body, 'RestaurantController editResturant', 'data not added as nModified==0');
          return res.status(400).send({
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




  });
};




//work to do
var Snapshot = require('../../app/models/snapshot');
var azureServive = require('../../app/services/azureService');
exports.uploadSnapShot = function (req, res) {
  console.log(req.file);
  azureServive.uploadToAzure(req.file, function (err, Url) {
    if (err) {
      Logger.logger(error, req.decoded.id, req.body, 'RestaurentController uploadToAzure', 'error while uploading blob');
      return res.status(500).send({
        sucess: false,
        msg: 'error while uploading blob'
      });
    }
    if (Url) {
      var snapshot = new Snapshot({
        ImageURL: Url,
        ImageType: 'menu'
      });

      Account.update({
        _id: req.decoded.id
      }, {
        $push: {
          'Restaurant.Snapshots': snapshot
        }
      }, function (err, result) {

        if (err) {
          Logger.logger(error, req.decoded.id, req.body, 'RestaurentController uploadToAzure', 'error while adding in mongo');
          return res.status(500).send({
            sucess: false,
            msg: 'error while adding in mongodb'
          });
        }
        if (result.nModified === 1) {
          res.status(200).send({
            success: true,
            msg: 'request completed sucessfuly'
          });
        }

      });

    }
  });


}