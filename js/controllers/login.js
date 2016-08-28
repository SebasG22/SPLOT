/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('loginCtrl',
        function(auth, $state, $scope,$window,userActual) {

            this.login = function () {
                auth.$signInWithEmailAndPassword($scope.login, $scope.password)
                    .then(function() {

                        var firebaseUser = auth.$getAuth();

                        if (firebaseUser) {
                            userActual.setUID(firebaseUser.uid);
                            console.log("Signed in as:", firebaseUser.uid);

                            console.log("Guardado UID:"+userActual.getUID())


                        } else {
                            console.log("Signed out");
                        }
                        // change current view
                        $state.go("inicio.bienvenida");




                    }).catch(function(error) {
                    console.error("Authentication failed:", error);
                    $window.alert("La autenticación ha fallado: "+ error );
                });
            };



        }
    );
