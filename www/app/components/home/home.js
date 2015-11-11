angular
    .module('app.home', [])
    .controller('HomeController', HomeController);

function HomeController(Product, $q, $cordovaOauth, $cordovaFacebook, $cordovaActionSheet, $state, User) {

  console.log('we are here')
    var home = this;
    home.deleteProduct = deleteProduct;
    home.facebookLogin = facebookLogin;
    home.facebookLogout = facebookLogout;

    Product.all()
    .then(function(data) {
      home.products = data.instance;
      console.log('home products: ', home.products);
    });

    function facebookLoginSuccess(response) {
        console.log('response from fb for success:', response);
        var user = User.getFacebookUser('facebook');
        console.log('user: ', user);
        if (response.status === 'connected') {
          console.log('getLoginStatus: ', response.status);
          getFacebookProfileInfo(response.authResponse)
          .then(function(profileInfo) {
            console.log('this is the profile info', profileInfo);
            var userData = {
              authResponse: response.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture: "http://graph.facebook.com/" + response.authResponse.userID + "/picture?type=large"
            }
            console.log('user data in facebookLoginSuccess: ', userData);
            User.setFacebookUser(userData);
            User.signUpFacebookUser(userData);
            $state.go('tab.home');
          })
          .catch(function(response) {
            console.log('we couldnt get the profile info', response);
          })
        } else {
          $state.go('tab.home');
        }
    }

    function facebookLoginFailure(response) {
      console.log('response from fb for failure: ', response);
    }

    function facebookLogin() {
      facebookConnectPlugin.login(['email', 'public_profile'], facebookLoginSuccess, facebookLoginFailure);
    }

    function facebookLogout() {

      var options = {
        title: 'Are you sure you want to log out?',
        addCancelButtonWithLabel: 'Cancel',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true,
        addDestructiveButtonWithLabel : 'Log Out'
      };

      $cordovaActionSheet.show(options)
      .then(function(btnIndex) {
        if (btnIndex === 1) {
          console.log('you tried to delete');
          facebookConnectPlugin.logout(function(response) {
            console.log('you were logged out from facebook', response);
          });
        }
      });
    }

    function getFacebookProfileInfo(authResponse) {
      var deferred = $q.defer();

      facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null, function(response) {
        console.log('response from api: ', response);
        deferred.resolve(response);
      }, function(response) {
        console.log('error getting profile info', response);
        deferred.resolve(response);
      });

      return deferred.promise;
    }

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
