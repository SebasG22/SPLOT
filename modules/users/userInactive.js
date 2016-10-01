/**
 * Created by SebasG on 4/09/16.
 */
/**
 * Multi-user SPLOT
 */

angular.module('usersSplot')
    .controller('userInactiveCtrl',
        function (auth, $state, users, $scope, $window, $http, projects, $firebaseObject, typeUser,userActual) {

            //PRINT IN CONSOLE THE TYPE OF CURRENT USER
            console.log("Tipo de Usuario Factory: " + typeUser.get());

            $scope.auth2 = auth;

            //All the Users -> Firebase Array
            $scope.usuarios = users;




            console.log("UID Inactive:"+userActual.getUID());

            $scope.usuarios.$remove($scope.usuarios.$getRecord(userActual.getUID()));


            $scope.auth2.$deleteUser().then(function() {
                console.log("User removed successfully!");
            }).catch(function(error) {
                console.error("Error: ", error);
            });

            $scope.goOut = function () {



                $scope.auth2.$signOut();

                $state.go("login");

            }



        }
    );
