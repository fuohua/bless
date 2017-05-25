var ftitAppModule = angular.module('voteApp', ['infinite-scroll']);

	
	// 创建后台数据交互工厂
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
	