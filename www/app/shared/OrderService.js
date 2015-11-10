angular.module('OrderService', [])

.factory('Order', OrderService)

function OrderService($stamplay, $q, $http) {
  return {
    create: create,
    charge: charge,
    history: history
  }

  function create(data) {
    console.log('data into create', data)
    var deferred = $q.defer();

    var order = new $stamplay.Cobject('orders').Model;

    console.log('new order object: ', order)
    angular.forEach(data, function(value, key) {
      console.log('in the order loop', data, key, value)
      order.set(key, value)
    });

    order.save()
    .then(function() {
      console.log('saves the order', order);
      deferred.resolve(order);
    });

    return deferred.promise;
  }

  function charge(userID, price, cardData) {
    var deferred = $q.defer();

    Stripe.card.createToken(cardData, function(status, response) {
      var token = response.id;

      price = price * 100;
      var customer = new $stamplay.Stripe();

      customer.charge(userID, token, price, 'USD')
      .then(function() {
        deferred.resolve(customer);
      });
    });

    return deferred.promise;
  }

  function history(userID) {
    var deferred = $q.defer();

    var orders = new $stamplay.Cobject('orders').Collection;
    orders.populate().fetch()
    .then(function() {
      deferred.resolve(orders);
    });

    return deferred.promise;
  }


}
