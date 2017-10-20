　
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
      url: BasicUrl+"qnToken",
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
      return file.name;
    }
  }
});　

var params = ""; //全局变量  请求的参数
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
  var pageing = function(pageindex, params) {
      var url = BasicUrl + "picture?" + params + "&page=" + pageindex + "&pageNum=10"; //请求的参数和地址
      $http.get(url).success(function(data) {
        if (data != null && data != "" && data != "null") {
          $scope.dataLengths = data.content.length > 0;
          if (data.content != null && data.content.length > 0) {
            $scope.data = data;
          } else {　}
        }
      });
    }
    //分页方法
  pageing(0, params);
  // 上传背景按钮操作方法
  $scope.saveInfo = function() {　
    var bgUrl = $("#iconUrl").val();　
    if (bgUrl) {　
      tool.confirm(
        "请输入名称",
        '<input type="text" name="name" value="" id="nameId" class="form-control" placeholder="请输入名称">',
        function() {
          $.ajax({
            type: "POST",
            url: BasicUrl + 'picture',
            data: {
              name: window.top.$("#nameId").val(),
              url: bgUrl
            },
            dataType: "json",
            error: function(response) {
              if (response && response.responseText && JSON.parse(response.responseText) && JSON.parse(response.responseText).errorMessage) {
                tool.alert("提示", JSON.parse(response.responseText).errorMessage);
              }
            },
            success: function(data) {},
            complete: function(xhr, textStatus) {
              if (xhr.status == 200) {
                if (xhr.responseText && JSON.parse(xhr.responseText) && JSON.parse(xhr.responseText).errorMessage) {
                  tool.alert("提示", JSON.parse(xhr.responseText).errorMessage);
                } else {
                  tool.alert("提示", "添加成功", function() {
                    //刷新当前页面.
                    window.location.reload();
                  });
                }
              }
            }
          });
        },
        function() {　});

    } else {
      tool.alert("提示", "请上传背景后在进行保存操作");
    }
  }


  //删除项目操作方法
  $scope.deleteItem = function(id) {
    var deleteUrl = BasicUrl + "picture";
    tool.confirm("提示",
      "是否确认删除此项目",
      function() {
        $http({
            method: 'DELETE',
            url: deleteUrl,
            data: {
              id: id
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
              tool.alert("提示", "删除成功!");　 //刷新当前页面.
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

  $scope.seeDetail = function(url) {
    tool.alert("图片详情", "<img src='" + url + "' class='img-responsive img-thumbnail' style='width:100%;height:auto;'/>", function() {}, 'col-md-6 col-md-offset-3');
  }

  //加载完毕后再显示 
  $scope.$watch("viewContentLoaded", function() {
    angular.element(".myload").removeClass("myload");
  });
});　