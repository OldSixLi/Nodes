 /**
  * 配置http服务
  * 
  */
 app.config(["$httpProvider", function($httpProvider) {
   $httpProvider.defaults.headers.common["authorization"] = headertoken();
   console.log($httpProvider.defaults.headers.common);
 }]);