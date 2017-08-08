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
 var currentDate = "2017-04-25";
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
     data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '七月', '八月', '九月', '十月', '十一月', '十二月']
   }],
   yAxis: [{
     type: 'value',
   }],
   series: [{
       name: '最大值',
       type: 'line',
       data: [11, 11, 15, 13, 12, 13, 10],

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
   tool.changeSelect($("#tag"), false);
   tool.changeSelect($("#viewId"), false);
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
 var params = ""; //全局变量
 var basicUrl = "http://healthshare.com.cn:80/admin/api/"; //统一接口地址
 //  
 var params = "&viewId=&tag=&from=&"; //请求参数变量
 var app = angular.module('myApp', []);
 var projectObj = new UrlSearch();

 app.controller('customersCtrl', function($scope, $http) {
   $scope.showTable = false;
   var url = BasicUrl + "tag";
   $http.get(url).success(function(data) {
     if (data != null && data != "" && data != "null") {
       $scope.tag = data;
     }
   });


   //分页方法声明
   var pageing = function(pageindex, params) {
     //如果存在项目ID
     projectObj.id = 'DBZ';
     if (projectObj.id) {
       var url = basicUrl + "dataView?" + params + "page=" + pageindex + "&pageNum=10"; //请求地址
       $http.get(url).success(function(data) {
         if (data != null && data != "" && data != "null") {
           $scope.dataLengths = data.content.length > 0; //判断当前是否存在记录
           if (data.content != null && data.content.length > 0) {
             //赋值操作
             $scope.data = data;
             $scope.totalPage = data.totalPages;
             $scope.totalRecord = data.totalElements;

             //调用生成分页方法
             initPageDiv($("#alreadyPage"), pageindex + 1, data.totalPages, 5, $("#currentPage"), function() {
               pageing($("#currentPage").val() - 1, params);
             });
           } else {
             $scope.dataLengths = 0;
             // tool.alert("提示", "当前条件下未获取到数据");
           }
         }
       }).error(function(data) {
         //处理响应失败
         // tool.alert("提示", "获取数据出错,请重试或联系网站管理员。");
       });
       //视图标签赋值
     } else {
       //不存在项目ID
       // window.history.back(-1);
       tool.alert("提示", "当前项目数据参数错误!");
     }
   }

   $http.get(BasicUrl + "tag").success(function(data) {
     if (data != null && data != "" && data != "null") {
       $scope.tag = data;
     }
   });

   $http.get(BasicUrl + "view").success(function(data) {
     if (data != null && data != "" && data != "null") {
       $scope.views = data;

       for (var index = 0; index < data.length; index++) {
         var element = data[index];

       }
     }
   });

   //分页方法
   //  pageing(0, params);
   $scope.compare = function() {

     if ($scope.selected.length != 0) {
       $scope.showTable = true;
     } else {
       $scope.showTable = false;
       tool.alert("提示", "请选择数据后再进行比较");
     }
   }
   $scope.isInArray = function(val, arr) {
     return $.inArray(val, arr);
   }
   $scope.redirectRecord = function(itemId, userId) {

     var url = "RecordList.html?itemId=" + itemId + "&userId=" + userId;
     window.location.href = url;
   }

   //查询按钮
   $scope.search = function() {
       //TODO  需要修改部分
       //起始时间时间戳
       // var minExpiredAt = Date.parse(new Date($("#txtStartTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtStartTime").val()));
       // //结束时间时间戳
       // var maxExpiredAt = Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtEndTime").val()));
       //用户id
       var userId = $("#userId").val();
       $scope.userId = userId;
       //视图id
       var viewId = $("#viewId").val();
       // 视图标签id
       var tag = $("#tag").val();
       // 来源筛选
       var from = $("#from").val();
       //校验只有一个搜索条件
       if (!(userId || viewId || tag || from)) {
         tool.alert("提示", "请至少输入一个搜索条件");
         return false;
       }

       if (!userId) {
         tool.alert("提示", "请选择会员姓名后再进行查询");
         return false;
       }
       params = "";
       if (userId) {
         params = "userId=" + userId + "&";
       }
       if (viewId) {
         params += "viewId=" + viewId + "&";
       }
       if (tag) {
         params += "tag=" + tag + "&";
       }
       if (from) {
         params += "from=" + from + "&";
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