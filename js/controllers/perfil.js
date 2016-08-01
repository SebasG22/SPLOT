/**
 * Created by SebasG on 10/07/16.
 */
angular.module('asideMenuDemo')
    .controller('profileCtrl',
        function (auth, $state, $scope, $firebaseObject, projects, user,$window,$firebaseObject,projectsRelatedF) {

            //Información del Usuario Actual
            $scope.usuario;

            //Obtener información del Usuario Actual
            $scope.usuario = user.get();




            $scope.projectsRelated=projectsRelatedF.get();


            this.changePassword = function () {
                if ($scope.newPassword1 == $scope.newPassword2) {
                    auth.$updatePassword(newPassword1);
                }

            }

            this.resetPassword = function () {
                auth.$sendPasswordResetEmail($scope.login);
            }
            $scope.deleteUser = function () {
                auth.$deleteUser().then(function () {
                    console.log("User removed successfully!");
                    $state.go("login");
                }).catch(function (error) {
                    console.error("Error: ", error);
                });
            }

        }
    );
