 $(function() {
   // $(".start_end_time").datetimepicker();
   var tool = new JSTOOL();
   tool.changeSelect($("#username"), true);
 });
 $(document).ready(function() {
   $(".vipprices").keyup(function() {
     var reg = $(this).val().match(/\d+\.?\d{0,2}/);
     var txt = '';
     if (reg != null) {
       txt = reg[0];
     }
     $(this).val(txt);
   }).change(function() {
     $(this).keypress();
     var v = $(this).val();
     if (/\.$/.test(v)) {
       $(this).val(v.substr(0, v.length - 1));
     }
   });
 });
 var params = "";　
 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {　
   var pageing = function(pageindex, params) {　
       var url = BasicUrl + "appointmentItems?" + params + "page=" + pageindex + "&pageNum=10";
       $http.get(url).success(function(data) {
         if (data != null && data != "" && data != "null") {
           $scope.dataLengths = data.content.length > 0;
           if (data != null && data.content.length > 0) {
             //赋值操作
             $scope.title = 'FP_HM'; //排序字段
             $scope.desc = 0; //排序方式（默认升序）
             $scope.data = data;
             $scope.totalPage = data.page.totalPage;
             $scope.totalRecord = data.page.totalResult;
             // $scope.totalPage = data.page.totalPage;
             // $scope.totalRecord = data.page.totalResult;
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
             alert("未获取到数据，请重试");
           }
         }
       });
     }
     //分页方法


   var obj = new UrlSearch();
   if (obj.name) {
     params = "name=" + obj.name + "&";
   } else {
     params = "";
   }
   pageing(0, params);
   //查询按钮
   $scope.search = function() {
       var name = $("#name").val();
       var inspectionName = $("#inspectionName").val();
       //校验只有一个搜索条件
       if (!(name || inspectionName)) {
         tool.alert("提示", "请至少输入一个搜索条件");
         return false;
       }
       params = "";
       if (name) {
         params += "name=" + name + "&";
       }
       if (inspectionName) {
         params += "inspectionName=" + inspectionName + "&";
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

   //删除项目操作方法
   $scope.deleteItem = function(id) {
       var deleteUrl = BasicUrl + "appointmentItems/" + id;

       tool.confirm("提示",
         "是否确认删除此项目",
         function() {
           $http({
             method: 'DELETE',
             url: url = deleteUrl,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             }
           }).success(function(data, xhr) {
             if (xhr == 200) {
               tool.alert("提示", "删除成功!", function() {
                 //刷新当前页面.
                 window.location.reload();
               });　
             } else {
               tool.alert("提示", "删除失败,请重试!");
             }
           }).error(function(response) {
             tool.alert("提示", response.errorMessage);
           });
         },
         function() {});
     }
     //新增
   $scope.save = function() {
     var saveInfo = {
       //文本框,下拉菜单选择值
       name: $.trim($("#itemname").val()),
       cost: $.trim($("#cost").val()),
       report: $.trim($("#report").val()),
       remark: $.trim($("#remark").val()),
     };
     var __error = [];
     if (saveInfo.name == "") {
       __error.push("项目名不能为空");
     }
     if (__error.length > 0) {
       tool.alert("提示", __error.join("<br />"));
       return false;
     }
     $.ajax({
       type: "POST",
       url: BasicUrl + "appointmentItems",
       data: saveInfo,
       dataType: "json",
       error: function(response) {
         if (response && response.errorMessage) {
           tool.alert("提示", response.errorMessage);
         }
       },
       success: function(data) {
         if (data.errorMessage) {
           tool.alert("提示", data.errorMessage);
           //刷新当前页面.
           window.location.reload();
         }
       },
       complete: function(xhr, textStatus) {
         console.log(xhr.status);
         if (xhr.status == 200 && !data.errorMessage) {
           $('[name="addForm"]')[0].reset();
           $('#modal').modal('hide')
           tool.alert("提示", "新增项目成功", function() {
             //刷新当前页面.
             window.location.reload();
           });
         }
       }
     });
   }

   //加载完毕后再显示 
   $scope.$watch("viewContentLoaded", function() {
     angular.element(".myload").removeClass("myload");
   });
 });