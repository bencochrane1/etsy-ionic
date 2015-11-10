angular
    .module('app.home', [])
    .controller('HomeController', HomeController);

function HomeController(Product, $q, $cordovaOauth, $cordovaFacebook) {

  console.log('we are here')
    var home = this;
    home.deleteProduct = deleteProduct;
    home.facebookLogin = facebookLogin;

    Product.all()
    .then(function(data) {
      home.products = data.instance;
      console.log('home products: ', home.products);
    });

    function deleteProduct(id, $index) {
      var deferred = $q.defer();
      home.products.splice($index, 1);

      Product.destroy(id)
      .then(function() {
        deferred.resolve();
      });

      return deferred.promise;
    }
}
