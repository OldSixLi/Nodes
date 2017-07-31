      $(function() {
        $("#adminId").val(adminId());
        $("#userId").select2({
          placeholder: '请选择',
          allowClear: true,
          ajax: {
            url: function(params) {
              return BasicUrl + "vip/name/" + params.term;
            },
            dataType: 'json',
            delay: 250,
            processResults: function(data, page) {
              return {
                results: data
              };
            },
            cache: false
          },
          minimumInputLength: 1,
          minimumResultsForSearch: 1,
          width: "120px",
          templateResult: formatRepo,
          templateSelection: formatRepoSelection,
        });

        function formatRepo(repo) {
          return repo.realName;
        }

        function formatRepoSelection(repo) {
          return repo.realName;
        }

      });

      var params = "advisorId=&userId=&minCreateAt=&maxCreateAt=&"; //全局变量 
      //表单校验
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
              required: "请输入用户登录名"
            },
            phone: {
              required: "请选择记录方式"
            },
            problem: {
              required: "此项为必填项，请输入反馈问题。"
            },
            plan: {
              required: "此项为必填项，请输入解决方案。"
            },
            remark: {
              required: "此项为必填项，请输入备注。"
            }
          });
        }]);


        /**
         * 配置http服务
         * 
         */
        // app.config(["$httpProvider", function($httpProvider) {
        //   $httpProvider.defaults.headers.common['authorization'] = headertoken();
        //   console.log($httpProvider.defaults.headers.common);
        // }]);
        //控制器
        app.controller("customersCtrl", ["$scope", "$http", function($scope, $http) {
          //获取当前的专家列表
          $http.get(BasicUrl + "admin/advisers").success(function(data) {
            if (data != null && data != "" && data != "null") {
              $scope.options = data;
              tool.changeSelect($("#advisorId"), true);
            }
          });
          //获取当前专家下的会员
          $http.get(BasicUrl + "vip/adviser/" + adminId()).success(function(data) {
            if (data != null && data != "" && data != "null") {
              $scope.MemberOptions = data;
            }
            tool.changeSelect($("#modalUserId"), false);
          });
          tool.changeSelect($("#demandWay"), false);

          //分页方法声明
          var searchIndex = 0;

          var pageing = function(pageindex, params) {
            //请求地址 
            var url = BasicUrl + "demand?adminId=" + adminId() + "&" + params + "page=" + pageindex + "&pageNum=10"; //请求的参数和地址
            $http.get(url).success(function(data) {
              if (data != null && data != "" && data != "null") {
                //判断当前是否存在记录
                handleError(data, function(data) {
                  if (data.content != null && data.content.length > 0) {
                    $scope.dataLengths = true;
                    //赋值操作
                    $scope.data = data;
                    $scope.totalPage = data.totalPages;
                    $scope.totalRecord = data.totalElements;
                    //调用生成分页方法
                    initPageDiv($("#alreadyPage"), //在哪里生成页码
                      pageindex + 1, //当前页
                      data.totalPages, //总页数
                      5, //每次显示多少页
                      $("#currentPage"), //隐藏域的值：当前页数
                      function() {
                        pageing($("#currentPage").val() - 1, params);
                      });
                  } else {
                    $scope.dataLengths = false;
                    if (searchIndex > 0) {
                      tool.alert("提示", "没有相关的记录！");
                    }
                  }
                });


              }
            }).error(function(data) {
              if (data.errorMessage) {
                tool.alert("提示", data.errorMessage);
              }
            });
          }




          // 【前提】预约列表页面
          // 【现象】备注字段有三种现象，如附件图所示：
          // 1. 添加预约时填写的备注信息，在成功添加预约后没有显示到“预约报告号/备注”字段一栏；
          // 2.未确认预约时，“预约报告号/备注”字段一栏，就是“会员签到”按钮；
          // 3.会员签到后，“预约报告号/备注”一栏不仅显示了报告号，还显示了备注信息
          // 【需求】备注字段是为了记录一些 添加或确认预约过程中 会员的情况，如会员身体状况、电话未接通、改约另外时间等。所以说，“预约报告号/备注”一栏显示的信息也跟整个预约过程的变化而变化：
          // 1. 添加预约时填写的备注信息，在成功添加预约后正确显示到“预约报告号/备注”字段一栏，直到确认预约后才变成“会员签到”按钮；
          // 2.没有确认预约时，“预约报告号/备注”字段一栏应一直显示备注的内容，直到确认预约完成，则显示“会员签到”按钮；
          // 3.会员签到后，“预约报告号/备注”一栏仅显示生成的报告号。
          //分页方法调用
          pageing(0, params);

          //查询按钮
          $scope.search = function() {
            searchIndex++;
            //TODO  需要修改部分
            //参数赋值

            var minExpiredAt = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime").val()));
            var maxExpiredAt = Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtEndTime").val()));
            var advisorId = $("#advisorId").val();
            var userId = $("#userId").val() || "";
            //校验只有一个搜索条件
            if (!(minExpiredAt || maxExpiredAt || advisorId || userId)) {
              tool.alert("提示", "请至少输入一个搜索条件");
              return false;
            }
            //起止日期校验
            if (minExpiredAt > maxExpiredAt && maxExpiredAt != "") {
              tool.alert("提示", "活动日期中结束时间不得早于起始时间");
              return false;
            }
            params = ""
            if (minExpiredAt != 0) {
              params += "minCreateAt=" + minExpiredAt + "&";
            }
            if (maxExpiredAt != 0) {
              params += "maxCreateAt=" + maxExpiredAt + "&";
            }
            if (advisorId) {
              params += "advisorId=" + advisorId + "&";
            }
            if (userId) {
              params += "userId=" + userId + "&";
            }
            pageing(0, params);
          }

          //跳转至某页方法
          $scope.skip = function() {
            if ($scope.toPageValue <= 1) {
              $scope.toPageValue = 1;
            } else if ($scope.toPageValue > $scope.totalPage) {
              $scope.toPageValue = $scope.totalPage;
            }
            pageing($scope.toPageValue - 1, params);
          }

          //点击变为已完成
          $scope.completeDemand = function(id) {
            tool.confirm(
              "提示",
              "是否更改为已完成？",
              function() {
                //用户点击确认按钮时操作
                $.ajax({
                  type: "PATCH",
                  url: BasicUrl + "demand/" + id,
                  data: {
                    adminId: adminId(),
                    id: id
                  },
                  dataType: "json",
                  error: function(response) {
                    if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse(response.responseText).errorMessage) {
                      tool.alert("提示", JSON.parse(response.responseText).errorMessage);
                    }
                  },
                  complete: function(xhr, textStatus) {
                    if (xhr.status == 200) {
                      tool.alert("提示", "更改状态成功", function() {
                        //刷新当前页面.
                        window.location.reload();
                      });
                    }
                  }
                });
              },
              function() {});
          }

          var vm = $scope.vm = {
            showErrorType: "1",
            showDynamicElement: true,
            dynamicName: "dynamicName",
            data: {}
          };

          //保存操作
          vm.saveinfo = function($event) {
            $(":submit").attr("disabled", true);
            $http({
                method: 'POST',
                url: url = BasicUrl + "demand/",
                data: $('[name="validateForm"]').serialize(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              })
              .success(function(data, xhr) {
                if (xhr == 200) {
                  tool.alert("提示", "保存成功!");
                  //刷新当前页面.
                  window.location.reload();
                  $(":submit").attr("disabled", false);
                } else {
                  tool.alert("提示", "保存失败,请重试!");

                  $(":submit").attr("disabled", false);
                }
              }).error(function(response) {
                tool.alert("提示", response.errorMessage);
                $(":submit").attr("disabled", false);
              });
          };

          //加载完毕后再显示 
          $scope.$watch("viewContentLoaded", function() {
            angular.element(".myload").removeClass("myload");
          });
        }]);
      })();