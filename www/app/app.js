angular
    .module('etsyApp', [
        'ngStamplay',
        'ionic',
        'ui.router',
        'app.routes',
        'app.admin',
        'app.authenticate',
        'app.checkout',
        'app.home',
        'app.product',
        'app.profile',
        'app.shop',
        'HeaderService',
        'UserService',
        'ProductService',
        'ShopService',
        'OrderService',
        'ngFileUpload',
        'algoliasearch'
    ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.constant('APPID', 'etsyapp')
.constant('APIKEY','b85d2552e92505fcb3aab6090fabfc9c88facead8cfbda2dd1f22302b6cebc96')
.constant('BASEURL', 'https://etsyapp.stamplayapp.com/api/cobject/v1')

.controller('MainController', MainController);

function MainController(User, $rootScope, algolia, $q, $state) {

  var main = this;
  main.logout = logout;
  main.searchProducts = searchProducts;
  main.searchPicked = searchPicked;
  $rootScope.currentUser = {};

  var client = algoliasearch('YA8AZYCAZM', '87db532ef8435bfe054fe57512b655ad');
  var index = client.initIndex('products');

  function searchProducts(query) {
    var deferred = $q.defer();
    index.search(query)
    .then(function(data) {
      deferred.resolve(data.hits);
    }, function(data) {
      deferred.resolve([]);
    });
    return deferred.promise;
  }

  function searchPicked($item, $model, $label) {
    $state.go('product', { id: $item.id, name: $item.name });
  }

  function logout() {
    User.logout();
    $rootScope.currentUser = {};
  }

  User.getCurrent()
    .then(function(data) {
      if (data.get('_id')) {
        $rootScope.currentUser.id    = data.get('_id');
        $rootScope.currentUser.name  = data.get('displayName');
        $rootScope.currentUser.image = data.get('profileImg');
      } else {
        $rootScope.currentUser = {};
      }
    });

}
