angular
    .module('app.routes', [])
    .config(['$stateProvider', '$urlRouterProvider', AppRoutes]);

/**
 * Create all the application routes
 */
function AppRoutes($stateProvider, $urlRouterProvider) {

    // pretty Angular URLs

    // the route people are sent to when they are lost
    // the home page in this case
    $urlRouterProvider.otherwise('/tab/home');

    // create our routes, set the view, pull in the controller
    $stateProvider

        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })

        // home page
        .state('tab.home', {
            url: '/home',
            views: {
              'tab-home': {
                templateUrl : 'app/components/home/home.html',
                controller  : 'HomeController as home'
              }
            }
        })

        // shop page
        .state('tab.shop', {
            url: '/shop/{name}',
            views: {
              'tab-shop': {
                templateUrl : 'app/components/shop/shop.html',
                controller  : 'ShopController as shop'
              }
            }
        })

        // product page (a child of shop)
        .state('tab.product', {
            url: '/listing/{id}/{name}',
            views: {
              templateUrl : 'app/components/product/product.html',
              controller  : 'ProductController as product'
            }
        })

        // login/signup page
        .state('tab.authenticate', {
            url: '/authenticate',
            views: {
              templateUrl : 'app/components/authenticate/authenticate.html',
              controller  : 'AuthenticateController as authenticate'
            }
        })

        // profile page
        .state('tab.profile', {
            url: '/profile/{user_name}',
            views: {
              templateUrl : 'app/components/profile/profile.html',
              controller  : 'ProfileController as profile'
            }
        })

        // checkout page
        .state('tab.checkout', {
            url: '/checkout/{id}',
            views: {
              templateUrl : 'app/components/checkout/checkout.html',
              controller  : 'CheckoutController as checkout'
            }
        })

        // checkout page
        .state('tab.admin', {
            url: '/admin',
            views: {
              templateUrl : 'app/components/admin/admin.html',
              controller  : 'AdminController as admin'
            }
        });
}
