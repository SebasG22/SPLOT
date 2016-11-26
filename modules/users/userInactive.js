/**
 * Multi-user SPLOT
 */
angular.module('usersSplot')
    .controller('userInactiveCtrl',
        function (users, $scope, typeUser, $window, userUpdate, $state, auth, projects, $firebaseArray) {

            var user = firebase.auth().currentUser;
            $scope.usuarios=users;

            $scope.goOut= function () {
                user.delete().then(function () {
                    // User deleted.

                    $scope.usuarios.$remove(user);
                    $state.go("login");
                }, function (error) {
                    // An error happened.
                });
            };


        });
