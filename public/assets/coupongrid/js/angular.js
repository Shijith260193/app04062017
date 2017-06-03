var app = angular.module('myApp', []);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller('myCtrl',[ "$scope","cities" ,"$http","$window", function($scope, cities, $http, $window ) {
    $scope.source="";
    $scope.destination="";
    $scope.dateofjourney="";
    $scope.websites = ["eTravelSmart","redBus","AbhiBus","Paytm","ConfirmTKT","Travelyaari"];
    $scope.cdata="redBus";

    $scope.changedate = function(){
 $scope.tomorrow = new Date();
$scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
$scope.valuetmrw = $scope.tomorrow.toLocaleDateString("en-ZA");
document.querySelector("#seldate").value = $scope.valuetmrw;
};


$scope.change = function(){

$window.localStorage.setItem("Source",$scope.source);
$window.localStorage.setItem("Destination",$scope.destination);
    if(document.querySelector("#seldate").value == "")
        {
                $scope.tomorrow = new Date();
            $scope.valuetoday = $scope.tomorrow.toLocaleDateString("en-ZA");
document.querySelector("#seldate").value = $scope.valuetoday;
        }

$window.localStorage.setItem("Doj",document.querySelector("#seldate").value);
  $window.location.href = 'bussearchm.html';
  };

$scope.desktopchange = function(){

$window.localStorage.setItem("Source",$scope.source);
$window.localStorage.setItem("Destination",$scope.destination);
    if(document.querySelector("#dateofjourney").value == "")
        {
                $scope.tomorrow = new Date();
            $scope.valuetoday = $scope.tomorrow.toLocaleDateString("en-ZA");
document.querySelector("#dateofjourney").value = $scope.valuetoday;
        }

$window.localStorage.setItem("Doj",document.querySelector("#dateofjourney").value);
    $window.localStorage.setItem("Dor",document.querySelector("#dateofreturn").value);
    $window.location.href = 'bussearchd.html';
  };


$scope.cities = cities;
    $scope.myVar = 1;
$scope.changeDirection = function(){
    $scope.tmp = $scope.source;
    $scope.source = $scope.destination;
    $scope.destination = $scope.tmp;
    };

     $scope.complete=function(){
         $scope.limit = 6;
    $( ".tags" ).autocomplete({
      source: function (request, response) {
            var results = $.map($scope.cities, function (tag) {
                if (tag.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
                    return tag;
                }
            });
            response(results.slice(0, $scope.limit));
        }
    });
    }

    $scope.startsWith = function (actual, expected) {
    var lowerStr = (actual + "").toLowerCase();
    return lowerStr.indexOf(expected.toLowerCase()) === 0;
}
    $scope.coupondata=[];
    $scope.coupon=[];

    var getIsLiked = function(current){

        $http.post('/data',{"url":"http://api.datayuge.in/v1/coupons/list_coupons.php?category_id=51&store_name="+current+"&apikey= "}).success(function(response){
      $scope.coupon = response.data;
    $scope.coupondata[current] = $scope.coupon;
    console.log($scope.coupondata[current]);
  });


    }


    for(var i = 0; i < $scope.websites.length;i++){
         var current = $scope.websites[i];
        getIsLiked(current);
   }




$http.get("json/coupons.json").success(function(response)
{
$scope.coupons=response.data;
    $scope.myVar = 0;
});

    $scope.changeDestination = function(i) {
    $scope.destination = i;
};
        $scope.changeSource = function(i) {
    $scope.source = i;
};

}]);

/* Filter for Capitalize */

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});





/* Bus Search Controller */

app.controller('customersCtrl', [ "$scope","cities" ,"$http","$window", function($scope, cities, $http, $window ) {
       $scope.myVar=1;
    $scope.returnVariable = 1;
    $scope.cities = cities;
    $scope.complete=function(){
         $scope.limit = 6;
    $( ".tags" ).autocomplete({
      source: function (request, response) {
            var results = $.map($scope.cities, function (tag) {
                if (tag.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
                    return tag;
                }
            });
            response(results.slice(0, $scope.limit));
        }
    });
    }
    $scope.source = $window.localStorage.getItem("Source");
  $scope.destination=$window.localStorage.getItem("Destination");
    $scope.doj=$window.localStorage.getItem("Doj");
    $scope.dor=$window.localStorage.getItem("Dor");
    $scope.journeydat= ($scope.doj).replace(/[/]/g, '');
    $scope.returndat=
        ($scope.dor == null ? "" : ($scope.dor).replace(/[/]/g, ''));


    console.log($scope.journeydat);
    console.log($scope.returndat);


        $scope.sortColumn = "";
            $scope.reverseSort = false;

            $scope.sortData = function (column) {
                $scope.reverseSort = ($scope.sortColumn == column) ?
                    !$scope.reverseSort : false;
                $scope.sortColumn = column;
            }

            $scope.getSortClass = function (column) {

                if ($scope.sortColumn == column) {
                    return $scope.reverseSort
                      ? 'arrow-down'
                      : 'arrow-up';
                }

                return '';
            }

$scope.returnvar = function(){
    if($scope.returnVariable)
            $scope.returnVariable = 0;
    else
            $scope.returnVariable = 1;
};

  $scope.change = function(){
      $scope.hideit=true;
      $scope.myVar=1;
    document.getElementById('id01').style.display='none';  $window.localStorage.setItem("Doj",document.querySelector("#seldate").value);
      $scope.doj=$window.localStorage.getItem("Doj");
     $scope.journeydat= ($scope.doj).replace(/[/]/g, '');
    console.log($scope.journeydat);  $http.get("https://developer.goibibo.com/api/bus/search/?app_id=088b6d3a&app_key=b4522f7e802050d368a7122708c8c697&format=json&source="+$scope.source+"&destination="+$scope.destination+"&dateofdeparture="+$scope.journeydat+"").then(function (response) {
            $scope.banData = response.data;

            $scope.myVar=0;
  });
  };

      $scope.modifydesktopchange = function(){
      $scope.hideit=true;
      $scope.myVar=1;

    document.getElementById('id01').style.display='none';
          if(document.querySelector("#dateofjourney1").value != ''){
              $window.localStorage.setItem("Doj",document.querySelector("#dateofjourney1").value);
              $scope.doj=$window.localStorage.getItem("Doj");
              $scope.journeydat= ($scope.doj).replace(/[/]/g, '');
          }
          if(document.querySelector("#dateofreturn1").value != ''){
$window.localStorage.setItem("Dor",document.querySelector("#dateofreturn1").value);
 $scope.dor=$window.localStorage.getItem("Dor");
 $scope.returndat= ($scope.dor).replace(/[/]/g, '');
          }
          $http.get("https://developer.goibibo.com/api/bus/search/?app_id=088b6d3a&app_key=b4522f7e802050d368a7122708c8c697&format=json&source="+$scope.source+"&destination="+$scope.destination+"&dateofdeparture="+$scope.journeydat+"&dateofarrival="+$scope.returndat+"").then(function (response) {
            $scope.banData = response.data;

            $scope.myVar=0;
  });
  };

  $http.get("http://developer.goibibo.com/api/bus/search/?app_id=088b6d3a&app_key=b4522f7e802050d368a7122708c8c697&format=json&source="+$scope.source+"&destination="+$scope.destination+"&dateofdeparture="+$scope.journeydat+"&dateofarrival="+$scope.returndat+"").then(function (response) {
          $scope.banData = response.data;
      console.log(response.data);
angular.forEach($scope.banData, function (banData) {
banData.fare = parseFloat(banData.fare);
});
      $scope.myVar=0;

  });

    $scope.changeDirection = function(){
    $scope.tmp = $scope.source;
    $scope.source = $scope.destination;
    $scope.destination = $scope.tmp;
    };

}]);



<!-- Products Index Page -->

app.controller('productCtrl', function($scope, $http, $window) {

  $scope.product="";
    $scope.limit="";
    $scope.recent = JSON.parse(localStorage.getItem('viewed'));
    console.log($scope.recent);
$scope.searchproduct = function(){
    console.log($scope.product) ;
    $window.localStorage.setItem("Product",$scope.product);
   $window.location.href = '/products';
};

$scope.comaparefalse = function(prodcat){
    $window.localStorage.setItem("Product",prodcat);
    $window.location.href = '/products';
};
    $scope.runMyFunction = function(id){
    $window.localStorage.setItem("id",id);
    $window.location.href = '/displayproduct';
};

    $scope.searchcategory = function(category){
    console.log(category) ;
    $window.localStorage.setItem("Category",category);
    $window.location.href = '/categories';
};

$scope.searchlist = function(list){
    console.log(list) ;
    $window.localStorage.setItem("List",list);
    $window.location.href = '/category';
};
    $scope.openmodel = function(id){
        document.getElementById(id).style.display='block';
    };

     $scope.closemodel = function(id){
        document.getElementById(id).style.display='none';
    };

$http.get("https://api.rss2json.com/v1/api.json?rss_url=http://gadgets.ndtv.com/rss/feeds").then(function (response) {
  $scope.newsData = response.data;
console.log(response.data);

});

});

<!-- Products Page -->

app.controller('productSearchCtrl', function($scope, $http, $window) {

    $scope.myVar;
  $scope.product=$window.localStorage.getItem("Product");
    $window.document.location.hash = $scope.product;

$http.post('/data',{"url":"http://api.datayuge.in/v10/compare/search.php?product="+$scope.product+"&apikey="}).success(function(response){
          $scope.productData = response.data;
          $scope.myVar = 1;
  });

    $scope.displayProduct = function(id,compare,title){
        $window.localStorage.setItem("id",id);
        $window.localStorage.setItem("compare",compare);
        $window.localStorage.setItem("title",title);
        $window.location.href = '/displayproduct';

};

         $window.onhashchange = function() {
          $scope.myVar = 0;
          $scope.changeproduct = window.location.hash.substr(1);
          console.log($scope.changeproduct);
 $window.localStorage.setItem("Product",$scope.changeproduct);
    $http.post('/data',{"url":"http://api.datayuge.in/v10/compare/search.php?product="+$scope.changeproduct+"&apikey="}).success(function(response){
          $scope.productData = response.data;
          $scope.myVar = 1;
  });
}

    $scope.searchproduct = function(){
    console.log($scope.product) ;
    $window.localStorage.setItem("Product",$scope.product);
    $window.location.href = '/products';
};

    $scope.searchlist = function(list){
    console.log(list) ;
    $window.localStorage.setItem("List",list);
    $window.location.href = '/category';
};

    $scope.comaparefalse = function(prodcat){
    $window.localStorage.setItem("Product",prodcat);
    $window.location.href = '/products';
};

});

<!-- Category Page -->

app.controller('categorySearchCtrl', function($scope, $http, $window) {

    $scope.myVar = 0;
    $scope.pagenumber=1;
    $scope.categoryVar=0;
    var mobiles=["mobiles","tablets","landline-phones"];
    $scope.category=$window.localStorage.getItem("Category");
    $window.document.location.hash = "Category="+$scope.category+"&Page=1";

    $http.post('/data',{"url":"http://api.datayuge.in/v10/compare/search_category.php?page="+$scope.pagenumber+"&category="+$scope.category+"&comparable=true&apikey= "}).success(function(response){
        if($scope.category)
        $scope.categoryData = response.data;
        console.log($scope.categoryData);
        $scope.myVar = 1;
  });

      $window.onhashchange = function() {
          $scope.myVar = 0;
          $scope.eod=0;
          var type = window.location.hash.substr(1);
          var items = type.split("&");
          var category = items[0].split("=");
          var page = items[1].split("=");
          $scope.pagenumber =  parseInt(page[1]);

          $http.post('/data',{"url":"http://api.datayuge.in/v10/compare/search_category.php?page="+$scope.pagenumber+"&category="+$scope.category+"&comparable=true&apikey= "}).success(function(response){
            $scope.categoryData = response.data;
            console.log($scope.categoryData);
            $scope.myVar = 1;
      });
}

    $scope.navigatePage = function(page){
     $window.document.location.hash = "Category="+$scope.category+"&Page="+page;

};

    $scope.displayProduct = function(id,compare,title){
        $window.localStorage.setItem("id",id);
        $window.localStorage.setItem("compare",compare);
        $window.localStorage.setItem("title",title);
        $window.location.href = '/displayproduct';
};

    $scope.product="";
    $scope.searchproduct = function(){
    console.log($scope.product) ;
    $window.localStorage.setItem("Product",$scope.product);
    $window.location.href = '/products';
};

$scope.searchcategory = function(category){
    console.log(category) ;
    $window.localStorage.setItem("Category",category);
    $window.location.href = '/categories';
};

    $scope.searchlist = function(list){
    console.log(list) ;
    $window.localStorage.setItem("List",list);
    $window.location.href = '/category';
};

    $scope.comaparefalse = function(prodcat){
    $window.localStorage.setItem("Product",prodcat);
    $window.location.href = '/products';
};

});

<!-- Display Page -->

app.controller('displayproductCtrl', function($scope, $http, $window, $timeout) {
    $scope.myVar;
    $scope.nonCompareData = 0;

    $scope.id=$window.localStorage.getItem("id");
    $scope.compare=$window.localStorage.getItem("compare");
    $scope.title=$window.localStorage.getItem("title");

    $scope.compare == "true" ? ($scope.compare=1) : ($scope.compare=0);


  $window.onhashchange = function() {
          $scope.myVar = 0;

      var item = window.location.hash.substr(0);
       var page = item.split("=");
    $scope.id =  page[1];
          console.log($scope.id);
 $window.localStorage.setItem("id",$scope.id);
    $http.post('/data',{"url":"http://api.datayuge.in/v10/compare/product.php?id="+$scope.id+"&apikey= "}).success(function(response){
          if($scope.compare)  {
    $scope.displayData = response.product_details;
    console.log($scope.displayData);
    $scope.specData = response.specs;
    $scope.storeData =response.data;
    $scope.myVar = 1;
}
    else{

        $scope.displayData = response.product_details;
        $scope.storeData =response.data;

        if($scope.storeData == undefined){

            $scope.nonCompareData = 1;

  $http.post('/data',{"url":"http://api.datayuge.in/v10/compare/get_price.php?id="+$scope.id+"&apikey= "}).success(function(response){
$scope.priceData = response;
console.log($scope.priceData);
            });

        $http.post('/data',{"url":"http://api.datayuge.in/v10/compare/get_images.php?id="+$scope.id+"&apikey= "}).success(function(response){
             $scope.imageData = response;
             console.log($scope.imageData);
            });

        }
        $scope.myVar = 1;

    }

  });
}

     $http.post('/data',{"url":"http://api.datayuge.in/v10/compare/product.php?id="+$scope.id+"&apikey= "}).success(function(response){
if($scope.compare)  {
    $scope.displayData = response.product_details;
    console.log($scope.displayData);
    $scope.specData = response.specs;
    $scope.storeData =response.data;
    $scope.myVar = 1;
}
    else{

        $scope.displayData = response.product_details;
        $scope.storeData =response.data;

        if($scope.storeData == undefined){

            $scope.nonCompareData = 1;

  $http.post('/data',{"url":"http://api.datayuge.in/v10/compare/get_price.php?id="+$scope.id+"&apikey= "}).success(function(response){
$scope.priceData = response;
console.log($scope.priceData);
            });

        $http.post('/data',{"url":"http://api.datayuge.in/v10/compare/get_images.php?id="+$scope.id+"&apikey= "}).success(function(response){
             $scope.imageData = response;
             console.log($scope.imageData);
            });

        }
        $scope.myVar = 1;

    }
    });

    $scope.showOffers = function(id){
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace("w3-show", "");
    }
    }


     $window.document.location.hash = "id="+$scope.id;

    $scope.searchproduct = function(){
    console.log($scope.product) ;
    $window.localStorage.setItem("Product",$scope.product);
    $window.location.href = '/products';
};

$scope.searchcategory = function(category){
    console.log(category) ;
    $window.localStorage.setItem("Category",category);
    $window.location.href = '/categories';
};

    $scope.searchlist = function(list){
    console.log(list) ;
    $window.localStorage.setItem("List",list);
    $window.location.href = '/category';
};

    $scope.comaparefalse = function(prodcat){
    $window.localStorage.setItem("Product",prodcat);
    $window.location.href = '/products';
};

    $http.post('/data',{"url":"http://api.datayuge.in/v10/compare/get_images.php?id="+$scope.id+"&apikey= "}).success(function(response){
             $scope.arrayImage = response.images.thumb[0];
             console.log($scope.arrayImage);
    });

   $scope.recentViewed=[];

    $timeout(function() {
        if(localStorage.getItem('viewed') == null){
             $scope.recentViewed.push({title: $scope.title, id :  $scope.id, arrayImage:$scope.arrayImage});
             localStorage.setItem('viewed', JSON.stringify($scope.recentViewed));
        }
        else{
             $scope.recentViewed = JSON.parse(localStorage.getItem('viewed'));

            if(localStorage.getItem('viewed').indexOf($scope.id) > -1){
                console.log("Present ");
            }

            else{
   if($scope.recentViewed.length > 9){

            console.log("Greater then 10");
            $scope.recentViewed.shift();
            $scope.recentViewed.push({title: $scope.title, id :  $scope.id, arrayImage:$scope.arrayImage});
             localStorage.setItem('viewed', JSON.stringify($scope.recentViewed));

        }
          else{
             $scope.recentViewed.push({title: $scope.title, id :  $scope.id, arrayImage:$scope.arrayImage});
             localStorage.setItem('viewed', JSON.stringify($scope.recentViewed));
                }
                }
    }
 console.log($scope.recentViewed);
}, 5000);



});

<!-- Category Display Page -->

app.controller('categoryCtrl', function($scope, $http, $window) {
    
    $scope.myVar = 0;
    $scope.categoryVar=0;
    $scope.list=$window.localStorage.getItem("List");
    $window.document.location.hash = "Category="+$scope.list;
       console.log($scope.list);
 $http.get("json/categorylist.json").success(function(response)
{
        $scope.lists=response.data;
       console.log($scope.lists);
        $scope.myVar = 1;
});

    $scope.displayProduct = function(id,compare,title){
        $window.localStorage.setItem("id",id);
        $window.localStorage.setItem("compare",compare);
        $window.localStorage.setItem("title",title);
        $window.location.href = '/displayproduct';
};

    $scope.product="";
    $scope.searchproduct = function(){
    console.log($scope.product) ;
    $window.localStorage.setItem("Product",$scope.product);
    $window.location.href = '/products';
};

$scope.searchcategory = function(category){
    console.log(category) ;
    $window.localStorage.setItem("Category",category);
    $window.location.href = '/categories';
};

       $scope.searchlist = function(list){
    console.log(list) ;
    $window.localStorage.setItem("List",list);
    $window.location.href = '/category';
};

    $scope.comaparefalse = function(prodcat){
    $window.localStorage.setItem("Product",prodcat);
    $window.location.href = '/products';
};

});

<!-- Deals Page -->


app.controller('dealsCtrl', function($scope, $http, $window) {

    $scope.myVar = 0;
    $scope.searchdeals = function(categoryId,categoryName){
        $window.localStorage.setItem("categoryId",categoryId);
      $window.localStorage.setItem("categoryName",categoryName);
        $window.location.href = '/displaydeals';
};

      $scope.product="";
$scope.searchproduct = function(){
    console.log($scope.product) ;
    $window.localStorage.setItem("Product",$scope.product);
   $window.location.href = '/products';
};

$scope.comaparefalse = function(prodcat){
    $window.localStorage.setItem("Product",prodcat);
    $window.location.href = '/products';
};

    $scope.searchcategory = function(category){
    console.log(category) ;
    $window.localStorage.setItem("Category",category);
    $window.location.href = '/categories';
};

$scope.searchlist = function(list){
    console.log(list) ;
    $window.localStorage.setItem("List",list);
    $window.location.href = '/category';
};

  $scope.myVar = 1;
});

<!-- Display Deals Page -->


app.controller('displaydealsCtrl', function($scope, $http, $window) {

    $scope.myVar = 0;
    $scope.categoryId=$window.localStorage.getItem("categoryId");
    $scope.categoryName=$window.localStorage.getItem("categoryName");

     $window.document.location.hash = "Category="+$scope.categoryName;

$http.post('/data',{"url":"http://api.datayuge.in/v1/coupons/list_coupons.php?category_id="+$scope.categoryId+"&apikey= "}).success(function(response){

$scope.impoDeals = response.data;
console.log($scope.impoDeals);
});

    $http.post('/data',{"url":"http://api.datayuge.in/v1/coupons/list_stores.php?category_id="+$scope.categoryId+"&apikey= "}).success(function(response){

$scope.stores = response;
console.log($scope.stores);
});


$scope.storeDeals = function(storename){
    $scope.storeDeal = "";
    $scope.dealVar= 0;
    console.log(storename);
    document.getElementById('id01').style.display='block';
    $http.post('/data',{"url":"http://api.datayuge.in/v1/coupons/list_coupons.php?category_id="+$scope.categoryId+"&store_name="+storename+"&apikey= "}).success(function(response){
         $scope.storeDeal = response.data;
         console.log($scope.storeDeal);
        $scope.dealVar= 1;
});
    }



  $scope.product="";
$scope.searchproduct = function(){
    console.log($scope.product) ;
    $window.localStorage.setItem("Product",$scope.product);
   $window.location.href = '/products';
};

$scope.comaparefalse = function(prodcat){
    $window.localStorage.setItem("Product",prodcat);
    $window.location.href = '/products';
};

    $scope.searchcategory = function(category){
    console.log(category) ;
    $window.localStorage.setItem("Category",category);
    $window.location.href = '/categories';
};

$scope.searchlist = function(list){
    console.log(list) ;
    $window.localStorage.setItem("List",list);
    $window.location.href = '/category';
};
     $scope.myVar = 1;
});
