var cartApp = angular.module('cartapp', []);

cartApp.controller('cartCtrl',['$scope','$http',function($scope,$http){
	$http.get("json/cart.json")
	.success(function(data){
		$scope.cart=data.carts;
		$scope.totalPrince=function(){
			var total=0;
			angular.forEach($scope.cart,function(item){
				total +=item.quantity*item.prince;
			})
			return total
		}
		$scope.totalNum=function(){
			var total=0;
			angular.forEach($scope.cart,function(item){
				total +=parseInt(item.quantity);
			})
			return total
		}
		
		var findIndex=function(id){
			var index=-1;
		    angular.forEach($scope.cart,function(item,key){
		    	if(item.id===id){
		    		index=key;
		    		return;
		    	}
		    });
		    return index;
		}
		
		$scope.add=function(id){
			var index=findIndex(id);
			if(index!==-1){
				++$scope.cart[index].quantity;
			}	
		}
		
		$scope.reduce=function(id){
			var index=findIndex(id);
			if(index!==-1){
				var item=$scope.cart[index];
				if(item.quantity>1){
					--item.quantity;
				}else{
					var tips=confirm('是否要删除这项产品');
					if(tips){
						$scope.remove(id);
					}
				}
			}	
		}
		
		$scope.remove=function(id){
			var index=findIndex(id);
		    if(index!==-1){
		    	$scope.cart.splice(index,1)
		    }
		}
		
		
		$scope.$watch('cart',function(newValue,oldValue){
			angular.forEach(newValue,function(item,key){
				if(item.quantity<1){
					var tips=confirm('是否要删除这项产品!');
					if(tips){
						$scope.remove(item.id);
					}else{
						item.quantity=oldValue[key].quantity;
					}
				}
			})	
		},true)
		
	})
	
	$scope.today=new Date;
}]);



cartApp.controller('filterCtrl',['$scope','$http','$filter',function($scope,$http,$filter){
	$http.get("json/productFilter.json")
	.success(function(data){
	     	$scope.product=data.products;
	     	$scope.order='-';//默认是降序
	     	$scope.orderType="id";//默认值
	     	
	     	$scope.changeorder=function(type){
	     		$scope.orderType=type;
	     		if($scope.order==='-'){
	     			$scope.order=''
	     		}else{
	     			$scope.order='-'
	     		}
	     	}
	     })
}]);


cartApp.controller('accordionCtrl',['$scope','$http',function($scope,$http){
	$http.get("json/accordion.json")
	.success(function(data){
		$scope.acc=data.acc;
	})
}])






