/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('loginCtrl',
        function(auth, $state, $scope,$window,userActual,$firebaseArray,user,typeUser,menu) {

            this.login = function () {
                auth.$signInWithEmailAndPassword($scope.login, $scope.password)
                    .then(function() {

                        var firebaseUser = auth.$getAuth();




                        if (firebaseUser) {
                            userActual.setUID(firebaseUser.uid);

                            //Referencia del usuario
                            var ref = firebase.database().ref("users");

                            $scope.firebaseUser = auth.$getAuth();

                            console.log("UID:"+firebaseUser.uid);
                            //Busca basado en el UID del usuario en la rama USERS
                            ref.orderByKey().equalTo(firebaseUser.uid).on("child_added", function (snapshot) {

                                //Obtiene la informacion del usuario
                                $scope.usuarioSearched = snapshot.val();

                                //Guardar la información del usuario en la factory User
                                user.set($scope.usuarioSearched);

                                //Referencia del usuario
                                var ref = firebase.database().ref("sistema/menuGeneral");


                                //Obtencion del menu segun el tipo de usuario
                                if ($scope.usuarioSearched.tipo == "Administrador") {

                                    //Actualizacion del typeUser Factory
                                    typeUser.set("Administrador");

                                    //Referencia del usuario
                                    var ref = firebase.database().ref("sistema/menuGeneral");

                                    console.log("Referencia menuGeneral:"+ref);




                                        //Actualizacion del typeUser Factory
                                        typeUser.set("Administrador");

                                        //Busca basado en el UID del usuario en la rama USERS
                                        ref.orderByKey().equalTo("Administrador").on("child_added", function (snapshot) {

                                            //Obtiene la informacion del menuGeneral
                                            $scope.menuSearched = snapshot.val();
                                            console.log("Encontre el Menu");

                                            $window.alert(JSON.stringify($scope.menuSearched, null, 4));
                                            menu.set($scope.menuSearched);

                                            $state.go("inicio.bienvenida");


                                        });

                                    






                                }

                                else if ($scope.usuarioSearched.tipo == "Lider") {

                                    //Actualizacion del typeUser Factory
                                    typeUser.set("Lider");

                                    //Busca basado en el UID del usuario en la rama USERS
                                    ref.orderByKey().equalTo("Lider").on("child_added", function (snapshot) {

                                        //Obtiene la informacion del menuGeneral
                                        $scope.menuSearched = snapshot.val();
                                        console.log("Encontre el Menu");

                                        $window.alert(JSON.stringify($scope.menuSearched, null, 4));
                                        menu.set($scope.menuSearched);

                                        $state.go("inicio.bienvenida");


                                    });

                                }
                                else if ($scope.usuarioSearched.tipo == "Configurador") {

                                    //Actualizacion del typeUser Factory
                                    typeUser.set("Configurador");

                                    //Busca basado en el UID del usuario en la rama USERS
                                    ref.orderByKey().equalTo("Configurador").on("child_added", function (snapshot) {

                                        //Obtiene la informacion del menuGeneral
                                        $scope.menuSearched = snapshot.val();
                                        console.log("Encontre el Menu");

                                        $window.alert(JSON.stringify($scope.menuSearched, null, 4));
                                        menu.set($scope.menuSearched);

                                        $state.go("inicio.bienvenida");


                                    });

                                }

                            });

                        } else {
                            console.log("Signed out");
                        }
                        // change current view
                        //$state.go("inicio.bienvenida");




                    }).catch(function(error) {
                    console.error("Authentication failed:", error);
                    $window.alert("La autenticación ha fallado: "+ error );
                });
            };



        }
    );
