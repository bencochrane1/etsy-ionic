angular.module('HeaderService', [])

.factory('Promise',function($http, APPID, APIKEY, BASEURL){
  return {
    resolve : function(data){
      console.log('data in to promise resolve')
      data.url = BASEURL + data.url 
      if(!data.headers)
        data.headers = {}
      data.headers.Authorization = 'Basic '+ btoa(APPID+":"+APIKEY);
      console.log('data in to http: ', data)
      var call = $http(data)
      return call;
    }
  }
})