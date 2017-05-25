var app = angular.module('voteApp');
//验证图片加载完成

app.directive('loadSrc', function () {
    return {
        restrict: 'EAC', 
        link: function (scope, element, attrs) {
            element.bind('load', function () { 
               // console.log(123444444444444);
                $('.grid').masonry({
					  itemSelector: '.grid-item',
					 // columnWidth: 250,
					  isFitWidth: true,
					  isAnimated: true, 
					  gutterWidth:4
				});
				$('.grid').masonry('reloadItems');
            });
        }
    };
});
