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


            $scope.projects=projects;

            $scope.currentUser=userActual.getUID();

            $scope.deleteUserWithInfo=function (){

                $scope.userProjects =projectsRelatedF.get();

                angular.forEach($scope.userProjects, function(value, key) {

                    console.log("Key Project:"+value.key);

                    //$scope.projects[$scope.projects.$indexFor(value.key)].activo = $scope.currentUser.activo;

                    $scope.currentProject=$scope.projects[$scope.projects.$indexFor(value.key)];

                    $scope.miembrosProject=$scope.currentProject.miembros;

                    $scope.teamLeadersProject=$scope.currentProject.lideres;

                    angular.forEach($scope.miembrosProject, function(valueMember, keyMember) {

                        console.log("Value:"+valueMember.uid);
                        console.log("UID:"+$scope.currentUser);
                        if(valueMember.uid==$scope.currentUser){

                            $scope.currentProject.miembros.splice(keyMember, 1);

                            console.log($scope.currentProject);

                            $scope.projects[$scope.projects[$scope.projects.$indexFor(value.key)]] = $scope.currentProject;

                            $scope.projects.$save($scope.projects[$scope.projects.$indexFor(value.key)]).then(function() {

                                $window.alert("El usuario ha sido eliminado de el proyecto relacionado");

                            });


                            //Remove projects Related: $remove doesn't work
                            /*

                             $scope.projects.$remove($scope.projects[$scope.projects.$indexFor(value.key).miembros[keyMember]]).then(function() {
                             $window.alert("Usuario Removido del Sistema Satisfactoriamente");
                             });

                            $scope.projects.$remove($scope.des).then(function() {
                                $window.alert("Usuario Removido del Sistema Satisfactoriamente");
                            });
                            $scope.projects.$remove($scope.projects[$scope.projects.$indexFor(value.key)].nombre).then(function() {
                                $window.alert("Usuario Removido del Sistema Satisfactoriamente");
                            });
                            //$scope.usuarios.$save($scope.usuarios.$getRecord(userUpdate.get()));
                            console.log($scope.projects);
                            */
                        }
                    });
                });
            }

        }
    );
