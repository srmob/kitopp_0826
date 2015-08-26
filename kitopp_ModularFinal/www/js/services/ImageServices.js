/*
kitApp.factory('FileService', function() {
  var images;
  var IMAGE_STORAGE_KEY = 'images';
 
  function getImages() {
    var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
      console.log("Images details in Service.getImages is "+JSON.stringify(img));
    if (img) {
      images = JSON.parse(img);
    } else {
      images = [];
    }
    return images;
  };
 
  function addImage(img) {
    images.push(img);
      console.log("Images details in Service.addImage is "+JSON.stringify(img));
    window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
  };
 
  return {
    storeImage: addImage,
    images: getImages
  }
})
*/

kitApp.factory('ImageService', function($cordovaCamera,  $q, $cordovaFile) {
 
  /*function makeid() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };*/
 
  function optionsForType(type) {
    var source;
      console.log(" Source type is "+type);
    switch (type) {
      case 0:
        source = Camera.PictureSourceType.CAMERA;
        break;
      case 1:
        source = Camera.PictureSourceType.PHOTOLIBRARY;
        break;
    }
    return {
      //destinationType: Camera.DestinationType.FILE_URI ,
      destinationType: Camera.DestinationType.DATA_URL,
      quality : 75, 
      targetWidth : 70,
      targetHeight : 50, 
      sourceType: source,
      allowEdit: true,
      saveToPhotoAlbum: true,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions
    };
  }
 
  function saveMedia(type) {
      
        return $q(function(resolve, reject) {
              var options = optionsForType(type);
              $cordovaCamera.getPicture(options).then(function(imageUrl) {
                  console.log("Image captured is " +imageUrl);

                  /*if (imageUrl.substring(0,21)=="content://com.android") {
                      var photo_split=imageUrl.split("%3A");
                      imageUrl="content://media/external/images/media/"+photo_split[1];
                    }
                  console.log("Image captured after change is " +imageUrl);*/
                  //return imageUrl;
                  resolve(imageUrl);
              }, function(e) {
                reject();
              });
        })
    /*
    //return $q(function(resolve, reject) {
      var options = optionsForType(type);
 
      $cordovaCamera.getPicture(options).then(function(imageUrl) {
          console.log("Image captured is " +imageUrl);
          return imageUrl;
        /*var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
        var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
        var newName = makeid() + name;
        $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
          .then(function(info) {
            FileService.storeImage(newName);
            resolve();
          }, function(e) {
            reject();
          });
      });
   // })*/
  }
  return {
    handleMediaDialog: saveMedia
  }
});