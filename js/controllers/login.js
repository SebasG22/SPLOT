/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('loginCtrl',
        function (auth, $state, $scope, $window, whitelist, userActual, $firebaseArray, user, typeUser, menu) {

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


            $scope.openButton=function () {

             $scope.infoToken="Abri el boton";

             var provider = new firebase.auth.GithubAuthProvider();
             // [END createprovider]
             // [START addscopes]
             provider.addScope('repo');
             // [END addscopes]
             // [START signin]
             firebase.auth().signInWithRedirect(provider);


             firebase.auth().getRedirectResult().then(function (result) {
             if (result.credential) {
             // This gives you a GitHub Access Token. You can use it to access the GitHub API.
             var token = result.credential.accessToken;
             // [START_EXCLUDE]
             $scope.infoToken=token;
             $window.alert("Entre al IF Token");
             } else {
             $scope.infoToken="";
             $window.alert("Entre al ELSE Token");

             // [END_EXCLUDE]
             }
             // The signed-in user info.
             var user = result.user;

                 if($scope.verWH(user.email)==true){
                     $window.alert("Usuario autenticado con GitHub correctamente");
                     $state.go("inicio.bienvenida");
                 }

             $window.alert("Usuario: "+user);

             }).catch(function (error) {
             // Handle Errors here.
             var errorCode = error.code;
             var errorMessage = error.message;
             // The email of the user's account used.
             var email = error.email;
             // The firebase.auth.AuthCredential type that was used.
             var credential = error.credential;
             // [START_EXCLUDE]
             if (errorCode === 'auth/account-exists-with-different-credential') {
             $window.alert('You have already signed up with a different auth provider for that email.');
             // If you are using multiple auth providers on your app you should handle linking
             // the user's accounts here.
             } else {
             console.error(error);
             }

             });


                //SE DEBE AGREGAR EL USUARIO A USER Y ELIMINARLO DE WHITELIST Y YA ENTRA AL SISTEMA
             firebase.auth().onAuthStateChanged(function(user) {
             if (user) {
             // User is signed in.
             var displayName = user.displayName;
             var email = user.email;
             var emailVerified = user.emailVerified;
             var photoURL = user.photoURL;
             var isAnonymous = user.isAnonymous;
             var uid = user.uid;
             var providerData = user.providerData;
             // [START_EXCLUDE]

             //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
             console.log("%O",user);
             // [END_EXCLUDE]
             } else {
             // User is signed out.
             // [START_EXCLUDE]
             //document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
             //document.getElementById('quickstart-sign-in').textContent = 'Sign in with GitHub';
             //document.getElementById('quickstart-account-details').textContent = 'null';
             //document.getElementById('quickstart-oauthtoken').textContent = 'null';
             // [END_EXCLUDE]
             }
             // [START_EXCLUDE]
             //document.getElementById('quickstart-sign-in').disabled = false;
             // [END_EXCLUDE]
             });
             // [END authstatelistener]

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
                    $window.alert("No tiene invitación para registrarse");
                    return false;
                }

            };

            $scope.agregarUsuario = function() {


                // create the user
                userService.createUser($scope.login,$scope.password, $scope.nombre, $scope.identificacion, $scope.direccion, $scope.profesion, $scope.permiso,$scope.imagen)
                    // if everything is ok
                    .then(function (user) {
                        $scope.whitelist.$remove($scope.userFounded);
                        $state.go("inicio.listarUsuarios");
                    })
                    // if there is an error
                    .catch(function (error) {
                        $window.alert(error);
                    });


            };
        }
    );
