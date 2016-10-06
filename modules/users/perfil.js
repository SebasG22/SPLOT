/**
 * Multi-user SPLOT
 */

angular.module('usersSplot')
    .controller('profileCtrl',
        function (auth, $state, $scope, $firebaseObject, projects, user,users,$window,$firebaseObject,projectsRelatedF,userUpdate,userActual) {

            //Información del Usuario Actual
            //$scope.usuario;

            //Obtener información del Usuario Actual
            //$scope.usuario = user.get();



            console.log("AUTH GET :"+auth.$getAuth().uid);

            //All the Users -> Firebase Array
            $scope.usuarios=users;

            //Get the Record in  FirebaseArray througth userUpdate Factory
            $scope.usuario= $scope.usuarios.$getRecord(auth.$getAuth().uid);


            $scope.projectsRelated=projectsRelatedF.get();


            $scope.auth = auth;

            $scope.auth2 = auth.auth;


            console.log("Auth Info:"+auth);



            //Method to Update User Information

            $scope.updateInformation= function (action) {

                //Pass the User UID to a userUpdate Factory, and the Factory save the data to change the information in the Edit Page.
                userUpdate.set(userActual.getUID());

                //Send the user Action, The selection affects the fields that the page shows.
                userUpdate.setAction(action);

                //Go to Edit Page
                $state.go("editarPerfil");

            };



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
