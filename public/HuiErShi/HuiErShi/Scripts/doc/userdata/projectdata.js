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

   //设置日期格式
   $("#imageStartTime,#imageEndTime").datetimepicker({
     timepicker: false,
     format: 'Y-m-d',
   });

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

   $scope.ItemObject = {};
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

             for (var x = 0; x < data.content.length; x++) {
               var singleData = data.content[x];
               if (!$scope.ItemObject[singleData.itemId]) {
                 $scope.ItemObject[singleData.itemId] = singleData.itemName; //将数组进行遍历  项目名和项目ID对应
               }
             }
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
     $scope.begin = new Date(); //获取当前月份
     $scope.end = new Date();
     $scope.begin.setYear($scope.begin.getFullYear() - 1);
     $scope.currentSelected = cloneObj($scope.selected);
     $scope.getNewImage();
   }

   $scope.getNewImage = function() {
     var userId = $scope.userId; //获取当前用户的ID
     if ($scope.currentSelected.length != 0) {
       $scope.showTable = true;
       var valueList = [];
       var result = getYearAndMonth(toNormalTime(Date.parse($scope.begin)), toNormalTime(Date.parse($scope.end)));
       console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
       console.log(result);
       console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
       for (var index = 0; index < $scope.currentSelected.length; index++) {
         //单条数据对象
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
         };

         var dobleObj = {
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

         var isHaveSecond = false;
         var element = $scope.currentSelected[index];
         var url = BasicUrl + "data/statistics?itemId=" + element + "&userId=" + userId + "&start=" + toNormalTime(Date.parse($scope.begin)) + "&end=" + toNormalTime(Date.parse($scope.end)) + "&page=0&pageNum=1000";

         $.ajax({
           type: "GET",
           url: url,
           dataType: "json",
           async: false, //设置为同步操作
           success: function(data) {

             if (data && data.length > 0) {

               if (data[0].val.split(',').length > 1) {
                 isHaveSecond = true;
               } else {
                 isHaveSecond = false;
               }
               var singleData = []; //单条数据
               for (var index = 0; index < result.length; index++) {
                 var element = result[index];
                 var valuenum = 0;
                 var doublenum = 0;
                 for (var m = 0; m < data.length; m++) {
                   var elements = data[m];
                   //判断是不是多数值型
                   //如果是

                   if (element == elements.month) {
                     obj.name = $scope.ItemObject[elements.itemId];
                     if (isHaveSecond) {
                       //是多数值型
                       dobleObj.name = $scope.ItemObject[elements.itemId];
                       valuenum = elements.val.split(',')[0];
                       doublenum = elements.val.split(',')[1];
                     } else {
                       //不是 直接设置
                       valuenum = elements.val;
                     }
                   }
                 }
                 obj.data.push(tofixed(valuenum));
                 if (isHaveSecond) {
                   dobleObj.data.push(tofixed(doublenum));
                 }
               }
             }
           }
         });

         valueList.push(obj);

         //如果为多数值  添加进数组中
         if (isHaveSecond) {
           valueList.push(dobleObj);
         }
       }

       option.xAxis[0].data = result;
       option.series = [];
       option.series = valueList;
       myChart.clear();
       myChart.setOption(option);
       $scope.littleSelected = cloneObj($scope.currentSelected);
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

     $scope.begin = imgStartTime; //获取当前月份
     $scope.end = imgEndTime;
     $scope.currentSelected = cloneObj($scope.littleSelected)
     $scope.getNewImage();
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

   // 用户选择的十个项目
   $scope.selected = [];
   $scope.isChecked = function(x) {
     return $scope.selected.indexOf(x) >= 0;
   };
   $scope.updateSelection = function($event, x) {
     var checkbox = $event.target;
     var checked = checkbox.checked;
     if (checked) {
       if ($scope.selected.length >= 10) {
         tool.alert("提示", "每次最多选择十项数据");
         checkbox.checked = false;
         return false;
       } else {
         $scope.selected.push(x);
       }

     } else {
       var idx = $scope.selected.indexOf(x);
       $scope.selected.splice(idx, 1);
     }
   };

   // 关于下方选择框的选择值
   $scope.littleSelected = [];
   $scope.islittleChecked = function(x) {
     return $scope.littleSelected.indexOf(x) >= 0;
   };
   $scope.updatelittleSelection = function($event, x) {
     var checkbox = $event.target;
     var checked = checkbox.checked;
     if (checked) {
       $scope.littleselected.push(x);
     } else {
       var idx = $scope.littleSelected.indexOf(x);
       $scope.littleSelected.splice(idx, 1);
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


 /**
  * 时间戳转化为正常时间 
  * @param {any} shijianchuo  时间戳 精确到毫秒
  * @returns 正常时间
  */
 function toNormalTime(shijianchuo) {
   var time = new Date(parseInt(shijianchuo));
   var y = time.getFullYear();
   var m = time.getMonth() + 1;
   var d = time.getDate();
   var h = time.getHours();
   var mm = time.getMinutes();
   var s = time.getSeconds();
   return y + '-' + add0(m) + '-' + add0(d);
 }

 function add0(m) { return m < 10 ? '0' + m : m; }

 function getYearAndMonth(start, end) {
   var result = [];
   var starts = start.split('-');
   var ends = end.split('-');
   var staYear = parseInt(starts[0]);
   var staMon = parseInt(starts[1]);
   var endYear = parseInt(ends[0]);
   var endMon = parseInt(ends[1]);
   while (staYear <= endYear) {
     if (staYear === endYear) {
       while (staMon <= endMon) {

         //  result.push({ year: staYear, month: staMon });
         result.push(staYear + '-' + add0(staMon));
         staMon++;
       }
       staYear++;
     } else {

       if (staMon > 12) {
         staMon = 1;
         staYear++;
       }
       //  result.push({ year: staYear, month: staMon });
       result.push(staYear + '-' + add0(staMon));
       staMon++;
     }
   }

   return result;
 }

 function toTimestamp(timestr) {
   return Date.parse(new Date(timestr)).toString() == "NaN" ? 0 : Date.parse(new Date(timestr));
 }

 function resolveNum(val) {
   try {
     return Math.floor(val * 100) / 100;
   } catch (error) {
     return 0;
   }
 }

 function tofixed(num) {
   try {
     return (num - 0).toFixed(2);
   } catch (error) {
     return 0;
   }

 }