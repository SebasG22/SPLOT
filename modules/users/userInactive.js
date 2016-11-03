/**
<<<<<<< HEAD
 * Created by SebasG on 25/10/16.
 */
var user = firebase.auth().currentUser;

user.delete().then(function() {
    // User deleted.
}, function(error) {
    // An error happened.
});
=======
 * Multi-user SPLOT
 */
angular.module('usersSplot')
    .controller('userInactiveCtrl',
        function (users, $scope, typeUser, $window, userUpdate, $state, auth, projects, $firebaseArray) {

            var user = firebase.auth().currentUser;

            $scope.goOut= function () {
                user.delete().then(function () {
                    // User deleted.
                    $state.go("login");
                }, function (error) {
                    // An error happened.
                });
            };


        });
>>>>>>> DevelopmentSolver
