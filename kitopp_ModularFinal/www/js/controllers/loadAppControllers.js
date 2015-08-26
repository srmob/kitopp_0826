(function(){
    var funcLoadApp = function($scope,$ionicModal,$timeout,$state,$stateParams,LoadAppInfo,ProductInfo,$ionicHistory,$ionicScrollDelegate,$ionicPopup,SellerInfo,commonAppService,$ionicLoading,OrderInfo,ApiEndpoint,LoginInfo){
    $scope.loginData = {};
    $scope.imeiNbr ;
    $scope.buyerId ;
    $scope.buyerName ;
    
    $scope.userId = commonAppService.getloggedInUserId();
    $scope.userType = commonAppService.getloggedInUserType();
        
    console.log("In App controller ; UID and Type =>"+$scope.userId+"-"+$scope.userType);
       
    $scope.alertOrderConfirmed = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'You\'r order is in process!',
            template: 'Thank YOU for placing the order'
        });
        alertPopup.then(function(res) {
            console.log('Alert confirmed ');
            $state.go('app.buyer');
        });
    };
        
        
    $scope.pickProducts=function(name,id,buyerId){
        $timeout(function() {
          console.log('DEBUG: $state.go for buy products'+name+" id-"+id+"-buyer id"+$scope.userId);
          $state.go('app.buyer.buyProducts',{ shopName: name,uid_seller:id, buyer_uid:$scope.userId });
        });
    };

    $scope.buyerOrders=function(buyerId){

        var buyerId = buyerId;
        console.log('Buyer Id in LoadApp Controllers is '+buyerId);
        if (buyerId == null || buyerId == 0 ) {
            buyerId = $scope.userId;
            
        }
        /*ProductInfo.getOrders($scope.buyerId).then(function(items){
        console.log("Controller(AppCtrl); Func(getOrders) ; Len(getOrders):"+items.length+"--"+$scope.buyerId);
            $scope.orders = items;
        });
        LoadAppInfo.getBuyerDetails($scope.buyerId).then(function(buyerDetails){
            console.log("JSON stringify value is "+JSON.stringify(buyerDetails));
            $scope.buyerName = buyerDetails[0].first_name;
        });*/
        OrderInfo.getBuyerOrders(buyerId).then(function(items){
            console.log("Controller(OrderItemCtrl); Func(getOrders) ; orders data"+JSON.stringify(items));
            $scope.orders = items;
        });
    };
    /*var adjusting = false;
        
    $scope.scrollMirror = function(from, to) {
        console.log("In Scroll Mirror - load App controller "+adjusting);
        if (adjusting) {
          adjusting = false;
        } else {
          // Mirroring zoom level
          var zoomFrom = $ionicScrollDelegate.$getByHandle(from).getScrollView().getValues().zoom;
          var zoomTo = $ionicScrollDelegate.$getByHandle(to).getScrollView().getValues().zoom;
          console.log("In Scroll Mirror - zoom from "+zoomFrom);
          console.log("In Scroll Mirror - zoom tp "+zoomTo);
          if (zoomFrom != zoomTo) {
            $ionicScrollDelegate.$getByHandle(to).getScrollView().zoomTo(zoomFrom);
          }

          // Mirroring left position
          $ionicScrollDelegate.$getByHandle(to).scrollTo($ionicScrollDelegate.$getByHandle(from).getScrollPosition().left,
          $ionicScrollDelegate.$getByHandle(to).getScrollPosition().top);

          adjusting = true;
        }
    };*/
  
    $scope.viewSellerOrders = function(sellerId){
           $scope.sellerId = sellerId;
            if ($scope.sellerId == null || $scope.sellerId == 0 ){
                $scope.sellerId = commonAppService.getloggedInUserId();
            }
           console.log("In AppCtrl , viewSellerOrders() - Seller Id- "+$scope.sellerId);
           $scope.sellerOrders=[];
           $scope.buyerName;
           SellerInfo.getSellerOrders($scope.sellerId).then(function(orders){
                //console.log("In getSellerOrders() of SellerInfo--"+orders.length);
                $scope.sellerOrders = orders;
                //console.log("Sellers Orders ==>--"+JSON.stringify(angular.fromJson($scope.sellerOrders)));
                //$state.go("app.seller.orderDetails");
            });
           //console.log("In AppCtrl , sdfsdf "+sellerId);
    };
    
    if ( $scope.userType  == 'seller' && $scope.userId != null ){
        $scope.viewSellerOrders();
    }
        
        
    //$scope.buyerOrders();
    //Use this function to get all Sellers associated with logged in Buyer
    $scope.getSellersForBuyer = function() {
        console.log("In getSellersForBuyer within load App controllers");
        LoadAppInfo.getSellersForBuyer($scope.userId).then(function(sellers){
            console.log("From DB Sellers length"+sellers.length);
            $scope.sellersAssociated = sellers;
            angular.forEach($scope.sellersAssociated,function(value,key){
               //$scope.sellersAssociated[key].imgpath="img/sellers/images-"+key+".jpeg";
                 $scope.sellersAssociated[key].imgpath=ApiEndpoint+"/user/fetchShopImage/uid/"+value.uid;
                console.log(" value "+value.uid)
                //$scope.sellersAssociated[key].imgpath="img/sellers/images-"+key+".jpeg";
            });
            //console.log("$scope.sellersAssociated-"+JSON.stringify($scope.sellersAssociated));
            console.log("$scope.sellersAssociated-"+$scope.sellersAssociated.length);

        });
    };
    if ( $scope.userType  == 'buyer' ){
        $scope.getSellersForBuyer();
    }
    
    
    $scope.addFavSeller = function (sellerId){
        
        console.log("seller ID-"+sellerId+",buyerID-"+$scope.userId);
        
    }

    $scope.orderChkbox = {prodid:[]};

    $scope.viewOrderDetails = function(orderId,buyerId){
           console.log("viewOrderDetails() load App Controller function "+$state.current.name+"-"+$state.$current.url);
           console.log("is state? "+$state.is("app.seller.orderDetails")+"="+orderId+"--"+buyerId);
           $state.go("app.seller.orderDetails",{orderId:orderId,buyerId:buyerId});
           //$scope.orderDetails=[];
           /*SellerInfo.getOrdersDetails(orderId).then(function(details){
                console.log("In viewOrderDetails/getOrdersDetails() of AppCtrl--"+details.length);
                $scope.orderDetails = details;
                /*console.log("Order Details JSON  in load App "+JSON.stringify($scope.orderDetails));
                angular.forEach($scope.orderDetails,function(value,key){
                    $scope.orderDetails[key].checked=false;
                });*/
               //console.log("Order Details JSON  in load App for order ID:"+orderId+"-->"+JSON.stringify($scope.orderDetails));
               //$state.go("app.seller.orderDetails");
               //console.log("JSON stringify value is "+JSON.stringify($scope.orderDetails));
           // });*/
           /*LoadAppInfo.getBuyerDetails(buyerId).then(function(buyerDetails){
               console.log("In viewOrderDetails/getBuyerDetails() of AppCtrl--"+buyerDetails.length);
                //console.log("JSON Buyer stringify value is "+JSON.stringify(buyerDetails));
                $scope.shopName = buyerDetails[0].shop_name;
                $scope.buyerDetails = buyerDetails;
            });
            console.log("JSON product id selected are is "+JSON.stringify($scope.orderChkbox));
            */
           
           
           
           
       };  
        
        $scope.logout = function(){
           console.log("Exit the app..");
            console.log("Exit the app1.."+navigator.app);
            console.log("Exit the app2.."+navigator.device);
           //navigator.app.exitApp()
           if (navigator.app) {
                //alert("app");
                /*navigator.app.exitApp();*///alert("app1");
               var alertPopup = $ionicPopup.confirm({
                 title: 'Logout ?',
                 template: 'Are you sure you want to logout?'
               });
               alertPopup.then(function(res) {
                   if(res){
                        console.log('Alert confirmed ');
                        LoginInfo.userLogout();
                        ionic.Platform.exitApp();
                   }else{
                       console.log('Alert cancelled ');
                   }
                });
               
            }else if (navigator.device) {
                alert("device");
                navigator.device.exitApp();
            }
        }

    };
    kitApp.controller('AppCtrl',funcLoadApp);
    
   
}());
