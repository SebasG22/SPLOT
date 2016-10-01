/**
 * Multi-user SPLOT
 */

angular.module('projectsSplot')
    .controller('projectListCtrl',
        function(auth,users, $scope,projectsRelatedF,typeUser,$state,$window,projectSelected,projects,userActual) {






            //BUSCA TODOS LOS PROYECTOS RELACIONADOS CON EL USUARIO

            //Llamo a la factory projects donde se encunentran todos los proyectos
            $scope.proyectos = projects;

            //Proyectos relacionados con el usuario
            $scope.projectsRelated = [];


            //Metodo FindRelation: Encuentra si en los miembros del proyecto esta el usuario actual
            function FindRelation(identificador) {

                //Referencia a un proyecto especifico
                var ref = firebase.database().ref("projects/" + identificador + "/miembros");

                $scope.valor = false;

                //Información del Usuario Actual
                $scope.usuario;

                //Obtener información del Usuario Actual
                $scope.usuario = userActual.get();

                //All the Users -> Firebase Array
                $scope.usuarioss=users;

                //Get the Record in  FirebaseArray througth userUpdate Factory
                $scope.usuario1= $scope.usuarioss.$getRecord(auth.$getAuth().uid);

                ref.orderByChild('uid').equalTo($scope.usuario.uid).on("child_added", function (snapshot) {

                    $scope.valor = true;

                });

                return $scope.valor;
            };


            //METODO NO FUNCIONANDO
            function FindUserInformation(uidUser){
                //Referencia del usuario
                var ref = firebase.database().ref("users");

                //Busca basado en el UID del usuario en la rama USERS
                ref.orderByKey().equalTo(uidUser).on("child_added", function (snapshot) {

                    //Obtiene la informacion del usuario
                    $scope.usuarioSearched = snapshot.val();


                })
                return $scope.usuarioSearched;
            };


            //Obtiene los proyectos relaciones con el usuario y los almacena en la variable projectsRelated
            $scope.proyectos.$loaded()
                .then(function (data) {
                    angular.forEach(data, function (value, key) {

                        //Comparacion para conocer si el usuario actual esta asociado a un proyecto
                        if (FindRelation(value.$id) == true) {

                            //Obtiene la referencia de todos los projects
                            var ref = firebase.database().ref("projects");

                            //Variable para almacenar el proyecto encontrado
                            $scope.projectFounded = null;

                            //Variable para almacenar los miembros relacionados de un proyecto con toda su información
                            $scope.relatedMembers=[];

                            //Variable para almacenar los miembros relacionados de un proyecto
                            var miembros=[];
                            //Obtencion de los datos del proyecto
                            ref.orderByKey().equalTo(value.$id).on("child_added", function (snapshot) {
                                $scope.projectFounded = snapshot.val();

                                //Los miembros encontrados en un proyecto se los asigno a la variable miembros
                                miembros=$scope.projectFounded.miembros;

                                //Recorro miembros para guardar su información
                                miembros.forEach(function (item, index) {

                                    //Imprimir objecto y conocer sus caracteristicas
                                    //$window.alert(JSON.stringify(item, null, 4));

                                    //Encuentra la información según el UID de cada miembro
                                    $scope.userValue=FindUserInformation(item.uid);

                                    //Guardo la información del usuario en related Members
                                    $scope.relatedMembers.push($scope.userValue);

                                });

                                //Agrego la información de cada proyecto en el que esta relacionado y sus miembros
                                $scope.projectsRelated.push({proyecto:$scope.projectFounded,miembros:$scope.relatedMembers,key:value.$id});

                            });

                            //Almaceno la información de los proyectos relaciones en la Factory projects Related
                            projectsRelatedF.set($scope.projectsRelated);

                        }
                        ;

                    })
                });


            $scope.projects=$scope.projectsRelated;




            $scope.projectDetail= function (projectKey,project,miembros) {
                /*Imprimir el project Key*/
                //$window.alert("Ha seleccionado: "+ projectKey);

                /*Imprimir el project*/
                //$window.alert(JSON.stringify(project, null, 4));

                /*Imprimir el miembros*/
                //$window.alert(JSON.stringify(miembros, null, 4));

                projectSelected.set(projectKey);
                projectSelected.setInformation(project);
                projectSelected.setMember(miembros);

                $state.go("detalleProyecto");

            };


            //Comprobación del tipo de usuario para mantener o redireccionar a otra página
            if(typeUser.get()=="Administrador2" ){
                $window.alert("Página NO AUTORIZADA");
                $state.go("inicio.bienvenida");

            }

            //Método pendiente por revisar: COMO ELIMINAR UN HIJO DE PROJECTS EN FIREBASE
            $scope.eliminarProyecto=function (proyecto) {
                console.log("Ingrese a Eliminar Proyecto");

            }
        }
    );
