 var searchindex = 0;
 $(function() {
   // $(".start_end_time").datetimepicker();
   tool.changeSelect($("#username"), true);
   tool.changeSelect($("#prescriptionType"), false);
 });
 $("#modal").modal({　
   show: false, //默认是否展示
   backdrop: true, //隐藏背景
   // keyboard: false
 });
 var params = ""; //全局变量  请求的参数
 var obj = new UrlSearch();

 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {
   $scope.isSave = true;
   if (obj.reportId) {
     $scope.showBack = true;
     $scope.reportId = obj.reportId;
   }
   //分页方法声明
   var pageing = function(pageindex, params) {
       searchindex++;
       //TODO  需要修改部分http://healthshare.com.cn:80/admin/api/api-docs/../prescription?
       var url = BasicUrl + "prescription?" + params + "page=" + pageindex + "&pageNum=10"; //请求的参数和地址
       $http.get(url).success(function(data) {
         if (data != null && data != "" && data != "null") {
           //判断当前是否存在记录

           if (data.content && data.content != null && data.content.length > 0) {
             $scope.dataLengths = data.content.length > 0;
             //赋值操作
             $scope.title = 'name'; //排序字段
             $scope.desc = 0; //排序方式（默认升序）
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
             // tool.alert("提示", "当前条件下未获取到信息!");
           }
         }
       });
     }
     //分页方法

   pageing(0, params);

   //查询按钮
   $scope.search = function() {

     var type = $("#prescriptionType").val();
     var name = $("#name").val();
     //校验只有一个搜索条件
     params = ""; //初始化查询条件
     if (!(name || type) && searchindex == 1) {
       tool.alert("提示", "请至少输入一个搜索条件");
       return false;
     }
     params = "";
     if (type) {
       params = "prescriptionType=" + type + "&";
     }
     if (name) {
       params += "name=" + name + "&";
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

   //排序方法
   $scope.sort = function(ziduan) {

     var classname = '';
     if ($scope.desc) {
       classname = 'glyphicon glyphicon-arrow-down';
     } else {
       classname = 'glyphicon glyphicon-arrow-up';
     }
     $("[data-order]").find('span').addClass('glyphicon glyphicon-sort');
     $("[data-order='" + ziduan + "']").find('span').removeClass().addClass(classname);
   }

   // 新增
   $scope.save = function() {
     var saveInfo = {
       //文本框,下拉菜单选择值
       name: $.trim($("#chufangName").val()),
       spell: $.trim($("#spellName").val()),
       prescriptionType: $("#chufangType").val(),
       description: $.trim($("#chufangContent").val())
     };
     var __error = [];
     if (saveInfo.name == "") {
       __error.push("请输入处方名！");
     }
     if (saveInfo.spell == "") {
       __error.push("请输入处方拼音名称！");
     }
     if (saveInfo.prescriptionType == "") {
       __error.push("请选择处方类别！");
     }
     if (saveInfo.description == "") {
       __error.push("请输入处方内容！");
     }
     if (__error.length > 0) {
       tool.alert("提示", __error.join("<br />"));
       return false;
     }
     $.ajax({
       type: "POST",
       url: BasicUrl + "prescription",
       data: saveInfo,
       dataType: "json",
       error: function(response) {
         if (response && response.errorMessage) {
           tool.alert("提示", response.errorMessage);
         }
       },
       complete: function(xhr, textStatus) {
         console.log(xhr.status);
         if (xhr.status == 200) {
           $('[name="addForm"]')[0].reset();
           $('#modal').modal('hide')
           tool.alert("提示", "数据保存成功", function() {
             //刷新当前页面.
             window.location.reload();
           });
         } else {
           if (xhr.responseText) {
             var json = JSON.parse(xhr.responseText);
             tool.alert("提示", json.errorMessage);
           }
         }
       }
     });
   }

   // 修改
   $scope.saveEdit = function() {
     var saveInfo = {
       id: $scope.model.id,
       name: $.trim($("#chufangName").val()),
       spell: $.trim($("#spellName").val()),
       prescriptionType: $("#chufangType").val(),
       description: $.trim($("#chufangContent").val())
     };
     var __error = [];
     if (saveInfo.name == "") {
       __error.push("请输入处方名！");
     }
     if (saveInfo.spell == "") {
       __error.push("请输入处方拼音名称！");
     }
     if (saveInfo.prescriptionType == "") {
       __error.push("请选择处方类别！");
     }
     if (saveInfo.description == "") {
       __error.push("请输入处方内容！");
     }
     if (__error.length > 0) {
       tool.alert("提示", __error.join("<br />"));
       return false;
     }
     $.ajax({
       type: "PATCH",
       url: BasicUrl + "prescription/" + $scope.model.id,
       data: saveInfo,
       dataType: "json",
       error: function(response) {
         if (response && response.errorMessage) {
           tool.alert("提示", response.errorMessage);
         }
       },
       complete: function(xhr, textStatus) {
         console.log(xhr.status);
         if (xhr.status == 200) {
           $('[name="addForm"]')[0].reset();
           $('#modal').modal('hide')
           tool.alert("提示", "数据保存成功", function() {
             //刷新当前页面.
             window.location.reload();
           });
         } else {
           if (xhr.responseText) {
             var json = JSON.parse(xhr.responseText);
             tool.alert("提示", json.errorMessage);
           }
         }
       }
     });
   }

   //点击表格内处方名称链接操作
   $scope.getEditModel = function(id) {
     $scope.isSave = false;
     $('#modal').modal('show');
     var arr = $scope.data.content;
     arr.forEach(function(element, index, array) {
       var obj = element;
       if (element.id == id) {
         $scope.model = {
           id: id,
           name: element.name,
           spell: element.spell,
           prescriptionType: element.prescriptionType,
           description: element.description,
         };
       }
     }, this);

   }


   //删除项目
   $scope.deleteItem = function() {
     var id = $scope.model.id;
     if (id) { //获取到当前项目
       // alert(id);
       var deleteUrl = BasicUrl + "prescription/" + id;
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
               tool.alert("提示", "删除成功!");
               //刷新当前页面.
               window.location.reload();　
             } else {
               tool.alert("提示", "删除失败,请重试!");
             }
           }).error(function(response) {
             tool.alert("提示", response.errorMessage);
           });
         },
         function() {}
       );
     } else {
       tool.alert("提示", "获取参数出错，请重试！");
     }
   }

   //加载完毕后再显示 
   $scope.$watch("viewContentLoaded", function() {
     angular.element(".myload").removeClass("myload");
   });
 });