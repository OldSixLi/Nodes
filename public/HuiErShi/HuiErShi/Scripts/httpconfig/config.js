 /**
  * 设置全局ajax属性(所有的JQ异步请求ajax方法都会通过此方法统一设置header属性)
  *   
  */
 $.ajaxSetup({
   beforeSend: function(request) {
     request.setRequestHeader("authorization", adminId() + '_' + token());
   }
 });


 /**
  * 配置全局http服务(所有的Angularjs异步请求ajax方法都会通过此方法统一设置header属性)
  * 
  */
 app.config(["$httpProvider", function($httpProvider) {
   $httpProvider.defaults.headers.common["authorization"] = headertoken();
 }]);

 function handleError(data, callback) {
   if (data.errorMessage) {
     if (data.errorMessage == "Admin token 非法") {
       //判断如果当前是否需回到登陆页面
       location.replace('Login.html');
     } else {
       if (tool.alert != undefined) {
         tool.alert("提示", data.errorMessage);
       }
     }
   } else {
     callback(data);
   }
 }