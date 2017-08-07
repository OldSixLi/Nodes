 var domainUrl = "http://omsss06f1.bkt.clouddn.com/";
 //获取七牛uptoken　
 uploader = Qiniu.uploader({
   runtimes: 'html5,flash,html4',
   browse_button: 'pickfiles',
   container: 'btn-uploader',
   drop_element: 'btn-uploader',
   max_file_size: '100mb',
   dragdrop: false,
   chunk_size: '4mb',
   unique_names: true,
   save_key: true,
   uptoken_func: function() {　
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
   domain: domainUrl,
   multi_selection: false,
   filters: {
     mime_types: [{
       title: "Image files",
       extensions: "jpg,jpeg,gif,png"
     }]
   },
   auto_start: true,
   init: {
     'FilesAdded': function(up, files) {},
     'BeforeUpload': function(up, file) {},
     'UploadProgress': function(up, file) {},
     'UploadComplete': function() {},
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
     backdrop: true, //隐藏背景 
   });

   tool.changeSelect($("#sltName"), true);

   function formatRepo(repo) {
     return repo.realName;
   }

   function formatRepoSelection(repo) {
     return repo.realName;
   }
 });

 var params = ""; //全局变量
 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http, $timeout) {
   $scope.isSave = true;
   var urllist = BasicUrl + "admin";
   $http.get(urllist).success(function(data) {
     if (data != null && data != "" && data != "null") {
       $scope.options = data;
     }
   });

   //分页方法声明
   var pageing = function(pageindex, params) {
     var url = BasicUrl + "admin?" + params + "page=" + pageindex + "&pageNum=10"; //请求的参数和地址
     $http.get(url).success(function(data) {
       if (data.length > 0) {
         //判断当前是否存在记录
         $scope.dataLengths = data.length > 0;
         if (data != null && data.length > 0) {
           //赋值操作
           // $timeout(function() {
           $scope.data = data;
           // }, 5000);
         } else {
           $scope.dataLengths = false;
           //  tool.alert("提示", "暂无结果");
         }
       } else {
         $scope.dataLengths = false;
       }
     });
   }

   //分页方法
   pageing(0, params);
   $scope.clear = function() {
     $scope.model = null;
   }

   //查询按钮
   $scope.search = function() {　
     var username = '';
     if ($("#sltName").val()) {
       username = $("#sltName").find('option:selected').text();　
     }
     var txtKeyWord = $("#txtKeyWord").val();　
     if (!(username || txtKeyWord)) {
       tool.alert("提示", "请至少输入一个搜索条件");
       return false;
     }
     params = '';
     if (username) {
       params += 'name=' + username + '&';
     }
     if (txtKeyWord) {
       params += 'job=' + txtKeyWord + '&';
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
     pageing($scope.toPageValue, params);
   }

   //删除项目操作方法
   $scope.deleteItem = function(id) {
     var deleteUrl = BasicUrl + "admin/" + id;
     tool.confirm("提示",
       "是否确认删除此用户吗？",
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
       function() {});
   }

   //表格内名称点击弹出模态框修改
   $scope.getEditModel = function(id) {
     $scope.isSave = false;
     $http.get(BasicUrl + "admin/" + id)
       .success(function(data) {
         if (data != null && data != "" && data != "null") {
           $scope.model = data;
           $('#modal').modal('show');
         }
       }).error(function() {
         tool.alert("提示", "获取信息出错，无法编辑此数据！");
         $('#modal').modal('hide');
         $scope.isSave = true;
       });
   }

   //新增
   $scope.save = function() {
     var saveInfo = {
       name: $.trim($("#name").val()),
       adminNo: $.trim($("#adminNo").val()),
       job: $.trim($("#job").val()),
       role: $('input:radio[name=role]:checked').val(),
       iconUrl: $.trim($("#iconUrl").val()),
       mobile: $.trim($("#mobile").val()),
       password: $scope.model.password
     };
     var __error = [];
     if (saveInfo.name == "") {
       __error.push("请输入名称！");
     }
     if (saveInfo.adminNo == "") {
       __error.push("请输入用户名！");
     }
     var reg = /^1\d{10}$/; //定义正则表达式
     if (saveInfo.mobile && !reg.test(saveInfo.mobile)) {
       __error.push("请输入正确的手机号码！");
     }
     if (__error.length > 0) {
       tool.alert("提示", __error.join("<br />"));
       return false;
     }
     $.ajax({
       type: "POST",
       url: BasicUrl + "admin",
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
         } else {
           $('[name="addForm"]')[0].reset();
           $('#modal').modal('hide');
           tool.alert("提示", "新增管理员成功", function() {
             window.location.reload();
           });
         }
       },
       complete: function(xhr) {
         if (xhr.status == 200 && xhr.responseText == "") {
           tool.alert("提示", "新增管理员成功", function() {
             window.location.reload();
           });
         }
       }
     });
   }

   // 编辑
   $scope.saveEdit = function() {
     var saveInfo = {
       id: $scope.model.id,
       name: $.trim($("#name").val()),
       adminNo: $.trim($("#adminNo").val()),
       job: $.trim($("#job").val()),
       role: $('input:radio[name=role]:checked').val(),
       iconUrl: $.trim($("#iconUrl").val()),
       mobile: $.trim($("#mobile").val()),
       password: $scope.model.password
     };
     var error = [];
     if (saveInfo.name == "") {
       error.push("请输入名称！");
     }
     if (saveInfo.adminNo == "") {
       error.push("请输入用户名！");
     }
     if (error.length > 0) {
       tool.alert("提示", error.join("<br />"));
       return false;
     }
     $.ajax({
       type: "PATCH",
       url: BasicUrl + "admin/" + $scope.model.id,
       data: saveInfo,
       dataType: "json",
       error: function(response) {
         if (response && response.errorMessage) {
           tool.alert("提示", response.errorMessage);
         }
       },
       complete: function(xhr, textStatus) {
         console.log(JSON.stringify(xhr));
         if (xhr.status == 200 && xhr.responseText == "") {
           $('[name="addForm"]')[0].reset();
           $('#modal').modal('hide');
           tool.alert("提示", "修改成功", function() {
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

   //加载完毕后执行
   $scope.$watch("$viewContentLoaded", function() {
     angular.element(".myload").removeClass("myload");
   });
 });