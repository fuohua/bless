//定义主模块并注入依赖
angular.module("voteApp", ["ngRoute"]);

//路由配置
angular.module("voteApp").config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/player/list", {
		templateUrl: "tmpl/player/list.html",
		controller: playerListCtrl
	}).when("/player/pins/:playerId", {
		templateUrl: "tmpl/player/pins.html",
		controller: playerViewCtrl
	}).when("/player/likes", {
		templateUrl: "tmpl/player/likes.html",
		controller: playerAddCtrl
	}).when("/player/add", {
		templateUrl: "tmpl/player/add.html",
		controller: playerAddCtrl
	}).when("/player/pins", {
		templateUrl: "tmpl/player/view.html",
		controller: playerPinsCtrl
	}).otherwise({
		redirectTo: "/player/list"
	});
}]);
