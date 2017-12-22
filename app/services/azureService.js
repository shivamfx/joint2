'use strict'
var config=require('../../config');
var Logger=require('../services/loggerService');
var azure = require('azure-storage');
var blobService = azure.createBlobService(config.AzureStorageDB);
var jimp=require('jimp');
var streamifier = require('streamifier');
var uuid=   require("uuid/v1");


//add size and name in function 
exports.uploadToAzure=function(file,callback)
{
  

  // var res = imagename.split(".");
  //   imagename=res[0]+'.jpg';
  // while(exist==true)
  // {
  //  blobService.doesBlobExist('jointcontainer',imagename,function(err,result,response){
  //  if(err)
  //  {
  //   console.log(err);
  //  }
  //  console.log(result);
  //  if(result.exists===true)
  //  {
  //   var random=Math.floor((Math.random()*(9-1)+1));
  //   var res = imagename.split(".");
  //   imagename=res[0]+random+'.'+res[1];
  //   console.log(imagename);
  //   exist=true;
  //  }
  //  else if(result.exists===false)
  //  {
  //    exist=false;
  //    console.log('false');
  //  }
  //  });
  // }
  
  // jimp.read(file.buffer,function(err,image)
  // {
  //   if(err)
  //     {
  //       console.log(err);
  //       console.log('Hi');
  //     }

  //     image.resize(600,600).
  //     getBuffer( jimp.MIME_JPEG, uploadToAzure);
  //   });

  uploadToAzure(file.buffer);

      function uploadToAzure(buffer)
      {
 //converting to stream       
 var stream = streamifier.createReadStream(buffer);   

 //creating uuid name 
 var imageName=uuid()+'.jpg';

 //search in azure if exist***********

 //exporting to azure
 blobService.createBlockBlobFromStream(config.ContainerStandard,imageName,stream, file.size, function(error, result,response) {
   console.log(file.size);
  if (error) {
     console.log(error);
   }
   if(response.isSuccessful==true)
     {
       
       callback(error,imageName);
       
     }
     else
     {
      callback(error,null);
     }
     
 });

}
}