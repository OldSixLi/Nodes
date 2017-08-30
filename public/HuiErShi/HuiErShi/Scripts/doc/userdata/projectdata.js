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
 //  var params = "&viewId=&tag=&from=&"; //请求参数变量
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
       var url = BasicUrl + "dataView?" + params + "page=" + pageindex + "&pageNum=10"; //请求地址
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

           }
         }
       }).error(function(data) {
         $scope.dataLengths = 0;
         if (data.errorMessage) {
           tool.alert("提示", data.errorMessage);
         }

       });
       //视图标签赋值
     } else {
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

     var userId = $scope.userId; //获取当前用户的ID

     if ($scope.selected.length != 0) {
       $scope.showTable = true;

       //进行请求操作
       var valueList = [];
       var AllObj = {};
       var AllList = [];
       for (var index = 0; index < $scope.selected.length; index++) {
         var obj = {
           name: "",
           type: 'line',
           data: [],
           markPoint: {
             data: [{
               type: 'max',
               name: '最大值'
             }, {
               type: 'min',
               name: '最小值'
             }]
           }
         }
         var element = $scope.selected[index];
         var url = BasicUrl + "data?itemId=" + element + "&userId=" + userId + "&page=0&pageNum=1000";

         $.ajax({
           type: "GET",
           url: url,
           dataType: "json",
           async: false, //设置为同步操作
           success: function(data) {

             if (data && data.content && data.content.length > 0) {
               var singleData = []; //单条数据
               obj.name = data.content[0].item.name; //当前名称

               for (var m = 0; m < data.content.length; m++) {
                 var elements = data.content[m];
                 //添加进数组中
                 if (!AllObj[elements.createAt]) {
                   AllObj[elements.createAt] = "0"
                 }

                 var littleObj = {};
                 littleObj.createAt = elements.createAt;
                 littleObj.val = elements.val;
                 obj.data.push(littleObj);

                 elements.val = 0;
                 elements.id = 0;
                 elements.fromWhere = "";
                 elements.item.itemId = "";
                 elements.item.name = "";
               }
               //获取到了所有时间段
               //  $.extend(true, AllObj, singleData);
             }
           }
         });

         valueList.push(obj);
       }

       console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
       console.log(JSON.stringify(valueList));
       console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
       //FOR 循环结束
       for (var a = 0; a < valueList.length; a++) {
         var aelement = valueList[a];
         var newObj = cloneObj(AllObj);
         for (var b = 0; b < aelement.data.length; b++) {
           var belement = aelement.data[b];
           //获取当前时间
           //  if ()
           if (newObj[belement.createAt]) {
             newObj[belement.createAt] == "data";
           }
         }
         //数据判断结束
         jQuery.each(newObj, function(i, val) {
           if (val != "data") {
             //如果不存在此数据
             aelement.data.push({ createAt: i, val: "0" });
           }
         });

       }

       console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
       console.log(JSON.stringify(valueList));
       console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");





       //  var newvalueList = [];

       //  for (var p = 0; p < valueList.length; p++) {
       //    newvalueList.push(newobj);
       //    //  var line = valueList[p];
       //    //  var result = $.extend(false, {}, line, newobj);
       //    //  valueList[p] = result;
       //  }

       //  var LASTLIST = [];
       //  for (var z = 0; z < valueList.length; z++) {
       //    var loop = valueList[z];
       //    //  var newloop = newvalueList[z];

       //    var newloop = cloneObj(newobj);
       //    var resultss = $.extend(true, newloop, loop);
       //    console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
       //    console.log(JSON.stringify(resultss));
       //    console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");

       //    LASTLIST.push(cloneObj(resultss));
       //  }


       console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
       console.log(JSON.stringify(valueList));
       console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
     } else {
       $scope.showTable = false;
       tool.alert("提示", "请选择数据后再进行比较");
     }
   }



   /**
    * 生成新图片
    * 
    * @returns 
    */
   $scope.newImage = function() {
     var imgStartTime = $.trim($("#imageStartTime").val()),
       imgEndTime = $.trim($("#imageEndTime").val());

     if (!imgStartTime || !imgEndTime) {
       tool.alert("提示", "请选择起始日期！");
       return false;
     }
     if (toTimestamp(imgStartTime) > toTimestamp(imgEndTime)) {
       tool.alert("提示", "起始日期不能大于结束日期！");
       return false;
     }

     $scope.timedata = [];
     $scope.tabledata = [];
     for (var index = 0; index < $scope.data.content.length; index++) {
       var element = $scope.data.content[index];
       if (element.createAt >= toTimestamp(imgStartTime) && element.createAt <= toTimestamp(imgEndTime)) {
         $scope.timedata.push(getLocalTime(element.createAt));
         $scope.tabledata.push(element.val);
       }
     }

     option.xAxis[0].data = $scope.timedata;
     option.series[0].data = $scope.tabledata;
     myChart.setOption(option);
   }

   $scope.isInArray = function(val, arr) {
     return $.inArray(val, arr);
   }

   $scope.redirectRecord = function(itemId, userId) {
     var url = "RecordList.html?itemId=" + itemId + "&userId=" + userId;
     window.location.href = url;
   }

   $scope.viewNameClick = function(id) {
     $("#viewId").val(id);
     tool.changeSelect($("#viewId"), false);
     $("#tag").val('');
     var viewId = id;
     var userId = $("#userId").val();
     params = "";

     if (userId) {
       params = "userId=" + userId + "&";
     }
     if (viewId) {
       params += "viewId=" + viewId + "&";
     }
     pageing(0, params);
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





 function cloneObj(obj) {
   var str, newobj = obj.constructor === Array ? [] : {};
   if (typeof obj !== 'object') {
     return;
   } else if (window.JSON) {
     str = JSON.stringify(obj), //序列化对象
       newobj = JSON.parse(str); //还原
   } else { //如果不支持以上方法
     for (var i in obj) {
       newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
     }
   }
   return newobj;
 };