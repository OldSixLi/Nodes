var domainUrl = "http://omsss06f1.bkt.clouddn.com/";
//获取七牛uptoken　
uploader = Qiniu.uploader({
  runtimes: 'html5,flash,html4',
  browse_button: 'pickfiles', //上传按钮的ID
  container: 'btn-uploader', //上传按钮的上级元素ID
  drop_element: 'btn-uploader',
  max_file_size: '100mb', //最大文件限制　
  dragdrop: false,
  chunk_size: '4mb', //分块大小 
  unique_names: true,
  save_key: true,
  uptoken_func: function() { // 在需要获取uptoken时，该方法会被调用　
    var token = "";
    $.ajax({
      type: "get",
      url: "http://healthshare.com.cn:80/admin/api/qnToken",
      async: false,
      dataType: "json",
      success: function(data) {
        token = data.upToken;
      }
    });
    return token;
  },
  unique_names: false,
  domain: domainUrl, //自己的七牛云存储空间域名
  multi_selection: false, //是否允许同时选择多文件
  //文件类型过滤，这里限制为图片类型
  filters: {
    mime_types: [{
      title: "Image files",
      extensions: "jpg,jpeg,gif,png"
    }]
  },
  auto_start: true,
  init: {
    'FilesAdded': function(up, files) {
      //do something
    },
    'BeforeUpload': function(up, file) {
      //do something
    },
    'UploadProgress': function(up, file) {
      //可以在这里控制上传进度的显示
      //可参考七牛的例子
    },
    'UploadComplete': function() {
      //do something
    },
    'FileUploaded': function(up, file, info) {　
      var json = JSON.parse(info);
      tool.alert("提示", "上传成功");
      //图片压缩处理:限制图片长宽均为200px ,且图片质量为原来75%;
      var imgSrc = domainUrl + json.key;
      $("#img").attr("src", imgSrc);
      $("[name='iconUrl']").val(imgSrc);
    },
    'Error': function(up, err, errTip) {
      tool.alert("提示", errTip);
    },
    'Key': function(up, file) {
      return file.name;
    }
  }
});　
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
(function() {
  var app = angular.module("myApp", ["w5c.validator"]);
  window.app = app;
  //配置验证规则
  app.config(["w5cValidatorProvider", function(w5cValidatorProvider) {
    // 全局配置
    w5cValidatorProvider.config({
      blurTrig: true,
      showError: true,
      removeError: true
    });

    w5cValidatorProvider.setRules({
      realName: {
        required: "请输入用户登录名"
      },
      mobile: {
        required: "请输入密码",
        pattern: "手机号码格式输入不正确"
      },
      txtUserNum: {
        required: "请输入会员编号"
      },
      nationality: {
        required: "请选择民族"
      },
      job: {
        required: "请输入职业"
      },
      idNo: {
        required: "请输入身份证号",
        pattern: "身份证号码格式输入不正确"
      },
      contactAddress: {
        required: "请输入地址"
      }
    });
  }]);
  // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
  // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
  // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
  // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
  // 控制器
  //TODO：饮食习惯、运动习惯、压力状况 没有相关的接口。编号，所属不确定
  app.controller("validateCtrl", ["$scope", "$http", function($scope, $http) {
    var vm = $scope.vm = {
      entity: {} //用来存放页面数据
    };

    var urlObj = new UrlSearch();
    if (urlObj.id) {
      var userid = urlObj.id; //获取当前用户的ID

      $http.get(BasicUrl + "vip/" + userid).success(function(data) {
        if (data != null && data != "" && data != "null" && data.id) {
          $scope.vm.entity.vipEntity = data;
          $scope.vm.entity.todo = "TODO";
          // $scope.vm.vipcards = data.vipcards;
          // $scope.vm.dataLengths = data.vipcards.length;
        } else {
          // $scope.vm.dataLengths = false;
          // tool.alert("提示", "不存在此用户！");
        }
      }).error(function(data, header, config, status) {

        //处理响应失败
        tool.alert("提示", "获取用户数据出错！");
        window.history.back(-1); //回退至上一页面
      });

      //用户信息展示
      $http.get(BasicUrl + "user/" + userid).success(function(data) {
        if (data != null && data != "" && data != "null" && data.id) {
          $scope.userData = data;
          // $scope.vm.entity.vipcards = data.vipcards;
          // $scope.vm.vipcards = data.vipcards;
          // $scope.vm.dataLengths = data.vipcards.length;

        } else {
          // $scope.vm.dataLengths = false;
          // tool.alert("提示", "不存在此用户！");
        }
      }).error(function(data, header, config, status) {
        // tool.alert("提示", "获取用户数据出错111！");
        // window.history.back(-1); //回退至上一页面
      });

      // /vip/20/vipCard

      $http.get(BasicUrl + "vip/" + userid + "/vipCard").success(function(data) {
        if (data != null && data != "" && data != "null") {
          // $scope.userData = data;
          $scope.vm.entity.vipcards = data;

          $scope.vm.dataLengths = data.length;

        } else {
          $scope.vm.dataLengths = false;
          // tool.alert("提示", "不存在此用户！");
        }
      }).error(function(data, header, config, status) {
        // tool.alert("提示", "获取用户数据出错111！");
        // window.history.back(-1); //回退至上一页面
      });

    } else {
      tool.alert("提示", "当前页面未获取到数据！");
      window.history.back(-1);
    }
    // 保存信息
    vm.saveinfo = function($event) {
      $(":submit").attr("disabled", true);
      vm.entity.todo = "1";
      $http({
          method: 'PATCH',
          url: url = BasicUrl + "vip/" + urlObj.id,
          data: $('[name="validateForm"]').serialize(),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .success(function(data, xhr) {
          if (xhr == 200) {
            if (data.errorMessage) {
              tool.alert("提示", data.errorMessage);
              //刷新当前页面.
              window.location.reload();
            } else {
              tool.alert("提示", "保存成功!");
              $(":submit").attr("disabled", false);
              window.location.reload();
            }
          } else {
            tool.alert("提示", "保存失败,请重试!");
            $(":submit").attr("disabled", false);
          }
        }).error(function(response) {
          if (response && response.errorMessage) {
            tool.alert("提示", response.errorMessage);
            $(":submit").attr("disabled", false);
          }
        });
    };
    //点击变为已完成
    $scope.activeCard = function(id) {
      tool.confirm(
        "提示",
        "确认激活此会员卡？",
        function() {
          $.ajax({
            type: "POST",
            // user/1/activation
            url: BasicUrl + "user/" + id + '/activation',
            data: {
              adminId: 1,
              userVipCardId: id
            },
            dataType: "json",
            error: function(response) {
              if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse(response.responseText).errorMessage) {
                tool.alert("提示", JSON.parse(response.responseText).errorMessage);
              }
            },
            complete: function(xhr, textStatus) {
              if (xhr.status == 200) {

                if (xhr.responseText && JSON.parse(xhr.responseText).errorMessage) {
                  tool.alert("提示", JSON.parse(xhr.responseText).errorMessage);
                } else {

                  tool.alert("提示", "激活成功", function() {
                    window.location.reload();
                  });
                }
              }
            }
          });
        },
        function() {});
    }


    //加载完毕后再显示 
    $scope.$watch("viewContentLoaded", function() {
      angular.element(".myload").removeClass("myload");
    });
  }]);
})();