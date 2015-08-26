(function(){
   var funcUserReg = function($scope,$state, $stateParams,commonAppService,UserInfo,$ionicLoading,$filter,$ionicPopup){
        var ab = this;
        $scope.user={};
        console.log("In UserReg controller ");
        $scope.userId = commonAppService.getloggedInUserId();
        $scope.userType = commonAppService.getloggedInUserType();
        $scope.imeiID = commonAppService.getDeviceId();
        $scope.userPhoneNum = commonAppService.getloggedInUserPhoneNum();
        $scope.gender=[{"id":"M","value":"Male"},{"id":"F","value":"Female"}];
        $scope.onlyNumbers = /^[1-9]+[0-9]*/;
       
       $scope.getUserCategory = function(){
           //$scope.userCategory = ["buyer","seller","both"];
           console.log("In UserReg 1controller ");
           $scope.userCategory=[{"id":1,"name":"seller"},{"id":2,"name":"buyer"},{"id":3,"name":"both"}];
           /*UserInfo.getUserCategories().then(function(roles){
              $scope.userCategory = roles;
              console.log("Controller(UserRegCtrl); Func(getUserCategories) ; Catg Array Length:"+$scope.userCategory.length);
            });*/
           
       }
        $scope.getUserCategory();
       
        $scope.clearUserRegForm = function(){
            $scope.user = "";
        }
       
        // Populate the drop down list for category and related subcategories
        $scope.registerUser = function(user) {
            
            console.log("Register User =  "+JSON.stringify(user));
            console.log("Register User =  "+JSON.stringify(user.phone));
            console.log("Users Phone Number =  "+$scope.userPhoneNum);
            
            
            /*ionic.Platform.ready(function(){
                   console.log("Device Ready in ionic platform ");
                    // will execute when device is ready, or immediately if the device is already ready.
                    imeiId1 = ionic.Platform.device().uuid;
                    commonAppService.setDeviceId(imeiId1);
                    $scope.imeiID = imeiId1;
                    console.log("In Phone Number screen");
                    var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
                    telephoneNumber.get(function(result) {
                         console.log("result = " + result);
                         console.log("simSerialNumber = " + result.simSerialNumber); // number sim 
                         console.log("line1Number = " + result.line1Number); // telephone number (if insert sim)
                         console.log("full = " + JSON.stringify(result)); // telephone number (if insert sim)
                         //alert(result.line1Number);
                         commonAppService.setloggedInUserPhoneNum(result.line1Number);
                    }, function() {
                        console.log("error");
                        alert(error);
                    });

                });*/
            console.log("Users Device ID =  "+$scope.imeiID);
            /*if ($scope.imeiID == null|| $scope.imeiID == 'undefined') {
                ionic.Platform.ready(function(){
                   console.log("Device Ready in ionic platform ");
                    // will execute when device is ready, or immediately if the device is already ready.
                    imeiId1 = ionic.Platform.device().uuid;
                    commonAppService.setDeviceId(imeiId1);
                    $scope.imeiID = imeiId1;
                    console.log("In Phone Number screen");
                    var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
                    telephoneNumber.get(function(result) {
                         console.log("result = " + result);
                         console.log("simSerialNumber = " + result.simSerialNumber); // number sim 
                         console.log("line1Number = " + result.line1Number); // telephone number (if insert sim)
                         console.log("full = " + JSON.stringify(result)); // telephone number (if insert sim)
                         alert(result.line1Number);
                         commonAppService.setloggedInUserPhoneNum(result.line1Number);
                    }, function() {
                        console.log("error");
                        alert(error);
                    });

                });
            }*/
           
            saveToDB ="registerForm[user_type_id]="+user.category+"&registerForm[first_name]="+user.firstName+"&registerForm[last_name]="+user.lastName+"&registerForm[phone_num]="+user.phone+"&registerForm[email_id]="+user.email+"&registerForm[imie_id]="+commonAppService.getDeviceId();
            //if seller
            if(user.category ==1 || user.category ==3  ){
                saveToDB +="&registerForm[tin_num]="+user.tinNumber+"&registerForm[gender]="+user.gender+"&registerForm[st_num]="+user.stNumber+"&registerForm[date_of_birth]="+$filter('date')(user.dob, 'dd/MM/yyyy')+"&registerForm[alternate_phone_num]="+commonAppService.getloggedInUserPhoneNum();
            }
            console.log("DB "+saveToDB);
            UserInfo.addUser(saveToDB).then(function(data){
                console.log("User Saved to DB:"+JSON.stringify(data));
                console.log("User Saved status to DB:"+JSON.stringify(data.status));
                console.log("User Saved result to DB:"+JSON.stringify(data.result));
                if (data.status == 200) {
                    $scope.alertUserAdded();
                }else if (data.status == 500){
                    $scope.alertUserAdd_error();
                }
            });
            
            
        };
       $scope.alertUserAdded = function() {
           var alertPopup = $ionicPopup.alert({
             title: 'User Registration!',
             template: 'Registration complete, please check SMS for pin !!'
           });
           alertPopup.then(function(res) {
               $state.go('welcome');
            });
        };
       $scope.alertUserAdd_error = function() {
           var alertPopup = $ionicPopup.alert({
             title: 'User Registration Failed',
             template: 'Some error please re-try !!'
           });
           alertPopup.then(function(res) {
               $state.go('welcome');
            });
        };
        
    };
    //UserRegCtrl.$inject($scope,$state, $stateParams,'commonAppService','UserInfo');
    kitApp.controller('UserRegCtrl',funcUserReg);
}());