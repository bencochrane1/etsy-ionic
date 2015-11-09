angular
    .module('app.checkout', [])
    .controller('CheckoutController', CheckoutController);

function CheckoutController($stateParams, $rootScope, Product, Order) {
    var checkout = this;
    checkout.orderData = {};
    checkout.cardData = {};
    checkout.processPurchase = processPurchase;

    Product.get($stateParams.id)
    .then(function(data) {
      checkout.product = data.instance;
      checkout.orderData.product = [data.get('_id')];
      checkout.orderData.price = data.get('price');
    });

    function processPurchase() {
      checkout.successMessage = '';
      Order.charge($rootScope.currentUser.id, checkout.orderData.price, checkout.cardData)
      .then(function(data) {
        console.log('checkout details: ', checkout.orderData);
        Order.create(checkout.orderData)
        .then(function(data) {
          console.log('order create response', data)
          checkout.successMessage = 'Thanks for your order! Your order number is #' + data.get('_id');
        });
      });
    }


}
