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

            //Get all the users from Factory
            $scope.usuariosDB = users;

            //Initial Values to open the buttons
            $scope.agregarLider = false;
            $scope.agregarMiembro = false;
            $scope.agregarArchivo = false;

            //Method to show the leaderships througth a button: When the user do a click
            $scope.mostrarLideres = function () {
                if (!$scope.agregarLider) {
                    $scope.agregarLider = true;
                    $scope.agregarMiembro = false;
                }
                else {
                    $scope.agregarLider = false;
                }
            };

            //Method to show the members througth a button: When the user do a click
            $scope.mostrarMiembros = function () {
                if (!$scope.agregarMiembro) {
                    $scope.agregarMiembro = true;
                    $scope.agregarLider = false;
                }
                else {
                    $scope.agregarMiembro = false;
                }
            };

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

            //Check if the user exits
            function loopUser(uidSearched){

                var response=false;

                angular.forEach($scope.usuarios, function (value,key) {


                    if(value.uid == uidSearched){
                        response = true;
                    }
                });
                return response;
            }
            //Variable to save users
            $scope.usuarios=[];


            checkusersSelected();

            //Function to check the leaders and member selected in the project
            function checkusersSelected (){

                angular.forEach($scope.usuariosDB,function (valueUser,keyUser){



                    angular.forEach($scope.listarLideres, function (valueLeader,keyLeader) {


                        if(valueLeader.uid!=valueUser.uid){

                            console.log(valueUser);
                            $scope.usuarios.push(valueUser);

                            console.log("valueUser: "+JSON.stringify($scope.usuarios,null,4));

                            /*console.log("valueLeader: "+JSON.stringify(valueLeader,null,4));
                             console.log("valueUser: "+JSON.stringify(valueUser,null,4));


                             console.log("El usuario: %O: "+ valueUser + " Ya esta agregado al proyecto como: %O:"+valueLeader + " Rol: Lider ");
                             var index = $scope.usuariosDB.indexOf(valueLeader);
                             console.log("Index:"+index);
                             $scope.usuarios.splice(index, 1);

                             console.log("Usuarios: "+JSON.stringify($scope.usuariosDB,null,4));
                             */
                        }
                    });

                    angular.forEach($scope.listarMiembros, function (valueMember,keyMember) {


                        if(valueMember.uid!=valueUser.uid){

                            if(loopUser(valueMember.uid)==false && loopUser(valueUser.uid)){

                                console.log(valueUser);
                                $scope.usuarios.push(valueUser);

                                console.log("valueUser: "+JSON.stringify($scope.usuarios,null,4));
                            }
                        }
                    });




                });

            }


        }
    );
