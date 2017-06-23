 $(document).ready(function($) {
   $('#multiselect').multiselect({
     search: {
       left: '<input type="text" name="q" class="form-control" placeholder="输入值进行搜索" />',
     },
     fireSearch: function(value) {
       return value.length > 1;
     },
     beforeMoveToRight: function($left, $right, $options) {　
       return true;
     }

   });
   //多选
   $("#sel_menu2").select2({
     tags: true,
     maximumSelectionLength: 10　
   });
 });

 var app = angular.module('myApp', []);
 app.controller('myCtrl', function($scope, $http) {
   //获取视图列表


   var obj = new UrlSearch();
   if (obj.viewId) {
     // $scope.currentViewId = obj.viewId;
     $scope.dataView = obj.viewId;
   }

   $http.get(BasicUrl + "view").success(function(data) {
     if (data != null && data != "" && data != "null") {
       $scope.viewOptions = data;

     }
   });

   var url = BasicUrl + "item?page=0&pageNum=1000";
   $http.get(url).success(function(data) {
     if (data != null && data != "" && data != "null") {
       $scope.options = data.content;
       tool.changeSelect($("#dataView"), false);
     }
   });
   //添加新视图操作
   $scope.viewAdd = function() {
     var viewName = $("#txtKeyWord").val();
     var arr = [];
     var $option = $("#multiselect_to").find('option');
     $option.each(function() {
       arr.push($(this).val());
     });
     var str = arr.join(","); //将用户选择的项目字符串组合
     var selectVal = $("#sel_menu2").val(); //标签字符串组合  
     var error = [];
     var tag = selectVal == null ? "" : selectVal.join(',');
     if (str == "") {
       error.push("数据项目不能为空");
     }
     if (viewName == "") {
       error.push("视图名称不能为空");
     }
     if (tag == "") {
       error.push("视图所属标签不能为空");
     }
     if (error.length != 0) {
       tool.alert("提示", error.join("<br/>"));
       return false;
     }


     $.ajax({
       type: "POST",
       url: BasicUrl + "view",
       data: {
         name: viewName,
         itemIds: str,
         tag: tag
       },
       dataType: "json",
       success: function(data, textStatus, request) {
         if (data.id) {
           tool.alert("提示", "数据保存成功");
           window.location.reload();
         }

       },
       error: function(response) {
         if (response && response.errorMessage) {
           tool.alert("提示", response.errorMessage);
         }
       }
     });

   }

   $scope.$watch("dataView", function(newValue, oldValue) {
     if (newValue) {
       $scope.editViewId = newValue;
       //获取当前视图下项目
       // var viewID = $("#dataView").val();
       $http.get(BasicUrl + "view/" + newValue).success(function(data) {
         if (data != null && data != "" && data != "null") {
           //数据不为空
           $scope.itemList = data.items; //TODO 修改
           $scope.editViewName = data.name;
           $scope.itemListObj = {};
           for (var index = 0; index < $scope.itemList.length; index++) {
             var element = $scope.itemList[index];
             $scope.itemListObj[element.itemId] = element.itemId;
             console.log(element.itemId);
           }

         }
       });
     }
   });



   //修改视图操作
   $scope.saveEdit = function() {
     if ($scope.editViewId == 0 || !$scope.editViewId) {
       tool.alert("提示", "请选择视图");
       return false;
     }
     var arr = [];
     var $option = $("#multiselect_to").find('option');
     $option.each(function() {
       arr.push($(this).val());
     });
     var str = arr.join(","); //将用户选择的项目字符串组合
     var selectVal = $("#sel_menu2").val(); //标签字符串组合  
     var error = [];
     var tag = selectVal == null ? "" : selectVal.join(',');
     if (str == "") {
       error.push("数据项目不能为空");
     }
     if (tag == "" || tag == null) {
       error.push("视图所属标签不能为空");
     }
     if (error.length != 0) {
       tool.alert("提示", error.join("<br/>"));
       return false;
     }
     $.ajax({
       type: "PATCH",
       url: BasicUrl + "view/" + $scope.editViewId,
       data: {
         id: $scope.editViewId,
         name: $scope.editViewName,
         itemIds: str,
         tag: tag
       },
       dataType: "json",
       success: function(data, textStatus, request) {
         if (data.id) {
           tool.alert("提示", "数据保存成功");
           window.location.reload();
         }

       },
       error: function(response) {
         if (response && response.errorMessage) {
           tool.alert("提示", response.errorMessage);
         }
       },
       complete: function(xhr, textStatus) {
         if (xhr.status == 200) {
           tool.alert("提示", "数据保存成功");
           window.location.reload();
         }
       }
     });
   }

   //加载完毕后再显示 
   $scope.$watch("viewContentLoaded", function() {
     angular.element(".myload").removeClass("myload");
   });
 });

 $(document).ready(function() {
   // tool.changeSelect($("#dataView"), false);
 });