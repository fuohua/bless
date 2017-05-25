//自定义指令repeatFinish
angular.module('voteApp')
.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs, $ngModel) {
      var model = $parse($attrs.fileModel);
      var modelSetter = model.assign;
      $element.bind('change', function(event){
      	
      	var f=$("#file").val();
		 
	        if(f==""){ 
	        	
	        	alert("请上传图片");
	        	return false;
	        }else{  
	       		 if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(f))  
		        {  
		          alert("图片类型必须是.gif,jpeg,jpg,png中的一种")  
		          return false;  
		        }
	        }
        $scope.$apply(function(){
          modelSetter($scope, $element[0].files[0]);
          
        });
        //附件预览
        
           $scope.file = (event.srcElement || event.target).files[0];
         
       	 $scope.getFile();
        
        
         //$(".createpin").removeClass('hide');
      });
    }
  };
}]);

