/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('userListCtrl',
        function(users, $scope,typeUser,$window,userUpdate,$state) {
            $scope.users = users;

            //All the Users -> Firebase Array
            $scope.usuarios = users;

            console.log("Tipo de Usuario Factory: "+ typeUser.get());
            if(typeUser.get()=="Configurador" || typeUser.get()=="Lider" ){
                $window.alert("Página NO AUTORIZADA");
                $state.go("inicio.bienvenida");

            }

            $scope.eliminarUsuario=function (usuarioUID) {

                $scope.usuarios[$scope.usuarios.$indexFor(usuarioUID)].activo = "false";
                $scope.usuarios.$save($scope.usuarios.$getRecord(usuarioUID));
                $window.alert("El usuario se ha desactivado");

            };

            //Method to : Edit User Information for user selected
            $scope.editUser=function (usuarioUID) {

                //Save the user UID in the userUpdate Factory
                userUpdate.set(usuarioUID);

                console.log("UID User List:"+userUpdate.get());

                userUpdate.setAction('EditInformation');

                //Go to Edit Page
                $state.go("inicio.editarPerfil");


            }


            $scope.activeUsersFilter = function (item) {
                
                if (item.activo === 'true') {
                    return item;
                }
            };
        }
    );
