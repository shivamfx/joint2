'use strict';



module.exports = function(app,apiRoutes) {

    var user=require("../controllers/UserController");
    apiRoutes.get('/getUserDetail',user.getUserDetail);
   

var restaurant=require("../controllers/RestaurantController");
apiRoutes.post('/doRestaurantExists',restaurant.doRestaurantExists);
apiRoutes.post('/addRestaurant',restaurant.addRestaurant);
apiRoutes.post('/editRestaurant',restaurant.editRestaurant);
apiRoutes.get('/getRestaurant/:id',restaurant.getRestaurant);
//general
apiRoutes.get('/getRestaurants',restaurant.getRestaurants);


var multer  = require('multer');
var upload = multer();
var restaurant=require("../controllers/RestaurantController");
apiRoutes.post('/uploadSnapShot',upload.single('photo'),restaurant.uploadSnapShot);

var bookmark=require("../controllers/BookmarkController");
apiRoutes.post('/setBookmark',bookmark.setBookmark);
apiRoutes.get('/getBookmarks',bookmark.getBookmarks);
apiRoutes.post('/unBookMark',bookmark.unBookMark);

var review=require('../controllers/ReviewsController');
apiRoutes.post('/addReview',review.addReview);

var bestdish=require('../controllers/BestDishController');
apiRoutes.post('/addBestDish',bestdish.addBestDish);
apiRoutes.post('/getBestDish',bestdish.getBestDish);
apiRoutes.get('/getSingleDishDetails/:id',bestdish.getSingleDishDetails);
}
