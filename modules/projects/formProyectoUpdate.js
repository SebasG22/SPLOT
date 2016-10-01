/**
 * Multi-user SPLOT
 */

angular.module('projectsSplot')
    .controller('proyectoUpdateCtrl',
        function (users, $scope, $window, $http, projects, $state, $firebaseObject, typeUser,projectSelected) {

            //PRINT IN CONSOLE THE TYPE OF CURRENT USER
            console.log("Tipo de Usuario Factory: " + typeUser.get());

            //CHECK THE CURRENT USER, IF HE HAS THE PERMISSION HE CAN SEE THE PAGE, IF NOT THE USER REDIRECT HIM TO WELCOME PAGE
            if (typeUser.get() == "Administrador2" || typeUser.get() == "Configurador") {
                $window.alert("Página NO AUTORIZADA");
                $state.go("bienvenida");

            }





            $scope.projectEdit=projectSelected.getInformation();

            //Variable to save the members in RAM (Current Session)
            $scope.listarMiembros = [];

            //Variable to save the leaderships in RAM (Current Session)
            $scope.listarLideres = [];

            $scope.projectName=$scope.projectEdit.nombre;

            $scope.projectDescription=$scope.projectEdit.descripcion;

            $scope.modeloFeatures=$scope.projectEdit.modelo;

            $scope.archivos= $scope.projectEdit.archivos;
            

            angular.forEach($scope.projectEdit.miembros,function (value,key) {

                console.log("Print ID:"+value.uid);

                //Reference to users branch in Firebase
                var ref = firebase.database().ref("users");


                //Search the user in Users branch in Firebase
                ref.orderByKey().equalTo(value.uid).on("child_added", function (snapshot) {

                    //Get the user information
                    $scope.miembro = snapshot.val();

                    $scope.listarMiembros.push($scope.miembro);


                });


            });

            angular.forEach($scope.projectEdit.lideres,function (value,key) {

                console.log("Print ID:"+value.uid);

                //Reference to users branch in Firebase
                var ref = firebase.database().ref("users");


                //Search the user in Users branch in Firebase
                ref.orderByKey().equalTo(value.uid).on("child_added", function (snapshot) {

                    //Get the user information
                    $scope.miembro = snapshot.val();

                    $scope.listarLideres.push($scope.miembro);


                });


            });

        }
    );
