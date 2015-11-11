angular
    .module('UserService', [])
    .factory('User', UserService);

function UserService($stamplay, $q) {

    // return an object with all our functions
    return {
        getCurrent: getCurrent,
        signup: signup,
        login: login,
        logout: logout,
        getFacebookUser,
        setFacebookUser
    };

    function getFacebookUser() {
      return JSON.parse(window.localStorage.facebook_user || '{}');
    }

    function setFacebookUser(userData) {
      console.log('this is the user data', userData);
      window.localStorage.facebook_user = JSON.stringify(userData);
    }

    function signUpFacebookUser(userData) {
      var deferred = $q.defer();
      var user = $stamplay.User().Model;
      var newData = {

      }
      user.signup(userData)
      .then(function() {
        deferred.resolve();
      })

      return deferred.promise;
    }

    function getCurrent() {
        var def = $q.defer();
        var user = $stamplay.User().Model;
        user.currentUser()
        .then(function() {
            def.resolve(user);
        });

        return def.promise;
    }

    function signup(data) {
        var def = $q.defer();

        // instantiate a new user model from the stamplay js sdk
        var user = $stamplay.User().Model;
        user.signup(data)
            .then(function() {
                // send the entire user model back
                def.resolve(user);
            })

        return def.promise;
    }

    /**
     * Log a user in with their email and password
     */
    function login(data) {
        var def = $q.defer();

        var user = $stamplay.User().Model;
        user.login(data.email, data.password)
            .then(function() {
                // send the entire user model back
                def.resolve(user);
            }, function() {
                def.reject({ 'error': 'Unable to login user.' });
            });

        return def.promise;
    }

    /**
     * Log the current user out
     * Will also redirect the browser to the logout url (home)
     */
    function logout() {
        var user = $stamplay.User().Model;
        user.logout();
    }

}
