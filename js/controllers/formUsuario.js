/**
 * Created by SebasG on 5/07/16.
 */
// obtenga el módulo y cree un controlador
angular.module('asideMenuDemo').controller('usuariosCtrl',
    function($scope, $firebaseObject, $firebaseArray, users,whitelist,$customFirebaseArray,userService, auth, $state, $window,typeUser){
        $scope.usuarios = users;


        console.log("Ingrese a usuariosCtrl");


        console.log("Tipo de Usuario Factory: "+ typeUser.get());
        if(typeUser.get()=="Configurador" || typeUser.get()=="Lider" ){
            $window.alert("Página NO AUTORIZADA");
            $state.go("inicio.bienvenida");

        }

        console.log(typeUser.get());



        $scope.eliminarProyecto=function (proyecto) {
            console.log("Ingrese a Eliminar Proyecto");

        }

        $scope.whitelist = whitelist;
        console.log($scope.whitelist);
        $scope.saludo="hi usuariosCtrl";
        $scope.agregarUsuarioWH= function () {

            $scope.whitelist.$addWithKey($scope.identificacion.value,{nombre:$scope.nombre,identificacion:$scope.identificacion.value,correo:$scope.login,direccion:$scope.direccion,profesion:$scope.profesion,permiso:$scope.permiso})
            console.log("Agregado al whitelist");
            console.log($scope.whitelist);
            $window.alert("Se ha agregado el usuario a la whitelist")
            $state.go("inicio.listarUsuarios");
        };


        $scope.form1=true;
        $scope.form2=false;


        //Método que verifica si el usuario esta en la WH
        $scope.verWH = function() {
            console.log("Busquedad Whitelist");
            console.log($scope.identificacion);


            $scope.rec = $scope.whitelist.$getRecord($scope.identificacion.value);
            console.log($scope.rec);

            if ($scope.rec != null) {
                $scope.form1 = false;
                $scope.form2 = true;
                //modelo asociado para conocer el valor de aceptado y mostrar el siguiente formulario de inscripción
                $scope.aceptado = true;
                console.log("Usuario Encontrado");
                $scope.nombre = $scope.rec.nombre;
                $scope.direccion = $scope.rec.direccion;
                $scope.login = $scope.rec.login;
                $scope.profesion = $scope.rec.profesion;
                $scope.login=$scope.rec.correo;
                $scope.permiso=$scope.rec.permiso;

            }

            else {
                console.log("Usuario No encontrado")
                $window.alert("No tiene invitación para registrarse");
            }

        };

        $scope.agregarUsuario = function() {


            // create the user
                userService.createUser($scope.login,$scope.password, $scope.nombre, $scope.identificacion, $scope.direccion, $scope.profesion, $scope.permiso)
                    // if everything is ok
                    .then(function (user) {
                        $scope.whitelist.$remove($scope.rec);
                        $state.go("inicio.listarUsuarios");
                    })
                    // if there is an error
                    .catch(function (error) {
                        $window.alert(error);
                    });


        };










    }
);



