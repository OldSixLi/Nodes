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
        app.config(["$httpProvider", function($httpProvider) {
          $httpProvider.defaults.headers.common['authorization'] = headertoken();
          console.log($httpProvider.defaults.headers.common);
        }]);
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
            $http.get(url, {
              headers: { 'authorization': adminId() + '_' + token() }
            }).success(function(data) {
              if (data != null && data != "" && data != "null") {
                //判断当前是否存在记录

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
              }
            });
          }

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
            params = "minStartAt=" + minExpiredAt + "&maxStartAt=" + maxExpiredAt + "&advisorId=" + advisorId + "&userId=" + userId + "&";
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