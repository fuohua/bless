
	/*var href = window.parent.location.href;
	var hrefArray = href.split("=");
	var accessToken = hrefArray[1];
	console.log(accessToken);*/
//var accessToken  = "AdnAPd0RFIAFz_L6gBG4b3a874A_FLJ2GddJWhpD5V_vsqAtzgAAAAA";
var accessToken  = "AbkmMS7-nvE9bVoC-jgj7LPpYcrIFLiCWN0eSUpD8ZgahWA37gAAAAA";


function playerListCtrl($scope, $http ,$location) {
    	
	
	$http({
		method: 'POST',
		url: 'https://192.168.1.18:443/pinterest/social/get/user/boards.shtml',
		dataType: 'json',
		params: {
		    	"access_token" : accessToken,
			result_type: 'json'
		}
	}).then(function successCallback(response) {
		// 请求成功执行代码
		console.log(response);
		var boards = response.data.data.data;
		$scope.players = boards;
		
		var message = response.data.data.message;
		if(message){
			console.log("请稍后再试")
		}

	}, function errorCallback(response) {
		// 请求失败执行代码

		console.log('网络出错')
	});

	$http({
		method: 'POST',
		url: 'https://192.168.1.18:443/pinterest/social/get/user/info.shtml',
		dataType: 'json',
		params: {
		    	"access_token" : accessToken,
			result_type: 'json'
		}
	}).then(function successCallback(response) {
		// 请求成功执行代码
		console.log(response);
		var users = response.data.data.data;
		$scope.uesrs = users;
		console.log(users);
		
	}, function errorCallback(response) {
		// 请求失败执行代码

		console.log('网络出错')
	});
		/*弹出相册弹窗*/
		$scope.changeEdit = function(){
			console.log(this.player.id);
			$scope.broadid = this.player.id ;
			$("#editbroads").removeClass('hide');
			
		};
		//隐藏相册弹窗
		$scope.hidebroads=function(){
			$("#editbroads").addClass('hide');
			
		};
		
		/*编辑相册*/
		$scope.submitButtons=function( id , name,description){
			console.log(id)	;
			console.log(name);
			console.log(description);
		
			$http({
				method: 'POST',
				url: 'https://192.168.1.18:443/pinterest/social/edit/user/board.shtml',
				dataType: 'json',
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8'
				},
				params: {
				    "access_token" : accessToken, result_type: 'json',"board" :id, 'name': name, "description" : description
				}
			}).then(function success(data) {
				console.log(data);
				$location.path("#/player/list");
				
			},function error(data){
					// 请求失败执行代码
					console.log('网络出错')
			});
		
		};
	//创建相册
	$scope.submitButton = function(shyj){
		$http({
			method: 'POST',
			url: 'https://192.168.1.18:443/pinterest/social/create/board.shtml',
			dataType: 'json',
			params: {
			    "access_token" : accessToken, result_type: 'json','name': shyj, "description" : ""
	
			}
		}).then(function success(data) {
		
			$location.path("#/player/list");
			
		},function error(data){
				// 请求失败执行代码
				console.log('网络出错')
		});
	}
	
	//删除相册
	$scope.deletebroads=function(id){
			console.log(id)
		$http({
			method: 'POST',
			url: 'https://192.168.1.18:443/pinterest/social/delete/user/board.shtml',
			dataType: 'json',
			params: {
			    "access_token" : accessToken, result_type: 'json',"board" : id
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			$location.path("#/player/list");
			
		}, function errorCallback(response) {
			// 请求失败执行代码
	
			console.log('网络出错')
		});
		
		
		
	}
	
}

//allpins 

function playerPinsCtrl($scope, $http, $location,fileReader) {
			$http({
				method: 'POST',
				url: 'https://192.168.1.18:443/pinterest/social/get/user/info.shtml',
				dataType: 'json',
				params: {
				    "access_token" : accessToken, result_type: 'json'
				}
			}).then(function success(response) {
				// 请求成功执行代码
					//console.log(response);
					if(status="200"){
					    var users = response.data.data.data;
					    $scope.uesrs = users;
					    console.log(users)
					}
			}, function error(response) {
				// 请求失败执行代码
				console.log('网络出错')
			});

			
			var _thispage = "";
			
			datepage(_thispage);
			
			var _thisallpins = [];
			
			window.stop = true;
			function datepage (cursor){
				if(!window.stop){
					return;
				}
				window.stop = false;
				$http({
				
					method: 'POST',
					url: 'https://192.168.1.18:443/pinterest/social/get/user/pins.shtml',
					//url:'../../data/dataplayers.json',
					dataType: 'json',
					params: {
					    "access_token" : accessToken, "result_type": 'json',"cursor":_thispage
					}
				}).then(function success(response) {
					// 请求成功执行代码
					var allpins = response.data.data.data;
						$scope.allpins = allpins;
						
						console.log(allpins);
						 var cursor = response.data.data.page.cursor;
						$scope.cursor = cursor;
					
					for (var i = 0; i < allpins.length; i++) {
		            	//console.log(_this.items);
		                _thisallpins.push(allpins[i]);
		            }
					$scope.allpins=_thisallpins;
		            _thispage = cursor;
		            window.stop = true;
					 //加载完成
				}, function error(response) {
					// 请求失败执行代码
					console.log('网络出错')
				});
			
			};
			//滚动加载
			function loaata(cursor){
				if(pagedata =  false){
					return;
				}
			    totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
			  
			   console.log(totalheight)
			   
			   console.log($(document).height())
			    if ($(document).height() <= totalheight+600) {
			    	
			    	cursor =  $("#pagedata").val();
					console.log(cursor);
					if(cursor && cursor != ''){
						datepage(cursor);
					}
					
			     } 
			} 
			
			var time;
			
			$(window).scroll( function() {
				
				var lod = Date.now();
				console.log((lod - time));
				
				if(!time){
					time = Date.now();
				}else if((lod - time) > 300){
					time = undefined;
					loaata();
				}
			    
			}); 
		
		/* 上传pin*/
		$scope.getFile = function () {
			
            fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
                  $scope.imageSrc = result;
                  
               		console.log($scope.file)
               		
               		$(".sample2").img2blob({
						watermark: '我是水印',
						fontStyle: 'Microsoft YaHei,Arial',
						fontSize: '18', // px
						fontColor: '#fff', // default 'black'
						fontX: 100, // The x coordinate where to start painting the text
						fontY: 180 // The y coordinate where to start painting the text
					});
               
               // 组装表单数据
                var postData = {

                    file: $scope.file,
                    
                  token:'AC1F1CD9404D4D8667B7CF84E42A51C2'

                };
                var promise = postMultipart('https://192.168.1.18:443/file/upload.shtml', postData); 
                
				promise.then(function successCallback(data){
					console.log(data);
					var	code = data.data.data.code;
					
					console.log(code);
					
					var  pinurl = "/file/image/"+code+"/-1"
						console.log(pinurl);
				 	$scope.imageSrcs = pinurl;
					
					
					$(".createpin").removeClass('hide');
					$scope.getUserBoards()
					
				}, function errorCallback(data) {
					// 请求失败执行代码
			
					console.log('网络出错')
				});
                function postMultipart(url, data) {
                    var fd = new FormData();
                    angular.forEach(data, function(val, key) {
                        fd.append(key, val);
                    });
                    var args = {
                        method: 'POST',
                        url: url,
                        data: fd,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity,
                    };
                    return $http(args);
                }   
              }); 
        };
        
        $scope.thisId=function( id ,$index){
        	$scope.boardId = id;
	      	var vm = this;
	       var ul = $(".pinul").find(".hovebg").eq($index);
	      	console.log(ul);
	      	
	      	ul.addClass("zhende").siblings().removeClass("zhende");
        }
        $scope.getUserBoards=function(){
        	
        	$http({
				method: 'POST',
				url: 'https://192.168.1.18:443/pinterest/social/get/user/boards.shtml',
				dataType: 'json',
				params: {
				    "access_token" : accessToken, result_type: 'json'
				}
			}).then(function successCallback(response) {
				// 请求成功执行代码
				console.log(response);
				var boards = response.data.data.data;
				$scope.players = boards;
				
				var message = response.data.data.message;
				
				if(message){
					console.log("请稍后再试")
				}
		
			}, function errorCallback(response) {
				// 请求失败执行代码
		
				console.log('网络出错')
			});
        	
       }
         /**创建一个pin**/
        $scope.createPin=function(boardId,textPin,imageSrcs){
        	console.log(boardId);
        	console.log(textPin);
        	console.log(imageSrcs);
        	
         //	var urls = "http://img0.imgtn.bdimg.com/it/u=907950299,839007147&fm=214&gp=0.jpg";
        	
        	$http({
				method: 'POST',
				url: 'https://192.168.1.18:443/pinterest/social/create/pins.shtml',
				dataType: 'json',
				params: {
				    "access_token" : accessToken,
					"result_type": 'json',
					"board" : boardId,
					"note" : textPin,//(必填)
					"image_url" : imageSrcs //(必填，创建的图片地址)	
				}
			}).then(function successCallback(response) {
				// 请求成功执行代码
				console.log(response)
				if(response.data.code= "000"){
					//$scope.closePin();
					location.reload()
				}
			}, function errorCallback(response) {
				// 请求失败执行代码
		
				console.log('网络出错')
			});
  
        }
        
        /* 关闭pin*/
        $scope.closeAddpin= function(){
        	$(".createpin").addClass('hide');
        }
		
	/* 弹窗broad*/
	$scope.tanbEdit=function(pinId , boards, boardsname,imgurl){
		$(".edithide").removeClass('hide');
		$scope.pinId=pinId;
		$scope.boardId=boards;
		$scope.pinname=boardsname;
		$scope.imgurl= imgurl;
	 console.log(pinId);
	}
	
	/**编辑用户board**/
	$scope.userbEdit=function(boardId){
	
	  var boardsname = $(".pinname").html();
	  var description =$("#pinFormDescription").val();
	  
		$http({
			method: 'POST',
			url: 'https://192.168.1.18:443/pinterest/social/edit/user/board.shtml',
			dataType: 'json',
			params: {
			    "access_token" : accessToken,
				"result_type": 'json',
				"board" : boardId,
				"name" : boardsname,
				"description" : description
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
		//	console.log(response)
			if(response.data.code= "000"){
				$scope.closePin();
			}
		}, function errorCallback(response) {
			// 请求失败执行代码
	
			console.log('网络出错')
		});
	}
	/* 弹窗pin*/
	$scope.tanPEdit=function(pinId , boards, boardsname,imgurl,imglink){
		$(".pinshow").removeClass('hide');
		$scope.pinId=pinId;
		$scope.boardId=boards;
		$scope.pinname=boardsname;
		$scope.imgurl= imgurl;
		$scope.imglink=imglink;
		
	}
	/**编辑用户pin**/
	$scope.userpinEdit=function( pinId , Id ,note ,linkurl){
		
		console.log(pinId);
		console.log(Id);
		console.log(note);
		console.log(linkurl);
		
		var boardId = $(".pinid").val();
		console.log(boardId);
		$http({
			method: 'POST',
			url: 'https://192.168.1.18:443/pinterest/social/edit/user/pin.shtml',
			dataType: 'json',
			params: {
			    "access_token" : accessToken,
				"result_type": 'json',
				"pin" : pinId,
				"board" : boardId,
				"note" : note,
				"link" : ""
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			
			console.log(response)
			if(response.data.code= "000"){
				//$scope.closesPin();
				//location.reload()
			}
			
		}, function errorCallback(response) {
			// 请求失败执行代码
	
			console.log('网络出错')
		});
	}
	$scope.closePin=function(){
		$(".edithide").addClass('hide');
	}
	$scope.closesPin=function(){
		$(".pinshow").addClass('hide');
	}
	//编辑图片中请求相册列表
	$scope.boardsname=function(){
		$('.Dropdown2').addClass( 'visible');
		$http({
			method: 'POST',
			url: 'https://192.168.1.18:443/pinterest/social/get/user/boards.shtml',
			dataType: 'json',
			params: {
			    "access_token" : accessToken,
				"result_type": 'json'
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			var boardnames= response.data.data.data;
			$scope.boardnames = boardnames;
			console.log($scope.boardnames);
		}, function errorCallback(response) {
			// 请求失败执行代码
			console.log('网络出错')
		});
		
	}
	//选择
	
	$(".sectionItems").on('click','.item', function(){
		
		var name =	$(this).find('.name').text();
		var id =	$(this).find('.id').val();
		$(".pinname").html(name);
		$(".pinid").val(id);
	
		$('.Dropdown2').removeClass('visible');
	})
	
}

function playerAddCtrl($scope, $http, $routeParams) {
	console.log($routeParams)
	console.log(1111)
	
 		
}

function create($scope, $http, $location, voteSer) {
	
	$scope.clicknam=function(){
		
		console.log(222)
		
	}
}

/* asda*/

function playerViewCtrl($scope, $http, $routeParams,$location) {
	
	$scope.boraddata=$routeParams;
	var board = $routeParams.playerId;
	
	
	$http({
		method: 'POST',
		url: 'https://192.168.1.18:443/pinterest/social/get/user/info.shtml',
		dataType: 'json',
		params: {
			"access_token" : accessToken, result_type: 'json'
		}
	}).then(function success(response) {
	
		// 请求成功执行代码
			console.log(response);
			if(status="200"){
				var users = response.data.data.data;
				$scope.uesrs = users;
				
			}
		
	}, function error(response) {
		// 请求失败执行代码
		console.log('网络出错')
	});
	
	$http({
		method: 'POST',
		url: 'https://192.168.1.18:443/pinterest/social/get/board/info.shtml',
		dataType: 'json',
		params: {
		    "access_token" : accessToken, result_type: 'json','board': board
		}
	}).then(function success(data) {
		var boardInfo  = data.data.data.data;
		
		console.log(boardInfo)
		
		$scope.boardInfo = boardInfo;
		
	},function error(data) {
			// 请求失败执行代码
			console.log('网络出错')
	});
	
/*	$http({
		method: 'POST',
		url: 'https://192.168.1.18:443/pinterest/social/get/board/pins.shtml',
		dataType: 'json',
		params: {
		    "access_token" : accessToken, result_type: 'json','board': board
		}
	}).then(function success(data) {
		
		var pins  = data.data.data.data;
		console.log(pins)
		$scope.pins = pins;
	},function error(data) {
			// 请求失败执行代码
			console.log('网络出错')
	});*/
	var _thispage = "";
			
			datepage(_thispage);
			
			var _thisallpins = [];
			
			window.stop = true;
			function datepage (cursor){
				if(!window.stop){
					return;
				}
				window.stop = false;
				$http({
				
					method: 'POST',
					url: 'https://192.168.1.18:443/pinterest/social/get/board/pins.shtml',
					//url:'../../data/dataplayers.json',
					dataType: 'json',
					params: {
					    "access_token" : accessToken, "result_type": 'json','board': board, "cursor":_thispage
					}
				}).then(function success(response) {
					// 请求成功执行代码
					var pins = response.data.data.data;
						$scope.pins = pins;
						
						console.log(pins);
						 var cursor = response.data.data.page.cursor;
						$scope.cursor = cursor;
					
					for (var i = 0; i < pins.length; i++) {
		            	//console.log(_this.items);
		                _thisallpins.push(pins[i]);
		            }
					$scope.pins=_thisallpins;
		            _thispage = cursor;
		            window.stop = true;
					 //加载完成
				}, function error(response) {
					// 请求失败执行代码
					console.log('网络出错')
				});
			
			};
			//滚动加载
			function loaata(cursor){
				if(pagedata =  false){
					return;
				}
			    totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
			  
			   console.log(totalheight)
			   
			   console.log($(document).height())
			    if ($(document).height() <= totalheight+600) {
			    	
			    	cursor =  $("#pagedata").val();
					console.log(cursor);
					if(cursor && cursor != ''){
						datepage(cursor);
					}
					
			     } 
			} 
			
			var time;
			
			$(window).scroll( function() {
				
				var lod = Date.now();
				console.log((lod - time));
				
				if(!time){
					time = Date.now();
				}else if((lod - time) > 300){
					time = undefined;
					loaata();
				}
			    
			}); 
	
	
	/* 弹窗broad*/
	$scope.tanbEdit=function(pinId , boards, boardsname,imgurl){
		$(".pinshow").removeClass('hide');
		$scope.pinId=pinId;
		$scope.boardId=boards;
		$scope.pinname=boardsname;
		$scope.imgurl= imgurl;
		
	}
	
	/**编辑用户board**/
	$scope.userbEdit=function(boardId){
	
	  var boardsname = $(".pinname").html();
	  var description =$("#pinFormDescription").val();
	  
	  	console.log(boardId);
	  console.log(boardsname);
	  console.log(description);
		$http({
			method: 'POST',
			url: 'https://192.168.1.18:443/pinterest/social/edit/user/board.shtml',
			dataType: 'json',
			params: {
			    "access_token" : accessToken,
				"result_type": 'json',
				"board" : boardId,
				"name" : boardsname,
				"description" : description
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			console.log(response)
			if(response.data.code= "000"){
			//	$scope.closePin();
			}
		}, function errorCallback(response) {
			// 请求失败执行代码	
			console.log('网络出错')
		});
	}
	/* 弹窗pin*/
	$scope.tanPEdit=function(pinId , boards, boardsname,imgurl,imglink){
		$(".edithide").removeClass('hide');
		$scope.pinId=pinId;
		$scope.boardId=boards;
		$scope.pinname=boardsname;
		$scope.imgurl= imgurl;
		$scope.imglink=imglink;
		console.log(pinId);
	}
	//选择
	
	$(".sectionItems").on('click','.item', function(){
		var name =	$(this).find('.name').text();
		var id =	$(this).find('.id').val();
		$(".pinname").html(name);
		$(".pinid").val(id);
		$('.Dropdown2').removeClass('visible');
	})
	//编辑图片中请求相册列表
	$scope.boardsname=function(){
		$('.Dropdown2').addClass( 'visible');
		$http({
			method: 'POST',
			url: 'https://192.168.1.18:443/pinterest/social/get/user/boards.shtml',
			dataType: 'json',
			params: {
			    "access_token" : accessToken,
				"result_type": 'json'
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			var boardnames= response.data.data.data;
			$scope.boardnames = boardnames;
			console.log(boardnames);
			
		}, function errorCallback(response) {
			// 请求失败执行代码
			console.log('网络出错')
		});
		
	}
	
	/**编辑用户pin**/
	$scope.userpinEdit=function( pinId , Id ,note ,linkurl){
		
		console.log(pinId);
		console.log(Id);
		console.log(note);
		console.log(linkurl);
		
		var boardId = $(".pinid").val();
		console.log(boardId);
		$http({
			method: 'POST',
			url: 'https://192.168.1.18:443/pinterest/social/edit/user/pin.shtml',
			dataType: 'json',
			params: {
			    "access_token" : accessToken,
				"result_type": 'json',
				"pin" : pinId,
				"board" : boardId,
				"note" : note,
				"link" : ""
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			
			console.log(response)
			if(response.data.code= "000"){
				//$scope.closesPin();
				//$location.path("#/player/pin");
				//	location.reload()
			}
			
		}, function errorCallback(response) {
			// 请求失败执行代码
	
			console.log('网络出错')
		});
	}
	$scope.closesPin=function(){
		$(".pinshow ").addClass('hide');
	}
	$scope.closePin=function(){
		$(".edithide").addClass('hide');
	}
	
	
	  //删除pin
	  
	  $scope.delectPin=function(pinId){
	  	console.log(pinId)
	  	$http({
			method: 'POST',
			url: 'https://192.168.1.18:443/pinterest/social/delete/user/pin.shtml',
			dataType: 'json',
			params: {
			    	"access_token" : accessToken,
				"result_type": 'json',"pin" : pinId
			}
		}).then(function successCallback(response) {
			// 请求成功执行代码
			console.log(response)
			if(response.data.code= "000"){
				console.log($location)
				//$scope.closesPin();
				location.reload()
			}
		}, function errorCallback(response) {
			// 请求失败执行代码
			console.log('网络出错')
		});
	  	
	  }
	  
}
