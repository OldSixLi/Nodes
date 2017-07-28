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
 $(function() {
   $("#modal").modal({　
     show: false, //默认是否展示
     backdrop: true
   });
   // $(".start_end_time").datetimepicker();
   var tool = new JSTOOL();
   tool.changeSelect($("#username"), true);
 });
 //
 var params = ""; //全局变量  请求的参数
 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {
   $scope.isSave = true;
   //分页方法声明
   var pageing = function(pageindex, params) {
     var url = BasicUrl + "vipCard?page=" + pageindex + "&pageNum=10";
     $http.get(url).success(function(data) {
       if (data != null && data != "" && data != "null") {
         //判断当前是否存在记录
         $scope.dataLengths = data.content.length > 0;
         if (data.content != null && data.content.length > 0) {
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
           alert("未获取到数据，请重试");
         }
       }
     });
   }

   pageing(0, params);

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
     var deleteUrl = BasicUrl + "vipCard/" + id;
     tool.confirm("提示",
       "是否确认删除此项目",
       function() {
         $http({
             method: 'DELETE',
             url: deleteUrl,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             }
           })
           .success(function(data, xhr) {
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
   }


   //新增
   $scope.save = function() {
     var saveInfo = {
       //文本框,下拉菜单选择值
       name: $.trim($("#name").val()),
       // type: $scope.model.vipType, //类型
       type: "1", //类型
       remark: $.trim($("#remark").val()),
       price: $.trim($("#price").val()),
       validityPeriod: $.trim($("#validityPeriod").val()),
       imageUrl: $.trim($("#iconUrl").val()),
       shortName: $.trim($("#shortName").val()),
       outpatientCount: $.trim($("#outpatientCount").val()),
       canConsult: true //TODO  是否可以咨询

     };
     var __error = [];
     if (saveInfo.name == "") {
       __error.push("请输入卡券名称！");
     }
     if (saveInfo.price == "") {
       __error.push("请输入价格！");
     }
     if (saveInfo.validityPeriod == "") {
       __error.push("请输入有效期！");
     }
     if (saveInfo.shortName == "") {
       __error.push("请输入缩写！");
     }
     if (saveInfo.outpatientCount == "") {
       __error.push("请输入门诊次数！");
     }
     if (saveInfo.adminNo == "") {
       __error.push("请输入用户名！");
     }
     if (saveInfo.imageUrl == "") {
       __error.push("请上传背景图！");
     }
     if (__error.length > 0) {
       tool.alert("提示", __error.join("<br />"));
       return false;
     }
     $.ajax({
       type: "POST",
       url: BasicUrl + "vipCard",
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
           if (xhr.responseText) {
             var json = JSON.parse(xhr.responseText);
             if (json.errorMessage) {
               tool.alert("提示", json.errorMessage);
             }
           } else {
             $('[name="addForm"]')[0].reset();
             $('#modal').modal('hide');
             tool.alert("提示", "新增卡券成功", function() {
               //刷新当前页面.
               window.location.reload();
             });
           }

         } else {
           if (xhr.responseText) {
             var json = JSON.parse(xhr.responseText);
             tool.alert("提示", json.errorMessage);
           }
         }
       }
     });
   }



   // id:32
   // name:月卡12
   // type:considerate
   // remark:此卡为体验卡，有效期为一个月，有两次门诊次数
   // price:0.01
   // validityPeriod:1
   // imageUrl:http://omsss06f1.bkt.clouddn.com/Fh2rnYHB-0l_wQcc2Lk9NH7Yeegl 
   // shortName:yk
   // outpatientCount:2
   // canConsult:true

   // 修改

   $scope.saveEdit = function() {
     var saveInfo = {
       id: $scope.model.id,
       //文本框,下拉菜单选择值
       name: $.trim($("#name").val()),
       // type: $scope.model.vipType, //类型
       type: "1", //类型
       remark: $.trim($("#remark").val()),
       price: $.trim($("#price").val()),
       validityPeriod: $.trim($("#validityPeriod").val()),
       imageUrl: $.trim($("#iconUrl").val()),
       shortName: $.trim($("#shortName").val()),
       outpatientCount: $.trim($("#outpatientCount").val()),
       canConsult: true //TODO  是否可以咨询

     };
     var __error = [];
     if (saveInfo.name == "") {
       __error.push("请输入卡券名称！");
     }
     if (saveInfo.price == "") {
       __error.push("请输入价格！");
     }
     if (saveInfo.validityPeriod == "") {
       __error.push("请输入有效期！");
     }
     if (saveInfo.shortName == "") {
       __error.push("请输入缩写！");
     }
     if (saveInfo.outpatientCount == "") {
       __error.push("请输入门诊次数！");
     }
     if (saveInfo.adminNo == "") {
       __error.push("请输入用户名！");
     }
     if (saveInfo.imageUrl == "") {
       __error.push("请上传背景图！");
     }
     if (__error.length > 0) {
       tool.alert("提示", __error.join("<br />"));
       return false;
     }
     $.ajax({
       type: "PATCH",
       url: BasicUrl + "vipCard/" + $scope.model.id,
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
     // $('#modal').modal('show');
     $http.get(BasicUrl + "vipCard/" + id)
       .success(function(data) {
         if (data != null && data != "" && data != "null") {
           $scope.model = data;
           //将相关信息存储进INPUT里
           $('#modal').modal('show');
         }
       }).error(function() {
         tool.alert("提示", "获取信息出错，无法编辑此数据！");
         $('#modal').modal('hide');
         $scope.isSave = true;
       });
   }

   $scope.$watch("$viewContentLoaded", function() {
     angular.element(".myload").removeClass("myload");
   });
 });