$(function() {
  //初始化时间控件
  // $(".start_end_time").datetimepicker();
  tool.changeSelect($("#balanceSlt"), false);

  $("#sel_menu2").select2({
    tags: true,
    maximumSelectionLength: 10　
  });
});
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
      name: {
        required: "用户名称不能为空"
      },
      spell: {
        required: "拼音名不能为空"
      },
      itemId: {
        required: "项目缩写不能为空"
      },
      description: {
        required: "项目说明不能为空"
      }
    });
  }]);
  app.controller("validateCtrl", ["$scope", "$http", function($scope, $http) {
    var vm = $scope.vm = {
      showErrorType: "1",
      showDynamicElement: true,
      dynamicName: "dynamicName",
      data: {}
    };
    var request = new UrlSearch();
    $scope.projectId = request.id ? request.id : null;
    if ($scope.projectId != null) {
      vm.show_error = true;
      $scope.isShow = false; //显示修改按钮 
      var url = BasicUrl + "item/" + $scope.projectId;
      $http.get(url).success(function(data) {
        if (data != null && data != "" && data != "null" && data.itemId) {
          $scope.vm.data = data;
          $scope.vm.data.todo = "TODO";
          $scope.type = data.type;
        } else {
          tool.alert("提示", "请求数据出错，请重试！");
        }
      }).error(function(data, header, config, status) {
        //处理响应失败
        tool.alert("提示", "获取用户数据出错！");
        window.history.back(-1); //回退至上一页面
      });

    } else {
      $scope.isShow = true; //显示新增按钮
    }
    vm.saveinfo = function($event) {
      alert($("#sel_menu2").val());
      console.log($("#sel_menu2").val());
      $(":submit").attr("disabled", true);
      var radioVal = $('input:radio[name=type]:checked').val();
      if (!radioVal) {
        tool.alert("提示", "请选择项目类型");
        return false;
      }

      if (radioVal == "1") {
        if (!$("#txtMinReference").val() || !$("#txtUnit").val() || !$("#txtMaxReference").val()) {
          tool.alert("提示", "请完善数据后再进行提交");
          return false;
        }

      }
      if (radioVal == "4") {
        if (!$("#subItemName").val() || !$("#txtUnit").val() || !$("#txtMinReference2").val() || !$("#txtMaxReference2").val()) {
          tool.alert("提示", "请完善数据后再进行提交");
          return false;
        }

      }
      $http({
          method: 'POST',
          url: BasicUrl + "item",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $("[name='validateForm']").serialize()
        })
        .success(function(data, xhr) {
          if (xhr == 200) {
            //成功操作 
            tool.alert("提示", "添加成功!", function() {
              window.history.back(-1);
            });
            //回退至上一页面 
          }
        }).error(function(response) {
          if (response != null && response.errorMessage != null) {
            tool.alert("提示", response.errorMessage);
          }
          $(":submit").attr("disabled", false);
        });
    };

    vm.deleteProject = function() {
      var id = $scope.projectId;
      tool.confirm(
        "提示",
        "确认删除当前项目？",
        function() {
          //用户点击确认按钮时操作
          $.ajax({
            type: "DELETE",
            url: BasicUrl + "item/" + id,
            dataType: "json",
            error: function(response) {
              if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse(response.responseText).errorMessage) {
                tool.alert("提示", JSON.parse(response.responseText).errorMessage);
              }
            },
            complete: function(xhr, textStatus) {
              if (xhr.status == 200) {
                tool.alert("提示", "删除成功", function() {});
                window.location.href = "ProjectList.html";
              }
            }
          });
        },
        function() {
          //用户点击取消按钮时操作
        });

    };

    vm.editinfo = function() {
      var len = $(".w5c-error").length;
      if (len) {
        tool.alert("提示", "请修改数据后再进行提交！");
        return false;
      }
      //修改按钮操作 
      var id = $scope.projectId;

      if (radioVal == "1") {
        if (!$("#txtMinReference").val() || !$("#txtUnit").val() || !$("#txtMaxReference").val()) {
          tool.alert("提示", "请完善数据后再进行提交");
          return false;
        }

      }
      if (radioVal == "4") {
        if (!$("#subItemName").val() || !$("#txtUnit").val() || !$("#txtMinReference2").val() || !$("#txtMaxReference2").val()) {
          tool.alert("提示", "请完善数据后再进行提交");
          return false;
        }

      }

      $http({
          method: 'PATCH',
          url: BasicUrl + "item/" + id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $("[name='validateForm']").serialize()
        })
        .success(function(data, xhr) {
          if (xhr == 200) {
            //成功操作 
            tool.alert("提示", "已保存修改！", function() {
              //刷新当前页面.
              window.location.reload();
            });
            //回退至上一页面 
          } else {
            tool.alert("提示", "修改失败！");
          }
        }).error(function(response) {
          if (response != null && response.errorMessage != null) {
            tool.alert("提示", response.errorMessage);
          }
          $(":submit").attr("disabled", false);
        });
    };

    //加载完毕后再显示 
    $scope.$watch("viewContentLoaded", function() {
      angular.element(".myload").removeClass("myload");
    });
  }]);
})();