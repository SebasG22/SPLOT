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


<<<<<<< 0819d4d51bb2d6a6aeb1ef47e3e9dbc8550f69c2
        });
>>>>>>> DevelopmentSolver
=======
        }
    );
>>>>>>> New organization of the project: Modules
