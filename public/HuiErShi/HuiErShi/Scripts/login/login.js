/*
 *登陆页面的脚本逻辑
 * @Author:马少博 (ma.shaobo@qq.com)
 * @Date: 2017年6月22日13:54:23
 * @Last Modified by: 马少博
 * @Last Modified time:2017年6月22日13:54:25
 */
(function() {
  var app = angular.module("myApp", ["w5c.validator"]);
  window.app = app;
  app.config(["w5cValidatorProvider", function(w5cValidatorProvider) {
    // 全局配置
    w5cValidatorProvider.config({
      blurTrig: true,
      showError: true,
      removeError: true
    });

    w5cValidatorProvider.setRules({
      username: {
        required: "用户名称不能为空"
      },
      password: {
        required: "密码不能为空"
      }
    });
  }]);

  function setCookie(name, value, seconds) {
    seconds = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。
    var expires = "";
    if (seconds != 0) { //设置cookie生存时间
      var date = new Date();
      date.setTime(date.getTime() + (seconds * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expires + "; path=/"; //转码并赋值
  }
  app.controller("validateCtrl", ["$scope", "$http", function($scope, $http) {
    var vm = $scope.vm = {
      showErrorType: "1",
      showDynamicElement: true,
      dynamicName: "dynamicName",
      data: {},
      errorMessage: ""
    };
    var id = null;
    vm.saveinfo = function($event) {
      vm.errorMessage = "";
      $http({
          method: 'POST',
          url: 'http://healthshare.com.cn:80/admin/api/token',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param({
            adminNo: $scope.vm.data.username,
            pwd: $scope.vm.data.password
              // pwd: hex_md5($scope.vm.data.password)
          })
        })
        .success(function(data, xhr) {
          if (xhr == 200) {
            if (data.errorMessage) {
              $scope.errors = data.errorMessage;

              // alert(data.errorMessage);

              // $.alert({
              //   title: "提示",
              //   content: data.errorMessage,
              //   confirmButton: '确定',
              //   backgroundDismiss: false,
              //   confirmButtonClass: 'btn-success',
              //   animation: 'zoom',
              //   closeAnimation: 'scale',
              //   columnClass: 'offset4 col-md-4 col-md-offset-4'
              // });
              $(":submit").attr("disabled", false);
            } else {

              //   "userId": 36,
              //   "token": "0737947964606487390279591774052233608530431821039044416448665402"

              //成功操作
              id = data.userId;
              token = data.token;
              $http({
                  method: 'POST',
                  url: 'http://healthshare.com.cn:80/admin/api/IMConsult/userSig',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  data: $.param({
                    IMUserId: 'USER_MEMBER' + data.userId
                  })
                })
                .success(function(data, xhr) {
                  if (xhr == 200) {
                    setCookie('identifier', 'USER_MEMBER' + id);
                    setCookie('userSig', data);
                    setCookie('token', token);
                    setCookie('adminId', id);
                    //TODO 部署时此处需要修改
                    window.location.href = "HuiErShi.html?hesid=" + id;
                    // window.location.href = "SlideHtml.html?hesid=" + id;
                  }
                }).error(function(response) {
                  $scope.errors = response.errorMessage;

                });
              // TODO  保存COOKIE
              vm.errorMessage = "";
              $scope.vm.data = {};
            }

          }
        }).error(function(response) {
          $scope.errors = response.errorMessage;

        });
    };


    $scope.$watch('vm.data.username', function(newVal, oldVal) {
      $scope.errors = "";
    }, true);
    $scope.$watch('vm.data.password', function(newVal, oldVal) {
      $scope.errors = "";
    }, true);
    //加载完毕后执行
    $scope.$watch("$viewContentLoaded", function() {
      angular.element(".myload").removeClass("myload");
    });
  }]);
})();