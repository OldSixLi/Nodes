$(function() {
  //设置类型为soprt和food两种类型，每次移动前判断是否存在此类型
  $('#multiselect').multiselect({
    beforeMoveToRight: function($left, $right, $options) {
      if ($options.length > 1) {
        // tool.alert("提示", "每次仅可选择一个专家");
        if ($right.find("option").length > 0) {
          tool.alert("提示", "每人最多选择两位专家进行咨询！");
          return false;
        }
      }
      var str = [];
      var obj = {};
      var type = $options.attr('data-type'); //从$option获取当前类型
      if ($right.find("option").length > 0) {
        $right.find("option").each(function() {
          str.push($(this).text());
          obj[$(this).attr('data-type')] = true;
        });
        if (str.length == 2) {
          tool.alert("提示", "每人最多选择两位专家进行咨询！");
          return false;
        } else {
          if (obj[type] && type == "2") {
            tool.alert("提示", "每人只能选择一位运动专家进行咨询！");
            return false;
          } else if (obj[type] && type == "3") {
            tool.alert("提示", "每人只能选择一位饮食专家进行咨询！");
            return false;
          } else {
            return true;
          }
        }
      } else {
        return true;
      }
    }

  });
});

$("#modal").modal({　
  show: false, //默认是否展示
  backdrop: false, //隐藏背景
  keyboard: false
});


function formatRepo(repo) {
  return repo.realName;
}

function formatRepoSelection(repo) {
  return repo.realName;
}
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
  /**
   * 获取会籍顾问
   * @returns
   */
  $http.get(BasicUrl + "admin/advisers").success(function(data) {
    if (data != null && data != "" && data != "null") {
      $scope.adviseOptions = data;
      tool.changeSelect($("#adviserList"), true);
    }
  });

  /**
   * 获取专家列表
   * @returns
   */
  var url = BasicUrl + "admin/experts";
  $http.get(url).success(function(data) {
    if (data != null && data != "" && data != "null") {
      $scope.options = data;
    }
  });

  //获取当前传入的参数
  var urlObj = new UrlSearch();
  if (urlObj.id) {
    $scope.userid = urlObj.id;
    var url = BasicUrl + "vip/" + urlObj.id;
    /**
     * 获取当前用户的具体信息
     * @returns
     */
    $http.get(url).success(function(data) {
      if (data != null && data != "" && data != "null" && data.id) {
        $scope.data = data;
        $scope.adviserId = data.adviser.id;
      } else {
        data.errorMessage && tool.alert("提示", data.errorMessage);
      }
    }).error(function(data, header, config, status) {
      // data.errorMessage
      //处理响应失败
      tool.alert("提示", "获取数据出错,请重试或联系网站管理员。");
      window.location.href = "MemberList.html";
    });

    /**
     * 获取当前用户汇总信息
     * @returns
     */
    var infoUrl = BasicUrl + "vip/" + urlObj.id + "/summary"
    $http.get(infoUrl).success(function(healthyData) {
      if (healthyData != null && healthyData != "" && healthyData != "null") {
        $scope.vipInfo = healthyData;
      } else {
        healthyData.errorMessage && tool.alert("提示", healthyData.errorMessage);
      }
    }).error(function(data) {
      tool.alert("提示", "获取数据出错,请重试或联系网站管理员。");
      window.location.href = "MemberList.html";
    });

    /**
     * 获取会员报告相关信息
     * @returns
     */
    //  http://healthshare.com.cn:80/admin/api/api-docs/../IMConsult?userId=1&&&page=0&pageNum=100
    // $scope.adviser = $scope.data.adviser;
    $http.get(BasicUrl + "IMConsult?userId=" + urlObj.id + "&page=0&pageNum=100").success(function

      (healthyData) {
        if (healthyData != null && healthyData != "" && healthyData != "null") {
          $scope.reportInfo = healthyData;
        } else {
          if (healthyData.errorMessage) {
            tool.alert("提示", healthyData.errorMessage);
          }
        }
      })

  } else {
    // tool.alert("提示", "获取数据出错,请重试或联系网站管理员。");
  }

  /**
   * 设置会员顾问
   * @returns
   */
  $scope.setAdviser = function() {
    var userid = urlObj.id;
    var adviserId = $("#adviserList").val(); //会籍顾问ID
    if (!adviserId) {
      tool.alert("提示", "请选择会籍顾问");
      return false;
    }
    tool.confirm(
      "提示",
      "确认设置新会员顾问？",
      function() {
        //用户点击确认按钮时操作
        $.ajax({
          type: "PATCH",
          url: BasicUrl + "vip/adviser",
          data: {
            id: userid,
            advisorId: adviserId
          },
          dataType: "json",
          error: function(response) {
            if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse

              (response.responseText).errorMessage) {
              tool.alert("提示", JSON.parse(response.responseText).errorMessage);
            }

          },
          complete: function(xhr, textStatus) {
            if (xhr.status == 200) {

              tool.alert("提示", "设置成功！", function() {
                //刷新当前页面.
                window.location.reload();
              });
            }
          }
        });
      },
      function() {});
  }

  $scope.isHaveExpert = function(id) {

    if (!$scope.data.experts.DietitianExpert || !$scope.data.experts.SportExpert) {
      tool.alert("提示", "请完善专家团队信息！");
      return false;
    } else {
      window.location.href = "UserInfoEdit.html?id=" + id
    }
  };

  /**
   * 设置专家
   * @returns
   */
  $scope.setExpert = function(id) {
    var userid = $scope.userid; //获取当前用户ID

    var $users = $("#multiselect_to").find("option");
    if ($users.length != 2) {
      tool.alert("提示", "请至少选择一位饮食专家和一位运动专家");
      return false;
    }
    var expert = {
      food: null,
      sport: null
    };
    $users.each(function() {
      //获取饮食专家和运动专家
      if ($(this).attr("data-type") == "3") {
        expert.food = $(this).val();
      }
      if ($(this).attr("data-type") == "2") {
        expert.sport = $(this).val();
      }
    });

    var datas = {
      id: urlObj.id,
      dietitianExpertId: expert.food,
      sportExpertId: expert.sport
    }

    tool.confirm(
      "提示",
      "确认设置专家顾问？",
      function() {
        //用户点击确认按钮时操作
        $.ajax({
          type: "PATCH",
          url: BasicUrl + "vip/experts",
          data: datas,
          dataType: "json",
          error: function(response) {
            if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse

              (response.responseText).errorMessage) {
              tool.alert("提示", "设置失败，请重试！");
            }

          },
          complete: function(xhr, textStatus) {
            if (xhr.status == 200) {
              tool.alert("提示", "设置成功！", function() {
                //刷新当前页面.
                window.location.reload();
              });
            }
          }
        });
      },
      function() {});
  }

  /**
   * 加载完毕后再显示
   * @returns
   */
  $scope.$watch("viewContentLoaded", function() {
    angular.element(".myload").removeClass("myload");
  });
});