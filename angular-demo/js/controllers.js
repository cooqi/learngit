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

cartApp.controller('formCtrl',['$scope','$http',function($scope,$http){
	$http.get("json/form.json")
	.success(function(data){
		$scope.hobby=data.hobby
	});
	
	$scope.data={
		//默认爱好数据
		hobbise:[1,2],
		
		//默认city数据
		city:'武汉'
	}
	$scope.toggleHobby=function(id){
		var index=$scope.data.hobbise.indexOf(id);
		if(index==-1){
			$scope.data.hobbise.push(id)
		}else{
			$scope.data.hobbise.splice(index,1)
		}
		console.log($scope.data.hobbise)
	}
	
	$http.get("json/city.json")
	.success(function(data){
		$scope.cities=data.cities;
	});
	
	console.log($scope.cities)
	
}])


cartApp.controller('todoListCtrl',['$scope',function($scope){
	$scope.todolist=['nihao','shijie'];
	$scope.add=function(){
		$scope.todolist.push($scope.txt);   //表单数据插入todolist
		$scope.txt="";   //清空当前表单
		return false;	//阻止表单提交
	}
	$scope.del=function(index){
		$scope.todolist.splice(index,1);	//清除当前选中数据
	}
	$scope.delAll=function(){
		$scope.todolist=[];
	}
}])



