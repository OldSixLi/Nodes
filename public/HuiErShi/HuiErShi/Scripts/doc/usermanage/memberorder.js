 $(function() {
   tool.changeSelect($("#sltDistrict"), false);

   //  shown.bs.modal

   $('#modal').on('shown.bs.modal', function() {
     // 执行一些动作...
     if ($("#modaltxtStartTime").hasClass('unconfirmed')) {
       // alert('a')
       $("#modaltxtStartTime").val('');
     }
   })
 });　

 var params = ""; //全局变量
 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {
   $scope.starttime = "";
   // $scope.$watch('starttime', function() {
   //   console.log($scope.starttime);
   // });


   $http.get(BasicUrl + "appointmentItems/All").success(function(data) {
     if (data != null && data != "" && data != "null") {
       $scope.options = data;
     }
     tool.changeSelect($("#sltItem"), false);
   });
   var adminData = new getAdmin();
   var roleType = adminData.role;
   //分页方法声明
   var pageing = function(pageindex, params) {

     // /appointmentItems/All
     //请求地址 
     var url = BasicUrl + "appointment?" + params + "page=" + pageindex + "&pageNum=10"; //请求的参数和地址
     if (roleType != "0") {
       //添加专家 会籍顾问身份只看自己下面会员数据的功能
       url += "&adviserId=" + adminId();
     }
     $http.get(url).success(function(data) {
       if (data != null && data != "" && data != "null") {
         //判断当前是否存在记录
         $scope.dataLengths = data.content.length > 0;
         if (data.content != null && data.content.length > 0) {
           //赋值操作
           $scope.title = 'time';
           $scope.desc = 0;
           $scope.data = data;
           $scope.totalPage = data.totalPages;
           $scope.totalRecord = data.totalElements;
           initPageDiv($("#alreadyPage"),
             pageindex + 1,
             data.totalPages,
             5,
             $("#currentPage"),
             function() {
               pageing($("#currentPage").val() - 1, params);
             });
         } else {
           // tool.alert("提示", "未获取到数据，请重试!");
         }
       }
     });
   }

   //分页方法
   pageing(0, params);

   //点击变为已完成
   $scope.menberSignUp = function(id) {
     tool.confirm(
       "提示",
       "是否确认签到？",
       function() {
         //用户点击确认按钮时操作
         $.ajax({
           type: "PATCH",
           url: BasicUrl + "appointment/" + id,
           data: {
             adminId: 1,
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
               if (xhr.responseText && JSON.parse(xhr.responseText)) {
                 tool.alert("提示", JSON.parse(xhr.responseText).errorMessage);
               } else {

                 tool.alert("提示", "签到成功！", function() {
                   //刷新当前页面.
                   window.location.reload();
                 });
               }

             }
           }
         });
       },
       function() {});
   }

   $scope.hasSignIn = function() {
     tool.alert("提示", "会员已签到，无法再进行预约确认!");
   }

   //查询按钮
   $scope.search = function() {
     //参数赋值
     var minExpiredAt = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime").val()));
     var maxExpiredAt = Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtEndTime").val()));
     var keyword = $("#txtKeyWord").val();
     var status = $("#sltDistrict").val();
     //会员类型
     var sltItem = $("#sltItem").val();
     //校验只有一个搜索条件
     if (!(minExpiredAt || maxExpiredAt || keyword || status || sltItem)) {
       tool.alert("提示", "请至少输入一个搜索条件");
       return false;
     }
     //起止日期校验
     if (minExpiredAt && maxExpiredAt && (minExpiredAt > maxExpiredAt)) {
       tool.alert("提示", "预约日期截止时间不得早于起始时间");
       return false;
     }
     params = '';
     if (minExpiredAt) {
       params += "minAppointAt=" + minExpiredAt + '&';;
     }
     if (maxExpiredAt) {
       params += "maxAppointAt=" + maxExpiredAt + '&';
     }
     if (status) {
       params += "status=" + status + '&';
     }
     if (sltItem) {
       params += "item=" + sltItem + '&';
     }
     if (keyword) {
       params += "keyword=" + keyword + '&';
     }
     pageing(0, params);

   }

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

   //跳转至某页方法
   $scope.skip = function() {
     if ($scope.toPageValue <= 1) {
       $scope.toPageValue = 1;
     } else if ($scope.toPageValue > $scope.totalPage) {
       $scope.toPageValue = $scope.totalPage;
     }
     pageing($scope.toPageValue, params);
   }

   //表格内名称点击弹出模态框修改
   $scope.getEditModel = function(id) {
     //获取相关信息
     $scope.orderId = id;
     $http.get(BasicUrl + "appointment/id?id=" + id)
       .success(function(data) {
         if (data != null && data != "" && data != "null") {
           $scope.models = data;
           $scope.currentStatus = data.status;
           //  appointmentItems
           $scope.selectedItem = {

           };
           if (data.appointmentItems && data.appointmentItems.length > 0) {
             $.each(data.appointmentItems, function(i, val) {
               if (val.id) {
                 //  console.log(val.id)
                 $scope.selectedItem['item' + val.id] = true;
               }

             })
           }
           var userid = data.user.id;
           $http.get(BasicUrl + "vip/" + userid).success(function(data) {
             if (data != null && data != "" && data != "null" && data.id) {
               $scope.userData = data;
             } else {}
           }).error(function(data, header, config, status) {

           });
           $('#modal').modal('show');
         }
       }).error(function() {
         tool.alert("提示", "获取信息出错，无法编辑此数据！");
         $('#modal').modal('hide');
         $scope.isSave = true;
       });
   }

   //根据项目搜索
   $scope.searchAsItem = function(itemId) {
     $("#sltItem").val(itemId);
     tool.changeSelect($("#sltItem"), true);
     params = "item=" + itemId + '&';
     pageing(0, params);
   }

   //添加支付
   $scope.save = function() {
     var item = [];
     $('[name="orderItem"]').each(function() {
       if ($(this).is(":checked")) {
         item.push($(this).val());
       }
     });
     var minExpiredAt = Date.parse(new Date($("#modaltxtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#modaltxtStartTime").val()));
     //  alert(minExpiredAt)
     if (!minExpiredAt) {
       tool.alert("提示", "请选择确认日期");
       return false;
     }
     var data = {
       id: $scope.orderId,
       itemId: item.join(','),
       // itemId: "",
       adminId: adminId(),
       comment: $("#remark").val().trim(),
       confirmAt: minExpiredAt
     }

     var status = $scope.currentStatus == 'unconfirmed'


     $http({
         method: 'POST',
         url: BasicUrl + "appointment/" + $scope.orderId,
         data: data,
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
           if (data.errorMessage) {
             tool.alert("提示", data.errorMessage);
           } else {
             tool.alert("提示", "操作成功!");　
             //刷新当前页面.
             window.location.reload();
           }

         } else {
           tool.alert("提示", "操作失败,请重试!");
         }
       }).error(function(response) {
         tool.alert("提示", response.errorMessage);
       });
   }

   //加载完毕后再显示 
   $scope.$watch("viewContentLoaded", function() {
     angular.element(".myload").removeClass("myload");
   });
 });