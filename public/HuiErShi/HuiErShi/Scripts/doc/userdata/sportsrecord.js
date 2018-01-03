 var myChart = echarts.init(document.getElementById('main'));
 // 【04】指定图表的配置项和数据  
 var currentDate = "";
 var option = {
   title: {
     text: '运动心率图',
     subtext: currentDate
   },
   tooltip: {
     trigger: 'axis'
   },
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
       },
       // restore: {
       //   show: true
       // },
       // saveAsImage: {
       //   show: true
       // }
     }
   },
   calculable: true,
   xAxis: [{
     type: 'category',
     boundaryGap: false,
     data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
   }],
   yAxis: [{
     type: 'value',
     // axisLabel: {
     //   formatter: '{value} '
     // }
   }],
   series: [{
     name: '最大值',
     type: 'line',
     data: [],
     // 11, 11, 15, 13, 12, 13, 10
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
   }]
 };
 // 【05】使用刚指定的配置项和数据显示图表。  
 myChart.setOption(option);
 var urlObj = new UrlSearch();
 /**
  * 分隔获取各个参数
  * 根据URL地址获取其参数
  */
 function UrlSearch() {
   var name, value;
   var str = location.href; //取得整个地址栏
   var num = str.indexOf("?");
   str = str.substr(num + 1);
   var arr = str.split("&"); //各个参数放到数组里
   for (var i = 0; i < arr.length; i++) {
     num = arr[i].indexOf("=");
     if (num > 0) {
       name = arr[i].substring(0, num);
       value = arr[i].substr(num + 1);
       this[name] = value;
     }
   }
 }
 $(function() {
   //日期框初始化
   $(".start_end_time").datetimepicker({
     timepicker: false,
     format: 'Y-m-d',
   });
   // 下拉框AJAX获取数据
   $("#userSlt").select2({
     //  placeholder: '请选择',
     //  allowClear: true,
     ajax: {
       // url: BasicUrl + "vip/name",
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
     // escapeMarkup: function(markup) {
     //   return markup;
     // },
     minimumInputLength: 1,
     minimumResultsForSearch: 1,
     width: "220px",
     templateResult: formatRepo,
     templateSelection: formatRepoSelection,
   });
 });

 function formatRepo(repo) {
   console.log("formatRepo");
   console.log("当前数据:" + repo.realName);
   return repo.realName || repo.text;
 }

 function formatRepoSelection(repo) {
   console.log("formatRepoSelection");
   console.log("当前数据:" + repo.realName);
   return repo.realName || repo.text;
 }


 function getLocalTime(tm) {
   var tt = new Date(parseInt(tm)).toLocaleString('chinese', {
     hour12: false
   }).replace(/\//g, "-");
   return tt;
 }
 //前一天
 function prevDay() {
   var date = Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? Date.parse(new Date()) : Date.parse(new Date($("#txtEndTime").val()));
   date = date - 86400000;
   var time = getLocalTime(date);
   $('#txtEndTime').datetimepicker({
     value: time
   });
 }

 function nextDay() {
   var date = Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? Date.parse(new Date()) : Date.parse(new Date($("#txtEndTime").val()));
   date = date + 86400000;
   var time = getLocalTime(date);
   $('#txtEndTime').datetimepicker({
     value: time
   });
 }
 var params = ""; //请求参数变量
 var app = angular.module('myApp', []);


 app.controller('customersCtrl', function($scope, $http) {

   //全局变量，搜索用户ID以及当天时间
   $scope.searchuserid = '';
   $scope.searchdate = '';
   // 分页方法
   var pageing = function(pageindex, params) {　
       var url = BasicUrl + "sport?" + params + "page=" + pageindex + "&pageNum=10";　
       $http.get(url).success(function(data) {
         if (data != null && data != "" && data != "null") {
           $scope.dataLengths = data.content.length > 0;　
           if (data.content != null && data.content.length > 0) {
             $scope.data = data;
             $scope.totalPage = data.totalPages;
             $scope.totalRecord = data.totalElements;
             var arr = [],
               timeArr = [];
             for (var index = 0; index < data.content.length; index++) {
               arr.push(data.content[index].heartRate);
               timeArr.push(getLocalTime(data.content[index].createAt));
               console.log(getLocalTime(data.content[index].createAt));
             }
             var currentTime = getLocalTime(Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? Date.parse(new Date()) : Date.parse(new Date($("#txtEndTime").val()))).substr(0, 9);
             option.title.subtext = currentTime;
             option.xAxis[0].data = timeArr;
             option.series[0].data = arr;　
             myChart.setOption(option);
             //调用生成分页方法
             initPageDiv($("#alreadyPage"), pageindex + 1, data.totalPages, 5, $("#currentPage"), function() {
               pageing($("#currentPage").val() - 1, params);
             });
           } else {
             $scope.dataLengths = false;
           }
         }
       }).error(function(data) {
         $scope.dataLengths = false;
       });

       $http.get(BasicUrl + 'data?itemId=JXXL&userId=' + $scope.searchuserid + '&minCreatedAt=' + new Date($scope.searchdate).setHours(0) + '&maxCreatedAt=' + (new Date($scope.searchdate).setHours(0) + 86399000) + '&page=0&pageNum=10').success(function(data) {
         if (data != null && data != "" && data != "null") {
           if (data.content != null && data.content.length > 0) {
             //静息心率
             $scope.staticVal = data.content[0].val;
           } else {
             $scope.staticVal = 0;
           }
         }
       }).error(function(data) {
         $scope.dataLengths = false;
       });

       $http.get(BasicUrl + "diary?" + params+"date="+$("#txtEndTime").val()).success(function(data) {
         if (data != null && data != "" && data != "null") {
           $scope.remark = data;
         }
       });

     }
     //模板样本

   $scope.userid = "";
   if (urlObj.userid) {
     $http.get(BasicUrl + "vip/" + urlObj.userid).success(function(data) {
       if (data != null && data != "" && data != "null" && data.id) {
         var data = {
           id: urlObj.userid,
           realName: data.realName
         };
         var newOption = new Option(data.realName, data.id, true, true);
         $('#userSlt').append(newOption).trigger('change');
       }
     });

     params += "userId=" + urlObj.userid + "&";
     $("#txtEndTime").val(getToday());
     var time = Date.parse(getToday());
     $scope.searchuserid = urlObj.userid;
     $scope.searchdate = time;
     params += "minCreatedAt=" + time + '&maxCreatedAt=' + (new Date(time).setHours(0) + 86399000) + "&";
     pageing(0, params);
   }

   $scope.search = function() {
     console.log("值:" + $("#userSlt").val());
     var userid = $("#userSlt").val();
     var time = Date.parse(new Date($("#txtEndTime").val())).toString() == "NaN" ? 0 : Date.parse(new Date($("#txtEndTime").val()));
     if (!userid || !time) {
       tool.alert("提示", "请选择用户和日期！");
       return false;
     }
     $scope.searchuserid = userid;
     $scope.searchdate = time;
     console.log("riqi:" + $scope.searchdate);
     params = ""

     if (userid) {
       params += "userId=" + userid + "&";
     }
     if (time != 0) {
       params += "minCreatedAt=" + time + '&maxCreatedAt=' + (new Date(time).setHours(0) + 86399000) + "&";
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
 });


 function getToday() {
   var time = new Date();
   var y = time.getFullYear();
   var m = time.getMonth() + 1;
   var d = time.getDate();
   var h = time.getHours();
   var mm = time.getMinutes();
   var s = time.getSeconds();
   return y + '-' + add0(m) + '-' + add0(d);
 }

 function add0(m) { return m < 10 ? '0' + m : m; }