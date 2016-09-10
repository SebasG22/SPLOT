/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('loginCtrl',
        function (auth, $state, $scope, $window, userActual, $firebaseArray, user, typeUser, menu) {

            this.login = function () {
                auth.$signInWithEmailAndPassword($scope.login, $scope.password)
                    .then(function () {

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

                                        //Go to Welcome Page
                                        $state.go("inicio.bienvenida");


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

                                        //Go to Welcome Page
                                        $state.go("inicio.bienvenida");


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

                                        //Go to Welcome Page
                                        $state.go("inicio.bienvenida");

                                    });

                                }

                            });

                        } else {
                            console.log("Signed out");
                        }
                        // change current view
                        //$state.go("inicio.bienvenida");


                    }).catch(function (error) {
                    console.error("Authentication failed:", error);
                    $window.alert("La autenticación ha fallado: " + error);
                });
            };


        }
    );
