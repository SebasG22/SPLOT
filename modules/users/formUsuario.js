/**
 * Multi-user SPLOT
 */

angular.module('usersSplot').controller('usuariosCtrl',
    function ($scope, $firebaseObject, $firebaseArray, users, whitelist, $customFirebaseArray, userService, auth, $state, $window, typeUser,menu,userActual) {
        $scope.usuarios = users;

        console.log("Tipo de Usuario Factory: " + typeUser.get());
        if (typeUser.get() == "Configurador" || typeUser.get() == "Lider") {
            $window.alert("Página NO AUTORIZADA");
            $state.go("bienvenida");

        }

        $scope.eliminarProyecto = function (proyecto) {
            console.log("Ingrese a Eliminar Proyecto");

        }

        $scope.whitelist = whitelist;
        console.log($scope.whitelist);
        $scope.saludo = "hi usuariosCtrl";
        $scope.agregarUsuarioWH = function () {

            $scope.whitelist.$addWithKey($scope.identificacion.value, {
                nombre: $scope.nombre,
                identificacion: $scope.identificacion.value,
                correo: $scope.login,
                direccion: $scope.direccion,
                profesion: $scope.profesion,
                permiso: $scope.permiso,
                imagen: 'images/user.png'
            })
            console.log("Agregado al whitelist");
            console.log($scope.whitelist);
            $window.alert("Se ha agregado el usuario a la whitelist")
            $state.go("listarUsuarios");
        };

        $scope.form1 = true;
        $scope.form2 = false;

        //Método que verifica si el usuario esta en la WH
        $scope.verWH = function () {
            console.log("Busquedad Whitelist");
            console.log($scope.identificacion);
            //$scope.rec = $scope.whitelist.$getRecord($scope.identificacion.value);
            //console.log($scope.rec);


            $scope.userFounded;
            angular.forEach($scope.whitelist, function (value, key) {

                if (value.correo == $scope.correo) {
                    $scope.userFounded = value;
                }

            });

            if ($scope.userFounded != undefined || $scope.userFounded != null) {
                $scope.form1 = false;
                $scope.form2 = true;
                //modelo asociado para conocer el valor de aceptado y mostrar el siguiente formulario de inscripción
                $scope.aceptado = true;
                console.log("Usuario Encontrado");
                $scope.identificacion = $scope.userFounded.identificacion;
                $scope.nombre = $scope.userFounded.nombre;
                $scope.direccion = $scope.userFounded.direccion;
                $scope.login = $scope.userFounded.login;
                $scope.profesion = $scope.userFounded.profesion;
                $scope.login = $scope.userFounded.correo;
                $scope.permiso = $scope.userFounded.permiso;
                $scope.imagen = 'images/user.png';

            }

            else {
                console.log("Usuario No encontrado");
                $window.alert("No tiene invitación para registrarse");
            }

        };

        $scope.agregarUsuario = function () {


            // create the user
            userService.createUser($scope.login, $scope.password, $scope.nombre, $scope.identificacion, $scope.direccion, $scope.profesion, $scope.permiso, $scope.imagen)
                // if everything is ok
                .then(function (user) {


                    var firebaseUser = auth.$getAuth();


                    if (firebaseUser) {

                        //Change the user UID in UserActual Factory
                        userActual.setUID(firebaseUser.uid);

                        //Reference to users branch in Firebase
                        var ref = firebase.database().ref("users");

                        //Search the user in Users branch in Firebase
                        ref.orderByKey().equalTo(firebaseUser.uid).on("child_added", function (snapshot) {

                            //Get the user information
                            $scope.usuarioSearched = snapshot.val();

                            //Save the information in UserActual Factory
                            userActual.set($scope.usuarioSearched);

                            //Reference to menu branch in Firebase
                            var ref = firebase.database().ref("sistema/menuGeneral");


                            //Compare the user type
                            if ($scope.usuarioSearched.tipo == "Administrador") {

                                //Update the typeUser Factory
                                typeUser.set("Administrador");


                                //Search the "Administador" menu
                                ref.orderByKey().equalTo("Administrador").on("child_added", function (snapshot) {

                                    //Get the menu
                                    $scope.menuSearched = snapshot.val();

                                    //Print the object
                                    //$window.alert(JSON.stringify($scope.menuSearched, null, 4));

                                    //Update the data menu in the factory
                                    menu.set($scope.menuSearched);

                                    //Delete the user from whiteList
                                    $scope.whitelist.$remove($scope.userFounded);

                                    //Go to Welcome Page
                                    $state.go("bienvenida");



                                });


                            }

                            else if ($scope.usuarioSearched.tipo == "Lider") {

                                //Update the typeUser Factory
                                typeUser.set("Lider");


                                //Search the "Administador" menu
                                ref.orderByKey().equalTo("Lider").on("child_added", function (snapshot) {

                                    //Get the menu
                                    $scope.menuSearched = snapshot.val();

                                    //Print the object
                                    //$window.alert(JSON.stringify($scope.menuSearched, null, 4));

                                    //Update the data menu in the factory
                                    menu.set($scope.menuSearched);

                                    //Delete the user from whiteList
                                    $scope.whitelist.$remove($scope.userFounded);

                                    //Go to Welcome Page
                                    $state.go("bienvenida");


                                });

                            }
                            else if ($scope.usuarioSearched.tipo == "Configurador") {

                                //Update the typeUser Factory
                                typeUser.set("Configurador");


                                //Search the "Administador" menu
                                ref.orderByKey().equalTo("Configurador").on("child_added", function (snapshot) {

                                    //Get the menu
                                    $scope.menuSearched = snapshot.val();

                                    //Print the object
                                    //$window.alert(JSON.stringify($scope.menuSearched, null, 4));

                                    //Update the data menu in the factory
                                    menu.set($scope.menuSearched);

                                    //Delete the user from whiteList
                                    $scope.whitelist.$remove($scope.userFounded);

                                    //Go to Welcome Page
                                    $state.go("bienvenida");

                                });

                            }

                        });

                    } else {
                        console.log("Signed out");
                    }

                })
                // if there is an error
                .catch(function (error) {
                    $window.alert(error);
                });


        };
    }
);
