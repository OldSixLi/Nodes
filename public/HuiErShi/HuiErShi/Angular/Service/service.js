app.factory('httpService',
  function($http, $q) {
    /**
     * 异步分页请求数据 
     * @param {any} pageindex 当前页面(从0开始计算)
     * @param {any} url 请求服务地址
     * @param {any} params  请求参数
     */
    var pageing = function(pageindex, url, params) {
      // $q是Angular的一种内置服务， 它可以使你异步地执行函数， 并且当函数执行完成时或异常时它允许你使用函数的返回值或返回执行状态通知等。
      var defer = $q.defer();
      if (url == "") {
        url = "/users/users" + "?" + "page=" + pageindex + "&pageNum=10"; //请求的参数和地址
      }
      $http.get(url)
        .success(function(data, status, head, config) {
          var res = {
            data: data,
            status: status,
            config: config
          };
          defer.resolve(res);
        })
        .error(function(data, status, headers, config) {
          var res = {
            data: data,
            status: status
          };
          defer.resolve(res);
        });
      //返回数据
      return defer.promise;
    };

    //返回的方法
    return {
      pageing: pageing
    };

  }
);