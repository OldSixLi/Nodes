var domainUrl = "http://omsss06f1.bkt.clouddn.com/";
var sportFileName = "";
var foodFileName = "";
uploader = Qiniu.uploader({
  runtimes: 'html5,flash,html4',
  browse_button: 'pickfiles', //上传按钮的ID
  container: 'btn-uploader', //上传按钮的上级元素ID
  drop_element: 'btn-uploader',
  max_file_size: '100mb', //最大文件限制　
  dragdrop: false,
  chunk_size: '4mb', //分块大小  

  uptoken_func: function() { // 在需要获取uptoken时，该方法会被调用　
    var token = "";
    $.ajax({
      type: "get",
      url: BasicUrl + "qnToken",
      async: false,
      dataType: "json",
      success: function(data) {
        token = data.upToken;
      }
    });
    return token;
  },
  // save_key: true,
  unique_names: true,

  domain: domainUrl, //自己的七牛云存储空间域名
  multi_selection: false, //是否允许同时选择多文件
  //文件类型过滤，这里限制为图片类型
  filters: {
    mime_types: [{
      title: "PDF files",
      extensions: "pdf"
    }]
  },
  auto_start: true,
  init: {
    'FilesAdded': function(up, files) {
      //do something
    },
    'BeforeUpload': function(up, file) {
      // alert(file);
      sportFileName = file.name;
      console.log(file.name);
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
      var imgSrc = domainUrl + json.key;
      $("[name='sporticonUrl']").val(imgSrc);
      $("#sportLink").attr("href", imgSrc);
      $("#sportLink").text(sportFileName);
      changeFileDisable();
    },
    'Error': function(up, err, errTip) {
      tool.alert("提示", errTip);
    },
    'Key': function(up, file) {
      var key = '';
      var timestamp = (new Date()).valueOf();
      key = timestamp + "_hes.pdf";
      return key;
    }
  }
});
uploader1 = Qiniu.uploader({
  runtimes: 'html5,flash,html4',
  browse_button: 'pickfiles1', //上传按钮的ID
  container: 'btn-uploader1', //上传按钮的上级元素ID
  drop_element: 'btn-uploader1',
  max_file_size: '100mb', //最大文件限制　
  dragdrop: false,
  chunk_size: '4mb', //分块大小 
  // unique_names: true,
  // save_key: false,
  uptoken_func: function() { // 在需要获取uptoken时，该方法会被调用　
    var token = "";
    $.ajax({
      type: "get",
      url: BasicUrl + "qnToken",
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
      title: "PDF files",
      extensions: "pdf"
    }]
  },
  auto_start: true,
  init: {
    'FilesAdded': function(up, files) {
      //do something
    },
    'BeforeUpload': function(up, file) {
      //do something
      foodFileName = file.name;
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
      var imgSrc = domainUrl + json.key;
      $("[name='foodiconUrl']").val(imgSrc);
      $("#foodLink").attr("href", imgSrc);
      $("#foodLink").text(foodFileName);
      changeFileDisable();
    },
    'Error': function(up, err, errTip) {
      tool.alert("提示", errTip);
    },
    'Key': function(up, file) {
      var key = '';
      var timestamp = (new Date()).valueOf();
      key = timestamp + "_hes.pdf";
      return key;
    }
  }
});


function changeFileDisable() {
  $(".pdf").each(function() {
    if ($(this).attr('href') == "") {
      $(this).addClass('disabled');
    } else {
      $(this).removeClass('disabled');
    }
  })
}
var params = ""; //全局变量  请求的参数

var chufangObj = {};
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆   
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
// ◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http, $timeout) {
  //获取处方下拉菜单

  var chufangurl = BasicUrl + "prescription?page=0&pageNum=100";
  $http.get(chufangurl).success(function(data) {
    if (data != null && data != "" && data != "null") {
      $scope.options = data.content;
    }
    //  tool.changeSelect($("#chufanglist"), false);
  });

  //分页方法声明
  var pageing = function(pageindex, params) {
    //TODO  需要修改部分http://healthshare.com.cn:80/admin/api/api-docs/../prescription?
    var url = BasicUrl + "prescription?" + params + "page=" + pageindex + "&pageNum=5"; //请求的参数和地址
    $http.get(url).success(function(data) {
      if (data != null && data != "" && data != "null") {
        //判断当前是否存在记录

        if (data.content && data.content != null && data.content.length > 0) {
          $scope.dataLengths = data.content.length > 0;
          //赋值操作 
          $scope.datas = data;
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
          $scope.dataLengths = false;
          // tool.alert("提示", "当前条件下未获取到信息!");
        }
      }
    });
  }

  //分页方法

  // pageing(0, params);
  //TODO  未完成
  $scope.getEditModel = function(id) {
    var arr = $scope.datas.content;
    arr.forEach(function(element, index, array) {
      var obj = element;
      if (element.id == id) {
        $scope.model = {
          id: id,
          name: element.name,
          spell: element.spell,
          prescriptionType: element.prescriptionType,
          description: element.description,
        };

        chufangObj = {
          id: id,
          name: element.name,
          spell: element.spell,
          prescriptionType: element.prescriptionType,
          description: element.description
        }
      }
    }, this);
  }

  //关闭模态框时事件
  $('#modal').on('hidden.bs.modal', function() {
    $scope.model = {};
    $scope.datas = {};
  })

  //关闭模态框时事件
  $('#modal').on('hide.bs.modal', function() {
    $scope.model = {};
    $scope.datas = {};
  })


  //获取详情
  var reportObj = new UrlSearch();
  if (reportObj.id) {
    $scope.reportId = reportObj.id;
    $scope.experts = {
      sportId: "",
      foodId: ""
    }
    var url = BasicUrl + "report/" + reportObj.id;
    $http.get(url).success(function(data) {
      if (data != null && data != "" && data != "null" && data.id) {
        $scope.data = data;
        //当前报告单的专家的ID
        $scope.reportStatus = data.status;

        //当前报告单的专家建议的先关信息
        $scope.expertData = {};
        $scope.foodChufangArr = [];
        $scope.sportChufangArr = [];

        if (data.consults && data.consults.length > 0) {
          for (var index = 0; index < data.consults.length; index++) {
            var element = data.consults[index];
            console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
            console.log(element);
            console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
            if (element.admin.role == 2) {
              $scope.expertData.sportReport = element.analysis;
              $scope.expertData.sportAdvice = element.advice;
              $scope.expertData.sportModifyTime = element.modifyTime;
              $scope.expertData.sportId = element.id;
              $scope.sportChufangArr = element.prescriptions;
              $scope.expertData.sportAttach = element.attach;
              $scope.expertData.sportConsultId = element.id;
            }
            if (element.admin.role == 3) {
              $scope.expertData.foodReport = element.analysis;
              $scope.expertData.foodAdvice = element.advice;
              $scope.expertData.foodModifyTime = element.modifyTime;
              $scope.expertData.foodId = element.id;
              $scope.foodChufangArr = element.prescriptions;
              $scope.expertData.foodAttach = element.attach;
              $scope.expertData.foodConsultId = element.id;
            }
          }
        } else {
          $scope.expertData.foodConsultId = 0;
          $scope.expertData.sportConsultId = 0;
        }
        if (data.experts.SportExpert) {
          $scope.experts.sportId = data.experts.SportExpert.id;
          $scope.experts.foodId = data.experts.DietitianExpert.id;
          $scope.expertData.sportId = data.experts.SportExpert.id;
          $scope.expertData.foodId = data.experts.DietitianExpert.id;
        }

        $scope.expertData.sportUrl = data.experts.SportExpert.iconUrl;
        $scope.expertData.foodUrl = data.experts.DietitianExpert.iconUrl;
        $scope.expertData.sportUserName = data.experts.SportExpert.name;
        $scope.expertData.foodUserName = data.experts.DietitianExpert.name;


        if (!$scope.expertData.foodAttach) {
          $("#foodLink").addClass('disabled');
        }

        if (!$scope.expertData.sportAttach) {
          $("#sportLink").addClass('disabled');
        }
      } else {
        tool.alert("提示", data.errorMessage);
      }
    }).error(function(data, header, config, status) {
      tool.alert("提示", "获取数据出错,请重试或联系网站管理员。");
      window.location.href = "MemberReportList.html";
    });

  } else {
    tool.alert("提示", "参数错误,当前无法获取数据!");
    window.location.href = "MemberReportList.html";
  }　
  //修改报告分析
  $scope.editReport = function(content, type) {
    if (content) {
      var htmlstr = '<textarea rows="5" id="editReport" class="form-control" placeholder="请w输入修改内容">' + content + '</textarea>'
    } else {
      var htmlstr = '<textarea rows="5" class="form-control" id="editReport" placeholder="请输入修改内容">' + '</textarea>'
    }

    tool.confirm("请修改内容", htmlstr, function() {
      var vals = window.top.$("#editReport").val();
      $scope.expertData[type + 'Report'] = vals;
      $scope.$apply();
    }, function() {})
  }

  //修改建议
  $scope.editAdvice = function(content, type) {
    if (content) {
      var htmlstr = '<textarea rows="5" id="adviceContent" class="form-control" placeholder="请输入修改内容">' + content + '</textarea>'
    } else {
      var htmlstr = '<textarea rows="5" class="form-control" id="adviceContent" placeholder="请输入修改内容">' + '</textarea>'
    }

    tool.confirm("请修改内容", htmlstr, function() {
      var val = window.top.$("#adviceContent").val();
      $scope.expertData[type + 'Advice'] = val;
      $scope.$apply();
    }, function() {})
  }

  //添加处方时改变相关ID
  $scope.addChufang = function(id, type) {
    $scope.expertAdviceReportId = id; //即typeConsultId
    $scope.expertType = type;
  }

  //添加处方确定操作
  $scope.addChufangObj = function() {
    //判断处方内容是否有修改  
    if (!$scope.model) {
      tool.alert("提示", "您还未选择处方！");
      return false;
    }

    if (($scope.model.name == chufangObj.name) &&
      ($scope.model.spell == chufangObj.spell) &&
      ($scope.model.prescriptionType == chufangObj.prescriptionType) &&
      ($scope.model.description == chufangObj.description)) {
      // 相同时操作 
      var chufangID = $scope.model.id;

      tool.alert("提示", "添加成功", function() {
        //根据添加的类别进行判断然后添加数据
        if ($scope.expertType == 'food') {
          $scope.foodChufangArr.push($scope.getChufangObj(chufangID));
          $scope.$apply();
          $("#chufanglist").val('');
          $('#modal').modal('hide');
        }
        if ($scope.expertType == 'sport') {
          $scope.sportChufangArr.push($scope.getChufangObj(chufangID));
          $scope.$apply();
          $("#chufanglist").val('');
          $('#modal').modal('hide');
        }
      });
      //异步请求操作
      //  $.ajax({
      //    type: "POST",
      //    url: BasicUrl + "report/" + $scope.reportId + "/consult/" + $scope.expertAdviceReportId + "/prescription",
      //    data: {
      //      reportId: $scope.reportId - 0,
      //      consultId: $scope.foodConsultId,
      //      prescriptionId: chufangID
      //    },
      //    dataType: "json",
      //    error: function(response) {
      //      if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse(response.responseText).errorMessage) {
      //        tool.alert("提示", JSON.parse(response.responseText).errorMessage);
      //      }
      //    },
      //    success: function(data) {},
      //    complete: function(xhr, textStatus) {
      //      if (xhr.status == 200) {
      //        if (xhr.responseText && JSON.parse(xhr.responseText) && JSON.parse(xhr.responseText).errorMessage) {
      //          tool.alert("提示", JSON.parse(xhr.responseText).errorMessage);
      //        } else {

      //        }
      //      }
      //    }
      //  });
    } else {
      //  不同时操作 

      var saveInfo = {
        //文本框,下拉菜单选择值
        name: $.trim($("#chufangName").val()),
        spell: $.trim($("#spellName").val()),
        prescriptionType: $("#chufangTypes").val(),
        description: $.trim($("#chufangContent").val())
      };
      var __error = [];
      if (saveInfo.name == "") {
        __error.push("请输入处方名！");
      }
      if (saveInfo.spell == "") {
        __error.push("请输入处方拼音名称！");
      }
      if (saveInfo.prescriptionType == "") {
        __error.push("请选择处方类别！");
      }
      if (saveInfo.description == "") {
        __error.push("请输入处方内容！");
      }
      if (__error.length > 0) {
        tool.alert("提示", __error.join("<br />"));
        return false;
      }
      $.ajax({
        type: "POST",
        url: BasicUrl + "prescription",
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
            var data = JSON.parse(xhr.responseText);
            if (!data.id) {
              return false;
            }
            var chufangID = data.id;
            //  $.ajax({
            //    type: "POST",
            //    url: BasicUrl + "report/" + $scope.reportId + "/consult/" + $scope.expertAdviceReportId + "/prescription",
            //    data: {
            //      reportId: $scope.reportId - 0,
            //      consultId: $scope.expertAdviceReportId,
            //      prescriptionId: chufangID
            //    },
            //    dataType: "json",
            //    error: function(response) {
            //      if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse(response.responseText).errorMessage) {
            //        tool.alert("提示", JSON.parse(response.responseText).errorMessage);
            //      }
            //    },
            //    success: function(data) {},
            //    complete: function(xhr, textStatus) {
            //      if (xhr.status == 200) {
            //        if (xhr.responseText && JSON.parse(xhr.responseText) && JSON.parse(xhr.responseText).errorMessage) {
            //          tool.alert("提示", JSON.parse(xhr.responseText).errorMessage);
            //        } else {
            //          tool.alert("提示", "添加成功", function() {
            //            // 根据添加的类别进行判断然后添加数据
            //            if ($scope.expertType == 'food') {
            //              $scope.foodChufangArr.push($scope.model);
            //              $scope.$apply();
            //              $("#chufanglist").val('');
            //              $('#modal').modal('hide');
            //            }
            //            if ($scope.expertType == 'sport') {
            //              $scope.sportChufangArr.push($scope.model);
            //              $scope.$apply();
            //              $("#chufanglist").val('');
            //              $('#modal').modal('hide');
            //            }
            //          });
            //        }
            //      }
            //    }
            //  });

            tool.alert("提示", "添加成功", function() {
              //根据添加的类别进行判断然后添加数据
              if ($scope.expertType == 'food') {
                $scope.foodChufangArr.push($scope.getChufangObj(chufangID));
                $scope.$apply();
                $("#chufanglist").val('');
                $('#modal').modal('hide');
              }
              if ($scope.expertType == 'sport') {
                $scope.sportChufangArr.push($scope.getChufangObj(chufangID));
                $scope.$apply();
                $("#chufanglist").val('');
                $('#modal').modal('hide');
              }
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


  }


  //查询按钮
  $scope.search = function() {
    var type = $("#chufangType").val();
    var name = $("#chufanglist").find("option:selected").text() == "请选择" ? "" : $("#chufanglist").find("option:selected").text();
    //校验只有一个搜索条件 
    // if (!(name || type) && searchindex == 1) {
    //   tool.alert("提示", "请至少输入一个搜索条件");
    //   return false;
    // }
    params = "";
    if (type) {
      params = "prescriptionType=" + type + "&";
    }
    if (name) {
      params += "name=" + name + "&";
    }

    pageing(0, params);
  }

  $scope.createCheck = function(reportId, userid) {
      // （<a class="btn" href="" ng-disabled="reportStatus==3" class="{{reportStatus==3?'disabled':''}}" style="padding:0;">创建验单</a>）
      if ($scope.reportStatus == 3) {
        tool.alert("提示", "报告已发布，内容不可修改");
        return false;
      }
      window.location.href = "AddCheck.html?reportId=" + reportId + "&userid=" + userid

    },

    //发布报告（手机端可见）
    $scope.publishReport = function(type) {

      //  tool.confirm(
      //    "提示",
      //    "确认发布报告？",
      //    function() {
      //      //用户点击确认按钮时操作

      //    },
      //    function() {});
      //  ng-disabled="reportStatus!=2"

      //  作提示， 根据不同状态作不同提示：
      //  1） 检查登记、 专家填写状态下点击“ 发布” 就提示“ 专家还未填写信息， 无法发布报告”；
      //  2） 已发布状态下点击“ 发布” 就提示“ 您已发布该报告”；
      if ($scope.reportStatus != 2) {
        var toolStr = "";
        switch ($scope.reportStatus) {
          case 0:
            toolStr = "专家还未填写信息，无法发布报告";
            break;
          case 1:
            toolStr = "专家还未填写信息，无法发布报告";
            break;
          case 3:
            toolStr = "您已发布该报告";
            break;
          default:
            break;
        }

        tool.alert("提示", toolStr);
        return false;
      }

      $.ajax({
        type: "PATCH",
        url: BasicUrl + "report/" + $scope.reportId + "/publish",
        data: {
          adminId: 1,
          id: $scope.reportId
        },
        dataType: "json",
        error: function(response) {
          if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse(response.responseText).errorMessage) {
            tool.alert("提示", JSON.parse(response.responseText).errorMessage);
          }
        },
        success: function(data) {
          if (data.errorMessage) {
            tool.alert("提示", data.errorMessage);
          } else {
            tool.alert("提示", "发布成功", function() {
              //刷新当前页面.
              window.location.reload();
            });
          }
        },
        complete: function(xhr) {
          if (xhr.status == '200' && xhr.responseText == "") {
            tool.alert("提示", "发布成功", function() {
              //刷新当前页面.
              window.location.reload();
            });
          }
        }
      });




    }

  //专家添加建议
  $scope.addConsult = function(type) {
    var adminId = 0;　
    var chufang = [];
    var method = "PATCH",
      Url = "";
    if (type == 'food') {
      adminId = $scope.experts.foodId;
      for (var o = 0; o < $scope.foodChufangArr.length; o++) {
        var ele = $scope.foodChufangArr[o];
        chufang.push(ele.id);
      }
      if ($scope.expertData.foodConsultId == 0) {
        method = "POST"
      } else {
        Url = "/" + $scope.expertData.foodConsultId;
      }

    } else
    if (type == 'sport') {
      adminId = $scope.experts.sportId;
      for (var o = 0; o < $scope.sportChufangArr.length; o++) {
        var ele = $scope.sportChufangArr[o];
        chufang.push(ele.id);
      }
      if (!$scope.expertData.sportConsultId) {
        method = "POST";
      } else {
        Url = "/" + $scope.expertData.sportConsultId;
      }
    }

    if ($scope.expertData[type + 'Id'] != 0) {
      tool.confirm(
        "提示",
        "确认添加建议？",
        function() {
          var data = {
            reportId: $scope.reportId,
            adminId: $scope.expertData[type + 'Id'] - 0,
            analysis: $scope.expertData[type + 'Report'] == undefined ? "" : $scope.expertData[type + 'Report'],
            advice: $scope.expertData[type + 'Advice'] == undefined ? "" : $scope.expertData[type + 'Advice'],
            prescriptions: chufang.join(','), //处方
            attach: $("[name='" + type + "iconUrl']").val() //附件
          }

          $http({
              method: method,
              url: BasicUrl + "report/" + $scope.reportId + "/consult" + Url,
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
                }
              } else {
                tool.alert("提示", "保存失败,请重试!");
              }
            }).error(function(response) {
              if (response && response.errorMessage) {
                tool.alert("提示", response.errorMessage);
              }
            });
        },
        function() {

        });
    } else {
      tool.confirm(
        "提示",
        "确认添加建议？",
        function() {
          var attachUrl = $("[name='" + type + "iconUrl']").val();
          $.ajax({
            type: method,
            url: BasicUrl + "report/" + $scope.reportId + "/consult" + Url,
            data: {
              reportId: $scope.reportId - 0,
              adminId: adminId,
              analysis: $scope.expertData[type + 'Report'],
              advice: $scope.expertData[type + 'Advice'],
              attach: attachUrl //附件
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
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
              if (xhr.status == 200) {
                if (xhr.responseText && JSON.parse(xhr.responseText) && JSON.parse(xhr.responseText).errorMessage) {
                  tool.alert("提示", JSON.parse(xhr.responseText).errorMessage);
                } else {
                  tool.alert("提示", "发布成功", function() {
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


  }

  //删除营养专家处方
  $scope.deleteFoodArr = function(id, consultId) {
    var url = BasicUrl + "report/" + $scope.reportId + "/consult/" + $scope.expertData.foodId + "/prescription/" + id;
    tool.confirm(
      "提示",
      "确认删除处方？",
      function() {
        //用户点击确认按钮时操作
        $.ajax({
          type: "DELETE",
          url: BasicUrl + "report/" + $scope.reportId + "/consult/" + consultId + "/prescription/" + id,
          data: {
            reportId: $scope.reportId,
            consultId: consultId,
            prescriptionId: id
          },
          dataType: "json",
          error: function(response) {
            if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse(response.responseText).errorMessage) {
              tool.alert("提示", JSON.parse(response.responseText).errorMessage);
            }
          },
          complete: function(xhr, textStatus) {
            if (xhr.status == 200 && xhr.responseText == "") {
              tool.alert("提示", "删除处方成功", function() {
                //刷新当前页面.
                window.location.reload();
              });
            }
          },
          success: function(data) {
            if (data.errorMessage) {
              tool.alert("提示", data.errorMessage);
            }
          }
        });
      },
      function() {
        //用户点击取消按钮时操作
      });
  }

  //删除运动专家处方
  $scope.deleteSportArr = function(id, consultId) {
    var url = BasicUrl + "report/" + $scope.reportId + "/consult/" + $scope.expertData.sportId + "/prescription/" + id
    tool.confirm(
      "提示",
      "确认删除处方？",
      function() {
        //用户点击确认按钮时操作
        $.ajax({
          type: "DELETE",
          url: BasicUrl + "report/" + $scope.reportId + "/consult/" + consultId + "/prescription/" + id,
          data: {
            reportId: $scope.reportId,
            consultId: consultId,
            prescriptionId: id
          },
          dataType: "json",
          error: function(response) {
            if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse(response.responseText).errorMessage) {
              tool.alert("提示", JSON.parse(response.responseText).errorMessage);
            }
          },
          complete: function(xhr, textStatus) {
            if (xhr.status == 200 && xhr.responseText == "") {
              tool.alert("提示", "删除处方成功", function() {
                //刷新当前页面.
                window.location.reload();
              });
            }
          },
          success: function(data) {
            if (data.errorMessage) {
              tool.alert("提示", data.errorMessage);
            }
          }
        });
      });
  }

  //获取处方详情
  $scope.getChufangObj = function(id) {
    var newObj = {};
    for (var index = 0; index < $scope.options.length; index++) {
      var element = $scope.options[index];
      if (element.id == id) {
        newObj.id = id;
        newObj.name = element.name;
        newObj.spell = element.spell;
        newObj.prescriptionType = element.prescriptionType;
      }
    }
    return newObj;
  }

  //加载完毕后再显示 
  $scope.$watch("viewContentLoaded", function() {
    angular.element(".myload").removeClass("myload");
  });
});