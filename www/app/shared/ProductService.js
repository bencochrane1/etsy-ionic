angular.module('ProductService', [])

.factory('Product', ProductService);

function ProductService($stamplay, $q, $http) {

  return {
    all: all,
    get: get,
    create: create,
    update: update,
    destroy: destroy,
    getComments: getComments,
    comment: comment,
    createPicture: createPicture,
    getCategories: getCategories
  };

  function all() {
    var deferred = $q.defer();
    var products = new Stamplay.Cobject('products').Collection;
    products.populate().fetch()
    .then(function() {
      console.log('heres all the products: ', products);
        deferred.resolve(products);
    });

    return deferred.promise;
  }

  function get(id) {
    var deferred = $q.defer();

    var product = new Stamplay.Cobject('products').Model;
    product.fetch(id, { populate: true })
    .then(function() {
      deferred.resolve(product);
    });

    return deferred.promise;
  }

  function create(data) {
    var deferred = $q.defer();

    var product = new Stamplay.Cobject('products').Model;
    angular.forEach(data, function(value, key) {
      product.set(key, value);
    });

    product.save()
    .then(function() {
      deferred.resolve(product);
    })

    return deferred.promise;
  }

  function update(id, data) {
    var deferred = $q.defer();

    var product = new Stamplay.Cobject('products').Model;
    product.fetch(id)
    .then(function() {
      angular.forEach(data, function(value, key) {
        product.set(key, value);
      });
      return product.save();
    })
    .then(function() {
      deferred.resolve(product);
    }) ;

    return deferred.promise;
  }

  function destroy(id) {
    var deferred = $q.defer();

    var product = new Stamplay.Cobject('products').Model;

    product.fetch(id)
    .then(function() {
      return product.destroy();
    })
    .then(function() {
      deferred.resolve({ 'success' : true })
    });

    return deferred.promise;
  }

  function getComments(id) {
    var deferred = $q.defer();

    var product = new Stamplay.Cobject('products').Model;
    product.fetch(id)
    .then(function() {
      deferred.resolve(product.getComments())
    });

    return deferred.promise;
  }

  function comment(id, data) {
    var deferred = $q.defer();

    var product = new Stamplay.Cobject('products').Model;
    product.fetch(id)
    .then(function() {
      return product.comment(data.text);
    })
    .then(function() {
      console.log('proudct:', product)
      deferred.resolve(product);
    });

    return deferred.promise;
  }

  function createPicture(files) {
    var deferred = $q.defer();

    var pictureIDs = [];
    angular.forEach(files, function(file) {
      var fd = new FormData();
      fd.append('photo', file);

      $http({
        method: 'POST',
        url: 'https://etsyapp.stamplayapp.com/api/cobject/v1/pictures',
        data: fd,
        headers: { 'Content-Type' : undefined },
        photo: file
      })
      .then(function(response) {
        pictureIDs.push(response.data.id);
        deferred.resolve({ pictures: pictureIDs });
      });
    });

    return deferred.promise;
  }

  function getCategories() {
    var deferred = $q.defer();

    var products = new Stamplay.Cobject('categories').Collection;
    products.fetch()
    .then(function() {
      deferred.resolve(products);
    });

    return deferred.promise;
  }
}
