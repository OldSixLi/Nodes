 // 七牛云处理图片Begin
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
       url: "http://60.205.170.209:8080/admin/api/qnToken",
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
       // var key = nowTime + file.name;　
       return file.name;
     }
   }
 });

 function getLocalTime(nS) {
   return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
 }

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
 // 七牛云上传图片End 
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
       sponsorName: {
         required: "请输入主办方名称"
       },
       coordinate: {
         required: "请选择地点坐标"
       },
       name: {
         required: "请输入活动名称"
       },
       startAt: {
         required: "请选择活动时间"
       },
       lasted: {
         required: "请输入活动持续时间"
       },
       location: {
         required: "请选择地点坐标"
       },
       maxApplyNumber: {
         required: "请输入活动人数"
       },
       signUpCost: {
         required: "请输入报名费用"
       },
       announcement: {
         required: "请输入通知公告"
       },
       description: {
         required: "请输入活动详情"
       }
     });
   }]);

   /**
    * 配置http服务
    * 
    */
   //  app.config(["$httpProvider", function($httpProvider) {
   //    $httpProvider.defaults.headers.common["authorization"] = headertoken();
   //    console.log($httpProvider.defaults.headers.common);
   //  }]);
   app.controller("validateCtrl", ["$scope", "$http", function($scope, $http) {
     var vm = $scope.vm = {
       //   showErrorType: "1",
       //   showDynamicElement: true,
       //   dynamicName: "dynamicName",
       data: {},
       entity: {
         iconUrl: ""
       }
     };
     var urlObj = new UrlSearch();
     //判断当前为修改页面还是新增页面

     if (urlObj.id) {
       $scope.activityId = urlObj.id;
       $scope.isSave = false;
       var activityid = urlObj.id;
       var url = BasicUrl + "activity/" + activityid;
       $http.get(url).success(function(data) {
         if (data != null && data != "" && data != "null" && data.id) {
           $scope.vm.entity = data;
           $scope.vm.entity.todo = "TODO";
           // vm.entity.startAt
           vm.entity.startAt = vm.entity.startAt;
           $scope.dataLengths = vm.entity.members.length;

           // $scope.vm.entity.signByUser = data.signByUser;

           // if (data.signByUser) {
           //   $("#isReleased1").attr('checked', 'checked');
           // } else {
           //   $("#isReleased2").attr('checked', 'checked');
           // }


           if (!data.released) {
             $scope.vm.entity.isReleased = 0;
           }

           if (data.released && data.allowSignUp) {
             $scope.vm.entity.isReleased = 1;
           }
           if (data.released && !data.allowSignUp) {
             $scope.vm.entity.isReleased = 2;
           }

         } else {
           tool.alert("提示", "当前活动不存在！");
           window.history.back(-1); //回退至上一页面
         }
       }).error(function(data, header, config, status) {
         tool.alert("提示", "获取活动信息出错,请重试！");
         window.history.back(-1); //回退至上一页面
       });
     } else {
       $scope.isSave = true;
     }

     $scope.hasSign = function() {
       tool.alert("提示", "此会员已签到，不可再取消报名!");
     }

     //新增按钮操作
     vm.saveinfo = function($event) {
       console.log("表单开始提交");


       var val = vm.entity.isReleased;
       var obj = {
         allowSignUp: false, //是否允许报名，允许则客户端可报名
         isReleased: false, //是否发布， 发布则客户端可见
         signByUser: false //是否允许用户自主签到
       };

       obj.signByUser = vm.entity.allowsingup != "0";
       // 待发布(用户不可见)
       if (val == "0") {
         obj.allowSignUp = false;
         obj.isReleased = false;
       }
       if (val == "1") {
         obj.allowSignUp = true;
         obj.isReleased = true;
       }
       if (val == "2") {
         obj.allowSignUp = false;
         obj.isReleased = true;
       }
       $.ajax({
         type: "post",
         url: 'http://60.205.170.209:8080/admin/api/activity',
         data: {
           adminId: 1,
           name: vm.entity.name,
           sponsorName: vm.entity.sponsorName,
           iconUrl: $("#iconUrl").val(),
           coordinate: $("#coordinate").val(),
           announcement: vm.entity.announcement,
           startAt: Date.parse(new Date(vm.entity.startAt)).toString() == "NaN" ? 0 : Date.parse(new Date(vm.entity.startAt)),
           lasted: vm.entity.lastedTime,
           signUpCost: vm.entity.signUpCost,
           maxApplyNumber: vm.entity.maxApplyNumber,
           description: vm.entity.description,
           location: vm.entity.location,
           allowSignUp: obj.allowSignUp, //允许报名
           isReleased: obj.isReleased, //可见
           signByUser: obj.signByUser //自助
         },

         dataType: "json",
         success: function(data, textStatus, request) {
           if (data.success) {
             tool.alert("提示", "成功");
           }

         },
         complete: function(xhr, textStatus) {
           console.log(xhr);
           if (xhr.status == 200) {
             tool.alert("提示", "数据保存成功", function() {});
             window.location.href = "ActivityList.html";
           }
         }

       });

     };

     //修改按钮操作
     vm.editInfo = function() {
       console.log("表单开始提交");
       var val = vm.entity.isReleased;
       var obj = {
         allowSignUp: false, //是否允许报名，允许则客户端可报名
         isReleased: false, //是否发布， 发布则客户端可见
         signByUser: false //是否允许用户自主签到
       };

       obj.signByUser = vm.entity.signByUser;
       // 待发布(用户不可见)
       if (val == "0") {
         obj.allowSignUp = false;
         obj.isReleased = false;
       }
       if (val == "1") {
         obj.allowSignUp = true;
         obj.isReleased = true;
       }
       if (val == "2") {
         obj.allowSignUp = false;
         obj.isReleased = true;
       }
       $.ajax({
         type: "PATCH",
         url: BasicUrl + 'activity/' + $scope.activityId,
         data: {
           id: $scope.activityId,
           adminId: 1,
           name: vm.entity.name,
           sponsorName: vm.entity.sponsorName,
           iconUrl: $("#iconUrl").val(),
           coordinate: $("#coordinate").val(),
           announcement: vm.entity.announcement,
           startAt: Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime").val())),
           lasted: vm.entity.lastedTime,
           signUpCost: vm.entity.signUpCost,
           maxApplyNumber: vm.entity.maxApplyNumber,
           description: vm.entity.description,
           location: vm.entity.location,
           allowSignUp: obj.allowSignUp, //允许报名
           isReleased: obj.isReleased, //可见
           signByUser: obj.signByUser //自助
         },

         dataType: "json",
         success: function(data, textStatus, request) {
           if (data.success) {
             tool.alert("提示", "成功");
           }

         },
         error: function(response) {
           if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse(response.responseText).errorMessage) {
             tool.alert("提示", JSON.parse(response.responseText).errorMessage);
           }
         },
         complete: function(xhr, textStatus) {
           console.log(xhr.status);
           if (xhr.status == 200) {
             tool.alert("提示", "数据保存成功");
             window.location.href = "ActivityList.html";
           } else {
             // tool.alert("提示", "操作失败!");
           }
         }

       });

     }

     //删除活动
     vm.deleteInfo = function() {
       var id = urlObj.id;
       var deleteUrl = BasicUrl + "activity/" + id;
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
                 tool.alert("提示", "删除成功!", function() {});　
                 //刷新当前页面.
                 window.location.href = "ActivityList.html";
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

     //TODO 群发通知
     vm.notice = function() {
       //点击变为已完成
       var id = urlObj.id;
       tool.confirm(
         "提示",
         "是否进行群发通知？",
         function() {
           //用户点击确认按钮时操作http://60.205.170.209:8080/admin/api/api-docs/../activity/2/notification
           $.ajax({
             type: "POST",
             url: BasicUrl + "activity/" + id + "/notification",
             dataType: "json",
             error: function(response) {
               if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse(response.responseText).errorMessage) {
                 tool.alert("提示", JSON.parse(response.responseText).errorMessage);
               }
             },
             complete: function(xhr, textStatus) {
               if (xhr.status == 200 && xhr.responseJSON && xhr.responseJSON.resultOK) {
                 tool.alert("提示", "群发消息成功", function() {
                   window.location.reload();
                 });
               }
             }
           });
         },
         function() {
           //用户点击取消按钮时操作
         });

     }

     //TODO 扫码预览
     vm.show = function() {

     }

     //取消报名
     vm.cancelSign = function(userid) {
       var id = urlObj.id, //活动ID
         userId = userid; //用户ID
       tool.confirm("提示", "确认取消此用户报名?", function() {
         //删除操作
         $http({
             method: 'DELETE',
             url: BasicUrl + "activity/" + id + "/member/" + userId,
             data: {
               id: id,
               userId: userId
             },
             transformRequest: function(obj) {
               var str = [];
               for (var p in obj) {
                 str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
               }
               return str.join("&");
             },
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             }
           })
           .success(function(data, xhr) {
             if (xhr == 200) {
               tool.alert("提示", "取消报名成功!");　
               //刷新当前页面.
               window.location.reload();
             } else {
               tool.alert("提示", "操作失败,请重试!");
             }
           }).error(function(response) {
             tool.alert("提示", response.errorMessage);
           });

       }, function() {});
     }

     //加载完毕后再显示 
     $scope.$watch("viewContentLoaded", function() {
       angular.element(".myload").removeClass("myload");
     });
   }]);

 })();

 /*预览图片*/
 function show(btn) {
   top.$('body').find(".jconfirm").hide();
   var frame = $('<div style="width:100%;height:100%;background:#000;opacity:0.8;z-index:10000;position:absolute;top:0;left:0"></div>').on('click', function() {
     top.$('body').find(".jconfirm").show();
     frame.remove();
     pic.remove();
   });
   var pic = $("<img style='max-width:80%;max-height:80%;z-index:15000;position:absolute;top:10%;left:50%' src='" + $(btn).attr('src') + "'>").on('click', function() {
     top.$('body').find(".jconfirm").show();
     frame.remove();
     pic.remove();
   });
   frame.appendTo(top.$('body'));
   pic.appendTo(top.$('body'));
   pic.css('margin-left', '-' + pic.css('width').substring(0, pic.css('width').indexOf('px')) / 2 + 'px');
 }

 function uploadPic(btn) {
   $("#imageRes").click();
 }
 /*上传图片*/
 function uploadImage() {
   var options = {
     dataType: 'json',
     success: function(data) {
       if (data.success == true) {
         tool.confirm("确定上传图片",
           "<img style='width:100%' src=" + data.bean + " onclick='show(this)'>",
           function() {
             //发请求对数据库进行修改
             var divId = $("#hidden_divname").val();
             $("#" + divId).find("img").eq(0).attr("src", data.bean);
           },
           function() {
             //删除缓存图片
             $.post(deletePic, {
               picurl: data.bean
             }, function(data) {});
           });
       } else {
         tool.alert('提示', '上传图片必须为JPG、PNG、JEPG', function() {});
       }
     }
   };
   $('#headForm').ajaxSubmit(options);
 }
 // 地图操作
 //打开地图窗口
 var locat = (window.location + '').split('/');
 $(function() {
   if ('tool' == locat[3]) {
     locat = locat[0] + '//' + locat[2];
   } else {
     locat = locat[0] + '//' + locat[2] + '/' + locat[3];
   };
 });
 $(hangge());
 $(hangge());
 var mb = myBrowser();
 var childX = "";
 var childY = "";
 //清除加载进度
 function hangge() {
   $("#jzts").hide();
 }

 function openMap() {
   var result = "";
   //解决Chrome浏览器不兼容showModalDialog问题
   if ("Chrome" == mb) {
     result = window.open("MapXY.html", "", "width=720px;height=500px;");
   } else {
     result = window.showModalDialog("MapXY.html", "", "dialogWidth=720px;dialogHeight=500px;");

     if (result == null || "" == result) {
       return;
     } else {
       result = result.split("-");
       console.log("zuobiao" + result);
       document.getElementById("coordinate").value = result[1] + ',' + result[0];
       $("#coordinate").val(result[1] + ',' + result[0]);
     }
   }
 }

 //Chrome浏览器关闭地图子窗口时将选取的坐标传回该父页面
 function getXYForChrome(x, y) {
   document.getElementById("coordinate").value = y + ',' + x;
   $("#coordinate").val(y + ',' + x);

 }

 function myBrowser() {
   var userAgent = navigator.userAgent;
   var isOpera = userAgent.indexOf("Opera") > -1;
   if (isOpera) {
     return "Opera";
   }; //判断是否Opera浏览器
   if (userAgent.indexOf("Firefox") > -1) {
     return "FF";
   } //判断是否Firefox浏览器
   if (userAgent.indexOf("Chrome") > -1) {
     return "Chrome";
   }
   if (userAgent.indexOf("Safari") > -1) {
     return "Safari";
   } //判断是否Safari浏览器
   if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
     return "IE";
   }; //判断是否IE浏览器
 }
 //地图操作END