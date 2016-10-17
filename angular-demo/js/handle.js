//这样删除，数据不会动态变化，还是需要用angular提供的ng-click进行操作
$(document).ready(function(){
  $("button#remove").bind("click",function(){
    $(this).parents('tr').remove()
  });
});
