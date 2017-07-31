 // 　　　　　　　　　　　　　　　　　　　　　　　　　
 // 　◆◆◆◆◆◆◆◆◆◆◆　　　　　　◆　　　　　　
 // 　◆　　　◆　　　　　◆　　　　　　◆　　　　　　
 // 　◆　　◆◆◆◆◆　　◆　　◆◆◆◆◆◆◆◆◆　　
 // 　◆　◆◆　　　◆　　◆　　　　　　◆　　　　　　
 // 　◆　　　◆◆◆　　　◆　　　◆◆◆◆◆◆◆　　　
 // 　◆◆◆◆　　　◆◆◆◆　　　　　　◆　　　　　　
 // 　◆　　　◆◆　　　　◆　◆◆◆◆◆◆◆◆◆◆◆　
 // 　◆　　　　　◆　　　◆　　　　　◆　◆　　　　　
 // 　◆　　◆◆　　　　　◆　　　　◆　　◆　　　◆　
 // 　◆　　　　◆◆　　　◆　　　◆◆　　　◆　◆　　
 // 　◆◆◆◆◆◆◆◆◆◆◆　◆◆　◆　◆　　◆　　　
 // 　◆　　　　　　　　　◆　　　　◆◆　　　　◆◆　

 var myChart = echarts.init(document.getElementById('main'));

 // 【04】指定图表的配置项和数据  
 //  var currentDate = getLocalTime(Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? Date.parse(new Date()) : Date.parse(new Date($("#txtEndTime").val()))).substr(0, 9);
 var currentDate = "";
 var option = {
   title: {
     text: '项目数据图',
     subtext: currentDate
   },
   tooltip: {
     trigger: 'axis'
   },
   // legend: {
   //   data: ['最高气温', '最低气温']
   // },
   toolbox: {
     show: true,
     feature: {
       mark: {
         show: true
       },
       dataView: {
         show: true,
         readOnly: false
       },
       magicType: {
         show: true,
         type: ['line', 'bar']
       }
     }
   },
   calculable: true,
   xAxis: [{
     type: 'category',
     boundaryGap: false,
     //  data: ["2017-4-23 14:13:04", "2017-4-23 10:19:05", "2017-4-23 10:19:02", "2017-4-23 10:18:22", "2017-4-10 21:50:11", "2017-3-21 10:34:09", "2017-3-10 15:26:32", "2017-3-7 23:57:29", "2017-3-6 22:58:11", "2017-3-6 12:02:00"]
     data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
   }],
   yAxis: [{
     type: 'value',
   }],
   series: [{
       name: '最大值',
       type: 'line',
       data: [],
       //  data: [",", "10", "10", "10", "10", "1", "3.6", "60,100", "60,100", "10"],

       markPoint: {
         data: [{
           type: 'max',
           name: '最大值'
         }, {
           type: 'min',
           name: '最小值'
         }]
       },
       markLine: {
         data: [{
           type: 'average',
           name: '平均值'
         }]
       }
     }
     // , {
     // name: '最大值',
     // type: 'line',
     // data: [132, 132, 112, 11, 122, 11, 19],

     // markPoint: {
     //   data: [{
     //     type: 'max',
     //     name: '最大值'
     //   }, {
     //     type: 'min',
     //     name: '最小值'
     //   }]
     // },
     // markLine: {
     //   data: [{
     //     type: 'average',
     //     name: '平均值'
     //   }]
     // }
     // }
   ]
 };

 myChart.setOption(option);

 // ****************************************
 // 　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
 // 　　◆◆◆◆◆　◆◆◆　　◆◆　　◆◆◆◆◆◆◆　◆◆◆◆　　◆◆　◆◆　
 // 　　　　◆　　◆　　　◆　　◆　　◆　　◆　　◆　　◆　　◆　　◆　◆　　
 // 　　　　◆　　◆　　　◆　　◆　　◆　　◆　◆　　　◆　　◆　　◆　◆　　
 // 　　　　◆　　◆　　　◆　　◆　　◆　　◆◆◆　　　◆◆◆　　　◆　◆　　
 // 　　　　◆　　◆　　　◆　　◆　　◆　　◆　◆　　　◆　◆　　　　◆　　　
 // 　　　　◆　　◆◆◆　◆　　◆　　◆　　◆　　　　　◆　　◆　　　◆　　　
 // 　　　　◆　　◆　　◆◆　　◆　　◆　　◆　　◆　　◆　　◆　　　◆　　　
 // 　　　　◆　　　◆◆◆　　　　◆◆　　◆◆◆◆◆　◆◆◆　◆◆　◆◆◆　　
 // 　◆　　◆　　　　　◆◆　　　　　　　　　　　　　　　　　　　　　　　　　
 // 　◆◆◆　　
 $(function() {
   // $(".start_end_time").datetimepicker();
   tool.changeSelect($("#userId"), false);
   // tool.changeSelect($("#itemId"), false);
   tool.changeSelect($("#from"), false);

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
     width: "150px",
     templateResult: formatRepo,
     templateSelection: formatRepoSelection,
   });


   // $("#itemId").select2({
   //   placeholder: '请选择',
   //   allowClear: true,
   //   ajax: {
   //     url: function(params) {
   //       //TODO 此处需要根据用户ID 来显示项目名称
   //       return BasicUrl + "vip/name/" + params.term;
   //     },
   //     dataType: 'json',
   //     delay: 250,
   //     processResults: function(data, page) {
   //       return {
   //         results: data
   //       };
   //     },
   //     cache: false
   //   },
   //   minimumInputLength: 1,
   //   minimumResultsForSearch: 1,
   //   width: "150px",
   //   templateResult: formatRepo,
   //   templateSelection: formatRepoSelection,
   // });

   function formatRepo(repo) {
     return repo.realName;
   }

   function formatRepoSelection(repo) {
     return repo.realName;
   }
 });


 //     　　　　　　　　　　　　　　　　　　　　　　
 // 　　　　　◆◆◆　　　　◆◆◆　　　◆◆◆　
 // 　　　　◆◆◆◆　　　　◆◆◆◆　　◆◆◆　
 // 　　　　◆◆◆◆　　　　◆◆◆◆　　◆◆◆　
 // 　　　　◆◆◆◆◆　　　◆◆◆◆◆　◆◆◆　
 // 　　　◆◆◆◆◆◆　　　◆◆◆◆◆　◆◆◆　
 // 　　　◆◆◆◆◆◆　　　◆◆◆◆◆　◆◆◆　
 // 　　　◆◆◆◆◆◆◆　　◆◆◆◆◆◆◆◆◆　
 // 　　　◆◆◆　◆◆◆　　◆◆◆◆◆◆◆◆◆　
 // 　　◆◆◆◆◆◆◆◆　　◆◆◆　◆◆◆◆◆　
 // 　　◆◆◆　　◆◆◆◆　◆◆◆　◆◆◆◆◆　
 // 　　◆◆◆　　◆◆◆◆　◆◆◆　◆◆◆◆◆　
 // 　◆◆◆◆　　　◆◆◆　◆◆◆　　◆◆◆◆　
 // 　◆◆◆　　　　◆◆◆　◆◆◆　　◆◆◆◆　
 // 　◆◆◆　　　　◆◆◆◆◆◆◆　　　◆◆◆　
 //  itemId=&userId=1&from=&minCreatedAt=&maxCreatedAt=&
 var params = ""; //全局变量  请求的参数
 var app = angular.module('myApp', []);
 app.controller('customersCtrl', function($scope, $http) {
   $scope.showTable = false;
   $scope.tabledata = [];
   $scope.timedata = [];
   //分页方法声明



   var pageing = function(pageindex, params) {

     var url = BasicUrl + "item?page=0&pageNum=1000";
     // $http.get(url).success(function(data) {
     //   if (data != null && data != "" && data != "null") {
     //     $scope.options = data.content;
     //   }

     //TODO  需要修改部分
     var url = BasicUrl + "data?" + params + "page=" + pageindex + "&pageNum=10"; //请求的参数和地址
     $http.get(url).success(function(data) {
       if (data != null && data != "" && data != "null") {
         $scope.dataLengths = data.content.length > 0; //判断当前是否存在记录
         if (data.content != null && data.content.length > 0) {
           //赋值操作
           $scope.data = data;
           $scope.totalPage = data.totalPages;
           $scope.totalRecord = data.totalElements;
           //清空数据
           $scope.tabledata = [];
           $scope.timedata = [];
           var arrayData = data.content;
           //按时间排序下
           arrayData.sort(function(a, b) {
             return a.createAt > b.createAt;
           })
           for (var i = 0; i < data.content.length; i++) {
             var singledata = data.content[i];
             //重新添加数据
             $scope.tabledata.push(singledata.val);
             $scope.timedata.push(getLocalTime(singledata.createAt));

           }

           //调用生成分页方法
           //  initPageDiv($("#alreadyPage"), pageindex + 1, data.totalPages, 5, $("#currentPage"), function() {
           //    pageing($("#currentPage").val() - 1, params);
           //  });


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
           $scope.dataLengths = 0;
           // tool.alert("提示", "当前条件下未获取到数据");
         }
       }
     }).error(function(data) {
       //处理响应失败
       if (data && data.errorMessage) {
         tool.alert("提示", data.errorMessage);
       }
     });
     // });
   }
   var obj = new UrlSearch();

   if (obj.itemId && obj.userId) {

     params = "";
     if (obj.itemId) {
       params = "itemId=" + obj.itemId + "&";
     }
     if (obj.userId) {
       params += "userId=" + obj.userId + "&";
     }

     $scope.currentItemId = obj.itemId;
     pageing(0, params);
   };


   $http.get(BasicUrl + "item?page=0&pageNum=1000").success(function(data) {
     if (data != null && data != "" && data != "null") {
       $scope.Itemoptions = data.content;
       tool.changeSelect($("#itemId"), true);
     }
   });
   //分页方法
   // pageing(0, params);
   //查询按钮
   $scope.search = function() {
       //起始时间时间戳
       var minExpiredAt = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime").val()));
       //结束时间时间戳
       var maxExpiredAt = Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtEndTime").val()));
       //用户名称
       var userId = $("#userId").val();
       //会员类型
       var from = $("#from").val();
       var itemId = $("#itemId").val();

       //校验只有一个搜索条件
       if (!(minExpiredAt || maxExpiredAt || from || itemId)) {
         tool.alert("提示", "请至少选择一项搜索条件");
         return false;
       }
       if (!userId) {
         tool.alert("提示", "请选择会员姓名后再进行查询");
         return false;
       }
       //起止日期校验
       if (!minExpiredAt && !maxExpiredAt) {
         if (minExpiredAt > maxExpiredAt) {
           tool.alert("提示", "结束时间不得早于起始时间");
           return false;
         }
       }
       if (!itemId) {
         tool.alert("提示", "请选择项目后再进行查询！");
         return false;
       }
       params = "";
       if (itemId) {
         params = "itemId=" + itemId + "&";
       }
       if (userId) {
         params += "userId=" + userId + "&";
       }
       if (from) {
         params += "from=" + from + "&";
       }
       if (minExpiredAt) {
         params += "minCreatedAt=" + minExpiredAt + "&";
       }
       if (maxExpiredAt) {
         params += "maxCreatedAt=" + maxExpiredAt + "&";
       }

       pageing(0, params);
     }
     //跳转至某页方法
     //跳转至某页方法
   $scope.skip = function() {
     if ($scope.toPageValue <= 1) {
       $scope.toPageValue = 1;
     } else if ($scope.toPageValue > $scope.totalPage) {
       $scope.toPageValue = $scope.totalPage;
     }
     pageing($scope.toPageValue - 1, params);
   }

   $scope.compare = function() {
     $scope.showTable = !$scope.showTable;
     //显示折线图
     option.xAxis[0].data = $scope.timedata;
     option.series[0].data = $scope.tabledata;
     myChart.setOption(option);

   }

   $scope.selected = [];
   $scope.isChecked = function(x) {
     return $scope.selected.indexOf(x) >= 0;
   };
   $scope.updateSelection = function($event, x) {
     var checkbox = $event.target;
     var checked = checkbox.checked;
     if (checked) {
       $scope.selected.push(x);
       console.log($scope.selected.join(','));
     } else {
       var idx = $scope.selected.indexOf(x);
       $scope.selected.splice(idx, 1);
       console.log($scope.selected.join(','));
     }
   };

   //加载完毕后再显示 
   $scope.$watch("viewContentLoaded", function() {
     angular.element(".myload").removeClass("myload");
   });
 });


 function getLocalTime(tm) {
   var tt = new Date(parseInt(tm)).toLocaleString('chinese', {
     hour12: false
   }).replace(/\//g, "-");
   return tt;
 }