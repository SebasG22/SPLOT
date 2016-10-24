/**
 * Multi-user SPLOT
 */
angular.module('projectsSplot')
    .controller('proyectoUpdateCtrl',
        function(users, $scope, $window, $http, projects, $state, $firebaseObject, typeUser, projectSelected) {

            //PRINT IN CONSOLE THE TYPE OF CURRENT USER
            console.log("Tipo de Usuario Factory: " + typeUser.get());

            //CHECK THE CURRENT USER, IF HE HAS THE PERMISSION HE CAN SEE THE PAGE, IF NOT THE USER REDIRECT HIM TO WELCOME PAGE
            if (typeUser.get() == "Administrador2" || typeUser.get() == "Configurador") {
                $window.alert("Página NO AUTORIZADA");
                $state.go("bienvenida");

            }

            $scope.projectEdit = projectSelected.getInformation();

            //Variable to save the members in RAM (Current Session)
            $scope.listarMiembros = [];

            //Variable to save the leaderships in RAM (Current Session)
            $scope.listarLideres = [];

            $scope.projectName = $scope.projectEdit.nombre;
<<<<<<< HEAD

            $scope.projectDescription = $scope.projectEdit.descripcion;

            $scope.modeloFeatures = $scope.projectEdit.modelo;

            $scope.archivos = $scope.projectEdit.archivos;

            //Get all the users from Factory
            $scope.usuarios = users;

<<<<<<< HEAD
            $scope.archivos= $scope.projectEdit.archivos;

=======
            //Initial Values to open the buttons
            $scope.agregarLider = false;
            $scope.agregarMiembro = false;
            $scope.agregarArchivo = false;
>>>>>>> Development

            //Method to show the leaderships througth a button: When the user do a click
            $scope.mostrarLideres = function() {
                if (!$scope.agregarLider) {
                    $scope.agregarLider = true;
                    $scope.agregarMiembro = false;
                } else {
                    $scope.agregarLider = false;
                }
            };

=======

            $scope.projectDescription = $scope.projectEdit.descripcion;

            $scope.modeloFeatures = $scope.projectEdit.modelo;

            $scope.archivos = $scope.projectEdit.archivos;

            //Get all the users from Factory
            $scope.usuarios = users;

            //Initial Values to open the buttons
            $scope.agregarLider = false;
            $scope.agregarMiembro = false;
            $scope.agregarArchivo = false;

            //Method to show the leaderships througth a button: When the user do a click
            $scope.mostrarLideres = function() {
                if (!$scope.agregarLider) {
                    $scope.agregarLider = true;
                    $scope.agregarMiembro = false;
                } else {
                    $scope.agregarLider = false;
                }
            };

>>>>>>> Development
            //Method to show the members througth a button: When the user do a click
            $scope.mostrarMiembros = function() {
                if (!$scope.agregarMiembro) {
                    $scope.agregarMiembro = true;
                    $scope.agregarLider = false;
                } else {
                    $scope.agregarMiembro = false;
                }
            };

            angular.forEach($scope.projectEdit.miembros, function(value, key) {

                console.log("Print ID:" + value.uid);

                //Reference to users branch in Firebase
                var ref = firebase.database().ref("users");

                //Search the user in Users branch in Firebase
                ref.orderByKey().equalTo(value.uid).on("child_added", function(snapshot) {

                    //Get the user information
                    $scope.miembro = snapshot.val();

                    $scope.listarMiembros.push($scope.miembro);

                });

            });

            angular.forEach($scope.projectEdit.lideres, function(value, key) {

                console.log("Print ID:" + value.uid);

                //Reference to users branch in Firebase
                var ref = firebase.database().ref("users");

                //Search the user in Users branch in Firebase
                ref.orderByKey().equalTo(value.uid).on("child_added", function(snapshot) {

                    //Get the user information
                    $scope.miembro = snapshot.val();

                    $scope.listarLideres.push($scope.miembro);

                });

            });

            //Get element position
            function getKey(uidSearched) {

                var response = -1;
                angular.forEach($scope.usuarios, function(value, key) {
                    if (uidSearched == value.uid) {
                        response = key;
                    }
                });
                return response;
            }

            checkusersSelected();

            //Function to check the leaders and member selected in the project
            function checkusersSelected() {

                angular.forEach($scope.listarMiembros, function(valueMember, keyMiembros) {

                    var key = getKey(valueMember.uid);

                    if (key >= 0) {
                        $scope.usuarios.splice(key, 1);
                        console.log("Usuario Eliminado");

                    }
                });
            }

        }
    );