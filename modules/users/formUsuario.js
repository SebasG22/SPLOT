/**
 * Multi-user SPLOT
 */

angular.module('usersSplot').controller('usuariosCtrl',
    function($scope, $firebaseObject, $firebaseArray, users,whitelist,$customFirebaseArray,userService, auth, $state, $window,typeUser){
        $scope.usuarios = users;




        console.log("Tipo de Usuario Factory: "+ typeUser.get());
        if(typeUser.get()=="Configurador" || typeUser.get()=="Lider" ){
            $window.alert("Página NO AUTORIZADA");
            $state.go("bienvenida");

        }

        $scope.eliminarProyecto=function (proyecto) {
            console.log("Ingrese a Eliminar Proyecto");

        }

        $scope.whitelist = whitelist;
        console.log($scope.whitelist);
        $scope.saludo="hi usuariosCtrl";
        $scope.agregarUsuarioWH= function () {

            $scope.whitelist.$addWithKey($scope.identificacion.value,{nombre:$scope.nombre,identificacion:$scope.identificacion.value,correo:$scope.login,direccion:$scope.direccion,profesion:$scope.profesion,permiso:$scope.permiso,imagen:'images/user.png'})
            console.log("Agregado al whitelist");
            console.log($scope.whitelist);
            $window.alert("Se ha agregado el usuario a la whitelist")
            $state.go("listarUsuarios");
        };


        $scope.form1=true;
        $scope.form2=false;


        //Método que verifica si el usuario esta en la WH
        $scope.verWH = function() {
            console.log("Busquedad Whitelist");
            console.log($scope.identificacion);


            //$scope.rec = $scope.whitelist.$getRecord($scope.identificacion.value);
            //console.log($scope.rec);


            $scope.userFounded;
            angular.forEach($scope.whitelist, function (value, key) {

                if(value.correo==$scope.correo){

                    $scope.userFounded=value;

                }

            });



            if ($scope.userFounded != undefined || $scope.userFounded !=null) {
                $scope.form1 = false;
                $scope.form2 = true;
                //modelo asociado para conocer el valor de aceptado y mostrar el siguiente formulario de inscripción
                $scope.aceptado = true;
                console.log("Usuario Encontrado");
                $scope.identificacion=$scope.userFounded.identificacion;
                $scope.nombre = $scope.userFounded.nombre;
                $scope.direccion = $scope.userFounded.direccion;
                $scope.login = $scope.userFounded.login;
                $scope.profesion = $scope.userFounded.profesion;
                $scope.login=$scope.userFounded.correo;
                $scope.permiso=$scope.userFounded.permiso;
                $scope.imagen='images/user.png';

            }

            else {
                console.log("Usuario No encontrado");
                $window.alert("No tiene invitación para registrarse");
            }

        };

        $scope.agregarUsuario = function() {


            // create the user
            userService.createUser($scope.login,$scope.password, $scope.nombre, $scope.identificacion, $scope.direccion, $scope.profesion, $scope.permiso,$scope.imagen)
                // if everything is ok
                .then(function (user) {
                    $scope.whitelist.$remove($scope.userFounded);
<<<<<<< 0819d4d51bb2d6a6aeb1ef47e3e9dbc8550f69c2
                    $state.go("listarUsuarios");
=======
                    $state.go("inicio.listarUsuarios");
>>>>>>> New organization of the project: Modules
                })
                // if there is an error
                .catch(function (error) {
                    $window.alert(error);
                });


        };










    }
<<<<<<< 0819d4d51bb2d6a6aeb1ef47e3e9dbc8550f69c2
);

=======
);
>>>>>>> New organization of the project: Modules
