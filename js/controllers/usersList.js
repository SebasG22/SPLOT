/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('userListCtrl',
        function (users, $scope, typeUser, $window, userUpdate, $state, projects,$firebaseArray) {
            $scope.users = users;




            //All the Users -> Firebase Array
            $scope.usuarios = users;

            console.log("Tipo de Usuario Factory: " + typeUser.get());
            if (typeUser.get() == "Configurador" || typeUser.get() == "Lider") {
                $window.alert("Página NO AUTORIZADA");
                $state.go("inicio.bienvenida");

            }


            //INICIO TEST

            //BUSCA TODOS LOS PROYECTOS RELACIONADOS CON EL USUARIO

            //Llamo a la factory projects donde se encunentran todos los proyectos
            $scope.proyectos = projects;


            //Metodo FindRelation: Encuentra si en los miembros del proyecto esta el usuario actual
            function FindRelation(identificador, UIDusuario) {

                //Referencia a un proyecto especifico
                var ref = firebase.database().ref("projects/" + identificador + "/miembros");

                $scope.valor = false;

                ref.orderByChild('uid').equalTo(UIDusuario).on("child_added", function (snapshot) {

                    $scope.valor = true;

                });

                return $scope.valor;
            };

            /*
            //Obtiene los proyectos relaciones con el usuario y los almacena en la variable projectsRelated
            $scope.proyectos.$loaded()
                .then(function (data) {
                    angular.forEach(data, function (value, key) {

                        //Comparacion para conocer si el usuario actual esta asociado a un proyecto
                        if (FindRelation(value.$id) == true) {

                            //Obtiene la referencia de todos los projects
                            var ref = firebase.database().ref("projects");


                            //Variable para almacenar los miembros relacionados de un proyecto
                            var miembros = [];

                            //Obtencion de los datos del proyecto
                            ref.orderByKey().equalTo(value.$id).on("child_added", function (snapshot) {

                                $scope.projectFounded = snapshot.val();

                                //Pasar el proyecto Actual --> Revisar
                                $scope.projectFounded.miembros.$remove($scope.usuarios.$getRecord(UIDusuario));
                            });
                        }
                    })
                });
           */

            //FIN TEST
            $scope.eliminarUsuario = function (usuarioUID) {


                //SE DEBE BUSCAR TODOS LOS PROYECTOS RELACIONADOS CON EL USUARIO
                //TEST
                angular.forEach($scope.proyectos, function (value, key) {

                    //Comparacion para conocer si el usuario actual esta asociado a un proyecto
                    if (FindRelation(value.$id,usuarioUID) == true) {

                        //Obtiene la referencia de todos los projects
                        var ref = firebase.database().ref("projects");


                        //Variable para almacenar los miembros relacionados de un proyecto
                        var miembros = [];

                        //Obtencion de los datos del proyecto
                        ref.orderByKey().equalTo(value.$id).on("child_added", function (snapshot) {

                            $scope.projectId=value.$id;
                            $scope.projectFounded = snapshot.val();

                            //Pasar el proyecto Actual --> Revisar
                            //$scope.projectFounded.miembros.$remove($scope.usuarios.$getRecord(usuarioUID));
                        });

                        $scope.position;
                        angular.forEach($scope.projectFounded.miembros,function (value,key) {

                            if(usuarioUID==value.uid){
                                $scope.position=key;
                                $window.alert("La posicion en el Array es:"+$scope.position);
                            }

                        });

                        $scope.projectFounded.miembros.splice($scope.position, 1);

                        //Add the project in Firebase
                        projects.$add($scope.projectFounded).then(function () {
                            $window.alert("Se ha reagreado el proyecto");
                        });
                        $scope.Testea=projects;

                        $scope.EliminarPos=$scope.Testea.$getRecord($scope.projectId);


                        $scope.Testea.$remove($scope.EliminarPos).then(function(ref) {
                            // data has been deleted locally and in the database
                            $window.alert("El usuario ha sido eliminado de todos los proyectos");
                        }, function(error) {
                            console.log("Error:", error);
                        });


                    }
                });


                //ELIMINARLO
                $scope.usuarios[$scope.usuarios.$indexFor(usuarioUID)].activo = "false";
                $scope.usuarios.$save($scope.usuarios.$getRecord(usuarioUID));
                $window.alert("El usuario se ha desactivado");
            };

            //Method to : Edit User Information for user selected
            $scope.editUser = function (usuarioUID) {

                //Save the user UID in the userUpdate Factory
                userUpdate.set(usuarioUID);

                console.log("UID User List:" + userUpdate.get());

                userUpdate.setAction('EditInformation');

                //Go to Edit Page
                $state.go("inicio.editarPerfil");


            };


            $scope.activeUsersFilter = function (item) {

                if (item.activo === 'true') {
                    return item;
                }
            };
        }
    );
