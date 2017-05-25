//自定义Service
var ftitAppModule = angular.module('voteApp');

ftitAppModule.factory('fileReader', ["$q", "$log", function($q, $log){
  var onLoad = function(reader, deferred, $scope) {
    return function () {
      $scope.$apply(function () {
        deferred.resolve(reader.result);
      });
    };
  };
  var onError = function (reader, deferred, $scope) {
    return function () {
      $scope.$apply(function () {
        deferred.reject(reader.result);
      });
    };
  };
  var getReader = function(deferred, $scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, $scope);
    reader.onerror = onError(reader, deferred, $scope);
    return reader;
  };
  var readAsDataURL = function (file, $scope) {
    var deferred = $q.defer();
    var reader = getReader(deferred, $scope);		 
    reader.readAsDataURL(file);
    return deferred.promise;
  };
  return {
    readAsDataUrl: readAsDataURL  
  };
}]);


/*
 * var ftitAppModule = angular.module('voteApp', ['infinite-scroll']);
ftitAppModule.factory('Demo', function ($http) {
	    var Demo = function () {
	        this.items = [];
	        this.busy = false;
	        this.page = "";
	    };
	    
	    Demo.prototype.nextPage = function () {
	    	  var _this = this;
	        if (_this.busy) return;
	        _this.busy = true;
	     var   accessToken = "AdnAPd0RFIAFz_L6gBG4b3a874A_FLJ2GddJWhpD5V_vsqAtzgAAAAA";
	      // var   accessToken = "AbkmMS7-nvE9bVoC-jgj7LPpYcrIFLiCWN0eSUpD8ZgahWA37gAAAAA"
	      
	        $http({
				method: 'POST',
				url: 'https://192.168.1.18:443/pinterest/social/get/user/pins.shtml',
			
				dataType: 'json',
				
				params: {
				    "access_token" : accessToken, "result_type": 'json',"cursor":_this.page
				}
			}).then(function success(response) {
				// 请求成功执行代码
				var allpins = response.data.data.data;
					$scope.allpins = allpins;
				console.log(allpins);
				var cursor = response.data.data.page.cursor;
				
				 var items = allpins;
	            for (var i = 0; i < items.length; i++) {
	            	//console.log(_this.items);
	                _this.items.push(items[i]);
	            }

	            _this.busy = false;
	            _this.page = cursor;
				
				//	$scope.cursor = cursor;
				
				 
			}, function error(response) {
				// 请求失败执行代码
		
				console.log('网络出错')
			}.bind(_this)) 

	    };
	
	    return Demo;
	});
*/


