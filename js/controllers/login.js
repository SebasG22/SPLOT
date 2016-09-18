/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('loginCtrl',
        function (auth, $state, $scope, $window, whitelist, userActual, $firebaseArray, $firebaseObject, user, users, typeUser, menu) {

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


            //TEST GITHUB

            $scope.whitelist = whitelist;


            $scope.initApp2=function () {
                var provider = new firebase.auth.GithubAuthProvider();
                //$window.alert(JSON.stringify(provider, null, 4));


                firebase.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                    var token = result.credential.accessToken;

                    // The signed-in user info.
                    var user = result.user;
                    /*$window.alert("User:"+user);
                     console.log("USER");
                     console.log("%O",user);
                     $window.alert(user.email); */
                    $scope.userEmail=user.email;
                    $scope.uid=user.uid;



                    var myvalue= false;
                    angular.forEach($scope.whitelist, function (value, key) {

                        if(value.correo==$scope.userEmail){

                            $scope.userFounded=value;



                            myvalue=true;
                        }

                    });



                    if(myvalue==true){
                        console.log("Usuario Encontrado: Redireccionando a Inicio");
                        //$scope.agregarUser($scope.uid,$scope.userFounded);

                        // add it to the /users array
                        // using the same uid defined by firebase
                        var userRef = users.$ref().child($scope.uid);
                        var newUser = $firebaseObject(userRef);
                        newUser.uid =$scope.uid;
                        newUser.usuario = $scope.userFounded.correo;
                        newUser.nombre= $scope.userFounded.nombre;
                        newUser.identificacion=$scope.userFounded.identificacion;
                        newUser.direccion=$scope.userFounded.direccion;
                        newUser.profesion=$scope.userFounded.profesion;
                        newUser.tipo=$scope.userFounded.tipo;
                        newUser.activo='true';
                        newUser.imagen=$scope.userFounded.imagen;



                        // save
                        newUser.$save()
                            // if everything is ok
                            .then( function(ref) {
                                // report in console
                                console.log("User " + $scope.uid+ " added to the users list!");
                                console.log("Se ha agregado el usuario correctamente a Users");
                                userActual.setUID($scope.uid);
                                userActual.set($scope.userFounded);



                                //Reference to menu branch in Firebase
                                var ref = firebase.database().ref("sistema/menuGeneral");


                                //Compare the user type
                                if ($scope.userFounded.tipo == "Administrador") {

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

                                else if ($scope.userFounded.tipo == "Lider") {

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
                                else if ($scope.userFounded.tipo == "Configurador") {

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


                                // $state.go('inicio.bienvenida');

                                // the promise will return ok
                            }, function(error){
                                // report in console
                                console.error("User " + $scope.uid + " cannot be added to the users list!");
                                // the promise will produce an error
                            });





                    }

                    // ...
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });


                firebase.auth().getRedirectResult().then(function(result) {
                    if (result.credential) {
                        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                        var token = result.credential.accessToken;
                        // ...
                    }
                    // The signed-in user info.
                    var user = result.user;

                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });

            };



            $scope.agregarUser = function (uid,usuario) {
                // add it to the /users array
                // using the same uid defined by firebase
                var userRef = users.$ref().child(uid);
                var newUser = $firebaseObject(userRef);
                newUser.uid =uid;
                newUser.usuario = usuario.correo;
                newUser.nombre= usuario.nombre;
                newUser.identificacion=usuario.identificacion;
                newUser.direccion=usuario.direccion;
                newUser.profesion=usuario.profesion;
                newUser.tipo=usuario.permiso;
                newUser.activo='true';
                newUser.imagen=usuario.imagen;



                // save
                newUser.$save()
                    // if everything is ok
                    .then( function(ref) {
                        // report in console
                        console.log("User " + uid+ " added to the users list!");
                        // the promise will return ok
                    }, function(error){
                        // report in console
                        console.error("User " + uid + " cannot be added to the users list!");
                        // the promise will produce an error
                    });
            };



            //Metodos del Login

            //Método que verifica si el usuario esta en la WH
            $scope.verWH = function(correo) {



                $scope.userFounded;
                angular.forEach($scope.whitelist, function (value, key) {

                    if(value.correo==correo){

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
                    return true;

                }

                else {
                    console.log("Usuario No encontrado");
                    $window.alert("Usuario no encontrado: No tiene invitación para registrarse");
                    return false;
                }

            };

        }
    );

