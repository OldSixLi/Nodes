 $(document).ready(function() {
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
         // $("#img").attr("src", imgSrc);
         // $("[name='iconUrl']").val(imgSrc);
         //     <div class="img-block">
         //   <a class="close-link" href="#" title="删除此照片"><b>x </b></a>
         //   <img src='http://iph.href.lu/140x100?text=文字说明' class='img-responsive' alt='自定义'>
         // </div>



         var htmlStr =
           '<div class="img-block">\
                    <a class="close-link" href="#" title="删除此照片"><b>x </b></a>\
                    <img src=' + imgSrc + ' class="img-responsive img-thumbnail"  alt="自定义">\
                </div>';
         $("#picBlock").append(htmlStr);
       },
       'Error': function(up, err, errTip) {
         tool.alert("提示", errTip);
       },
       'Key': function(up, file) {
         return file.name;
       }
     }
   });


   uploader = Qiniu.uploader({
     runtimes: 'html5,flash,html4',
     browse_button: 'pickfiles1', //上传按钮的ID
     container: 'btn-uploader1', //上传按钮的上级元素ID
     drop_element: 'btn-uploader1',
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
         $("#pickfiles1").attr("src", imgSrc);
         $("#itemImg").val(imgSrc);
       },
       'Error': function(up, err, errTip) {
         tool.alert("提示", errTip);
       },
       'Key': function(up, file) {
         return file.name;
       }
     }
   });　
 });
 $(function() {
   $(".close-link").on("click", function(e) {
     // console.log(e);
     // alert($(this).html())
     $(this).parent().remove();
   });

   ItemClick();
 });

 // $(".close-link").on;

 // keyWord=&adviserId=&minCreatedAt=&maxCreatedAt=
 var params = ""; //全局变量  请求的参数
 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {
   $scope.isuse = "1";
   $scope.itemDetail = {}
   $scope.isEditItem = 0;
   $scope.data = {
     name: '',
     reportFrom: ''

   }
   var obj = new UrlSearch();

   if (obj.reportId) {
     $scope.reportId = obj.reportId;
     $scope.userId = obj.userid;
   } else {
     $scope.reportId = "";
     $scope.userId = "";
   }
   // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆   
   // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
   // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
   // ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
   $http.get(BasicUrl + "view").success(function(data) {
     if (data != null && data != "" && data != "null") {
       $scope.options = data;
       tool.changeSelect($("#dataView"), true);
     }
   });

   $http.get(BasicUrl + "item?page=0&pageNum=1000").success(function(data) {
     if (data != null && data != "" && data != "null") {
       $scope.Itemoptions = data.content;
       tool.changeSelect($("#allItem"), true);
     }
   });
   $scope.itemClassItemId = '';
   var checkObj = new UrlSearch();
   if (checkObj.id) {
     //请求参数
     var url = BasicUrl + "inspection/" + checkObj.id;
     $http.get(url).success(function(data) {
       if (data != null && data != "" && data != "null" && data.id) {
         $scope.data = data;
         $scope.picNum = data.picUrl.length;
         $scope.picIndex = 0;
         $scope.reason = data.loadFailedReason;
         $scope.HaveOptions = data.itemDataEntities;

       } else {
         tool.alert("提示", data.errorMessage);
       }

     }).error(function(data, header, config, status) {
       //处理响应失败
       tool.alert("提示", "获取数据出错,请重试或联系网站管理员。");
       window.location.href = "CheckLists.html";
     });
   } else {
     // alert(213)
     // tool.alert("提示", "获取参数出错，请重试！", function() {});
     // window.history.back(-1);
   }
   $scope.nextImage = function() {
     if ($scope.picIndex < $scope.picNum - 1) {
       $scope.picIndex++;
     } else {
       $scope.picIndex = $scope.picNum - 1;
     }
   }

   $scope.prevImage = function() {
     if ($scope.picIndex > 0) {
       $scope.picIndex--;
     } else {
       $scope.picIndex = 0;
     }
   }

   //无效
   $scope.notUseClick = function() {
     if (!$('input:radio[name="reason"]:checked').val()) {
       tool.alert("提示", "请选择失效原因！");
       return false;
     }

     var minExpiredAt = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime").val()));

     $.ajax({
       type: "PATCH",
       url: BasicUrl + 'inspection/' + checkObj.id,
       data: {
         id: checkObj.id,
         isValid: false,
         inspectionNo: $("#inspectionNo").val(),
         name: $scope.data.name,
         reportFrom: $("#reportFrom").val(),
         checkAt: minExpiredAt,
         invalidReason: $('input:radio[name="reason"]:checked').val()
       },
       dataType: "json",
       error: function(response) {
         if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse(response.responseText).errorMessage) {
           tool.alert("提示", JSON.parse(response.responseText).errorMessage);
         }
       },
       success: function(data) {

       },
       complete: function(xhr, textStatus) {
         if (xhr.status == 204 || xhr.status == 200) {
           if (xhr.responseText && JSON.parse(xhr.responseText) && JSON.parse(xhr.responseText).errorMessage) {
             tool.alert("提示", JSON.parse(xhr.responseText).errorMessage);
           } else {
             tool.alert("提示", "保存成功", function() {
               //刷新当前页面.
               window.location.href = "VipReport/CheckLists.html";
             });
           }
         }
       }
     });
   }

   //合并
   $scope.merge = function() {
     tool.confirm(
       "提示",
       "确认合并报告单？",
       function() {
         //用户点击确认按钮时操作
         var minExpiredAt = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime").val()));
         if (!$("#inspectionNo").val()) {
           tool.alert("提示", "请填写报告单号后再进行合并！");
           return false;
         }
         $.ajax({
           type: "PATCH",
           url: BasicUrl + 'inspection/merge',
           data: {


             reportId2: $("#inspectionNo").val(),
             reportId1: checkObj.id
               //  id: checkObj.id,
               //  isValid: true,
               //  inspectionNo: $("#inspectionNo").val(),
               //  name: $scope.data.name,
               //  reportFrom: $("#reportFrom").val(),
               //  checkAt: minExpiredAt,
               //  invalidReason: "无"
           },
           dataType: "json",
           error: function(response) {
             if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse(response.responseText).errorMessage) {
               tool.alert("提示", JSON.parse(response.responseText).errorMessage);
             }
           },
           success: function(data) {},
           complete: function(xhr, textStatus) {
             if (xhr.status == 204 || xhr.status == 200) {
               if (xhr.responseText && JSON.parse(xhr.responseText) && JSON.parse(xhr.responseText).errorMessage) {
                 tool.alert("提示", JSON.parse(xhr.responseText).errorMessage);
               } else {
                 tool.alert("提示", "合并成功", function() {
                   //刷新当前页面.
                   // window.location.reload();
                   window.location.href = "VipReport/CheckLists.html";
                 });
               }
             }
           }
         });
       },
       function() {});
   }

   $scope.seeDetail = function(url) {
     tool.alert("图片详情", "<img src='" + url + "' class='img-responsive img-thumbnail' style='max-width:800px;width:auto;height:auto;margin:0 auto;'/>", function() {}, 'col-md-10 col-md-offset-1 imgContent');
   }

   //新建报告单
   $scope.addNew = function() {
     var minExpiredAt = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime").val()));
     // var checkId = checkObj.id;
     // var itemId = $scope.itemDetail.itemId;
     // var val = $scope.itemDetail.value;
     var checkObj = new UrlSearch();
     //TODO 添加非空校验 验单名称、时间、来源


     // 直接在该页面新建
     if (!$scope.reportId) {
       var dataInfo = {
         isValid: true,
         reportId: $scope.reportId,
         name: $scope.data.name,
         userId: $scope.data.user.id,
         reportFrom: $("#reportFrom").val(),
         checkAt: minExpiredAt,
         picUrls: $scope.data.picUrl.join(',')
       }
       $http({
           method: 'PATCH',
           url: BasicUrl + "inspection/" + checkObj.id,
           data: dataInfo,
           transformRequest: function(obj) {
             var str = [];
             for (var p in obj) {
               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
             }
             return str.join("&");
           },
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
           },
         })
         .success(function(data, xhr) {
           if (xhr == 200 || xhr == 204) {
             if (data.errorMessage) {
               tool.alert("提示", data.errorMessage);
             } else {
               tool.alert("提示", "新建报告单成功!");
               if (!$scope.reportId) {
                 window.location.href = "CheckLists.html";
               } else {
                 window.location.href = "MemberReportInfo.html?id=" + $scope.reportId;
               }
             }

           } else {
             tool.alert("提示", "保存失败,请重试!");
           }
         }).error(function(response) {
           if (response && response.errorMessage) {
             tool.alert("提示", response.errorMessage);
           }
         });

     } else {
       //从会员报告详情页面进入
       var imgArr = [];
       $("#picBlock").find("img").each(function() {
         imgArr.push($(this).attr("src"));
       })
       var dataInfo = {
         isValid: true,
         reportId: $scope.reportId,
         name: $scope.data.name,
         userId: $scope.userId,
         reportFrom: $("#reportFrom").val(),
         checkAt: minExpiredAt,

         // picUrls: $scope.data.picUrl.join(',')
         picUrls: imgArr.join(',')
       }

       if (!imgArr) {
         tool.alert("提示", "请上传相关的验单图片！");
         return false;
       }

       $http({
           method: 'POST',
           url: BasicUrl + "inspection",
           data: dataInfo,
           transformRequest: function(obj) {
             var str = [];
             for (var p in obj) {
               str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
             }
             return str.join("&");
           },
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
           },
         })
         .success(function(data, xhr) {
           if (xhr == 200 || xhr == 204) {
             if (data.errorMessage) {
               tool.alert("提示", data.errorMessage);
             } else {
               tool.alert("提示", "新建报告单成功!");
               if (!$scope.reportId) {
                 window.location.href = "CheckLists.html";
               } else {
                 window.location.href = "MemberReportInfo.html?id=" + $scope.reportId;
               }
             }

           } else {
             tool.alert("提示", "保存失败,请重试!");
           }
         }).error(function(response) {
           if (response && response.errorMessage) {
             tool.alert("提示", response.errorMessage);
           }
         });

     }
   }

   /**
    * 多项项目导入验单（左侧按钮）
    * @returns
    */
   $scope.viewItemAdd = function() {
     $scope.itemDetail = null;
     var viewID = $("#dataView").val();
     if (!viewID) {
       tool.alert("提示", "请选择数据视图后再进行操作");
       return false;
     }
     //获取当前视图下的项目内容
     $http.get(BasicUrl + "view/" + viewID).success(function(data) {
       if (data != null && data != "" && data != "null") {
         $scope.itemList = data.items;
         for (var index = 0; index < data.items.length; index++) {
           var element = data.items[index];
           //闭包传入index
           (function(i) {
             var dataInfo = {
               id: checkObj.id,
               itemId: data.items[i].itemId,
               val: "0"
             }
             setTimeout(function() {
               islast = (i == data.items.length - 1)
               $scope.createItem(dataInfo, islast);
             }, 500 * i);
           })(index);
         }
       }
     });

   }

   /**
    * 添加项目到当前验单中
    * @returns
    */
   $scope.createItem = function(dataInfo, islast) {
     $http({
         method: 'POST',
         url: BasicUrl + "inspection/" + dataInfo.id + "/data",
         data: dataInfo,
         async: false,
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
         if (xhr == 200 || xhr == 202) {
           if (islast) {
             window.location.reload();
           }
         } else {}
       }).error(function(response) {
         if (response && response.errorMessage) {}
       })
   }

   //获取视图下  某个数据项目的详情
   $scope.getItemDetail = function(id) {
     $scope.itemClassItemId = id;
     $http.get(BasicUrl + "item/" + id).success(function(data) {
       if (data != null && data != "" && data != "null") {
         //数据不为空
         $scope.itemDetail = data;
       }
     }).error(function() {
       tool.alert("提示", "获取数据出错！");
     });
   }

   $scope.getEditItemDetail = function(id, value, item_Inspe_id) {
     $scope.itemClassItemId = id;
     $http.get(BasicUrl + "item/" + id).success(function(data) {
       if (data != null && data != "" && data != "null") {
         //数据不为空
         $scope.itemDetail = data;
         $scope.isEditItem = 1;
         $scope.itemDetail.value = value;
         //当前验单下的项目ID（全局唯一）
         $scope.editItemId = item_Inspe_id;
         $scope.currentImg = value;
         //  alert(data.val)
         $scope.currentItemType = data.type; //当前修改项目的类型 ，用于控制右侧显示的内容
         $scope.currentItemSelections = data.selections ? data.selections.split(',') : []; //选择类型下的值
         $scope.currentIsRadio = data.radio; //是否为单选 ，0-可多选，1-只能单选
         if (data.type == 3) {
           //时间
           if (value) {
             if (data.radio) { //单选
               $scope.currentItemRadio = value;
             } else {
               $scope.itemList = {};
               var selectedArr = value.split(',');
               for (var index = 0; index < selectedArr.length; index++) {
                 var element = selectedArr[index];
                 $scope.itemList[element] = element;
               }

             }

           }
         }

         if (data.type == 4) {
           //阴阳类型
           if (value) {
             $scope.multiVal = value;
           }
         }
         if (data.type == 6) {
           //阴阳类型
           if (value) {
             $scope.yinyang = value.charAt(0);
             $scope.balanceVal = value.substring(1); //阴阳型的值
           }
         }
         if (data.type == 7) {
           //时间
           if (value) {
             $scope.currentItemTime = value;
           }
         }



       }
     }).error(function() {
       tool.alert("提示", "获取数据出错！");
     });
   }

   //获取右侧单项数据项目详情
   $scope.getSingleItemDetail = function() {
     var id = $("#allItem").val();
     $http.get(BasicUrl + "item/" + id).success(function(data) {
       if (data != null && data != "" && data != "null") {
         //数据不为空
         $scope.itemDetail = data;
         $scope.multiVal = ""; //清空值
         $scope.isEditItem = 0;
         $scope.currentItemType = data.type; //当前修改项目的类型 ，用于控制右侧显示的内容
         $scope.currentItemSelections = data.selections ? data.selections.split(',') : []; //选择类型下的值
         $scope.currentIsRadio = data.radio; //是否为单选 ，0-可多选，1-只能单选

       }
     }).error(function() {
       tool.alert("提示", "获取数据出错！");
     });
   }

   //保存单个项目
   $scope.saveItem = function() {
     var checkId = checkObj.id;
     var itemId = $scope.itemDetail.itemId;
     var val = $scope.itemDetail.value;

     //  <!--1-数值型，2-文本型，3-选择型，4-多值型 ,5-图片型，6-阴阳型，7-时间型-->
     switch ($scope.currentItemType) {
       // 选择型
       case 3:
         if ($scope.currentIsRadio) { //radio类型
           var radioVal = $('input:radio[name=radioItem]:checked').val();
           val = radioVal;
         } else {
           var item = [];
           $('[name="checkItem"]').each(function() {
             if ($(this).is(":checked")) {
               item.push($(this).val());
             }
           });
           if (item.length <= 0) {
             tool.alert("提示", "请选择数据后再进行保存操作！");
             return false;
           }
           val = item.join(',');
         }
         break;
         //多数值型
       case 4:
         var vals = [];
         $('.multi-input').each(function(index, element) {
           // element == this
           if ($(element).val()) {
             vals.push($(element).val());
           }
         });

         if (vals.length != $scope.itemDetail.subItemName.split(',').length) {
           tool.alert("提示", "请完善信息后再进行操作！");

           return false;
         }
         val = vals.join(',');
         break;


         //  图片型
       case 5:
         val = $("#itemImg").val();
         if (!val) {
           tool.alert("提示", "请上传图片后再进行保存操作！");
           return false;
         }
         break;
         //  阴阳型
       case 6:
         if (!$("#balanceVal").val()) {
           tool.alert("提示", "请输入数据后再进行操作！");
           return false;
         }
         var val = $("#sltBalance").val() + $("#balanceVal").val();
         break;
         //  时间型
       case 7:
         val = $("#itemTime").val();
         if (!val) {
           tool.alert("提示", "请选择日期后再进行操作！");
           return false;
         }
         break;
       default:
         break;
     }
     var dataInfo = {
       id: checkId,
       itemId: itemId,
       val: val
     }
     $http({
         method: 'POST', //inspection/2/data
         url: BasicUrl + "inspection/" + checkId + "/data",
         data: dataInfo,
         transformRequest: function(obj) {
           var str = [];
           for (var p in obj) {
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
           }
           return str.join("&");
         },
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
         },
       })
       .success(function(data, xhr) {
         if (xhr == 200) {
           if (data.errorMessage) {
             tool.alert("提示", data.errorMessage);
           } else {
             tool.alert("提示", "保存成功!");
             //刷新当前页面.
             window.location.reload();
             // $scope.itemDetail.value = "";
           }

         } else {
           tool.alert("提示", "保存失败,请重试!");
         }
       }).error(function(response) {
         if (response && response.errorMessage) {
           tool.alert("提示", response.errorMessage);
         }
       });

   }

   //保存相关修改
   $scope.editItem = function() {
     //这个ID和itemId不是一个值
     var id = $scope.editItemId;
     var val = $scope.itemDetail.value;
     //  <!--1-数值型，2-文本型，3-选择型，4-多值型 ,5-图片型，6-阴阳型，7-时间型-->
     switch ($scope.currentItemType) {
       // 选择型
       case 3:
         if ($scope.currentIsRadio) { //radio类型
           var radioVal = $('input:radio[name=radioItem]:checked').val();
           val = radioVal;
         } else {
           var item = [];
           $('[name="checkItem"]').each(function() {
             if ($(this).is(":checked")) {
               item.push($(this).val());
             }
           });
           if (item.length <= 0) {
             tool.alert("提示", "请选择数据后再进行保存操作！");
             return false;
           }
           val = item.join(',');
         }
         break;
         //多数值型
       case 4:
         var vals = [];
         $('.multi-input').each(function(index, element) {
           // element == this
           if ($(element).val()) {
             vals.push($(element).val());
           }
         });
         if (vals.length != $scope.itemDetail.subItemName.split(',').length) {
           tool.alert("提示", "请完善信息后再进行操作！");
           return false;
         }

         val = vals.join(',');
         break;



         //  图片型
       case 5:
         val = $("#itemImg").val();
         if (!val) {
           tool.alert("提示", "请上传图片后再进行保存操作！");
           return false;
         }
         break;
         //  阴阳型
       case 6:
         if (!$("#balanceVal").val()) {
           tool.alert("提示", "请输入数据后再进行操作！");
           return false;
         }
         var val = $("#sltBalance").val() + $("#balanceVal").val();
         break;
         //  时间型
       case 7:
         val = $("#itemTime").val();
         if (!val) {
           tool.alert("提示", "请选择日期后再进行操作！");
           return false;
         }
         break;
       default:
         break;
     }



     if (!val) {
       tool.alert("提示", "请输入数据后再进行操作！");
       return false;
     }

     var dataInfo = {
       id: id,
       val: val
     }
     $http({
         method: 'PATCH', //inspection/2/data
         url: BasicUrl + "inspection/" + id + "/itemData",
         data: dataInfo,
         transformRequest: function(obj) {
           var str = [];
           for (var p in obj) {
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
           }
           return str.join("&");
         },
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
         },
       })
       .success(function(data, xhr) {
         if (xhr == 200) {
           if (data.errorMessage) {
             tool.alert("提示", data.errorMessage);
           } else {
             tool.alert("提示", "保存成功!");
             //刷新当前页面.
             window.location.reload();
             // $scope.itemDetail.value = "";
           }

         } else {
           tool.alert("提示", "保存失败,请重试!");
         }
       }).error(function(response) {
         if (response && response.errorMessage) {
           tool.alert("提示", response.errorMessage);
         }
       });
   }

   //加载完毕后再显示 
   $scope.$watch("viewContentLoaded", function() {
     angular.element(".myload").removeClass("myload");
   });
 });

 /**
  * 为li标签点击创建事件
  * 
  */
 function ItemClick() {
   $(".item-list").on('click', 'li', function() {
     $(".item-list li").removeClass('item-active');
     $(this).addClass('item-active');
   });
 }