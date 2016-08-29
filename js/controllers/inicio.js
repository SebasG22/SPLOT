/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('inicioCtrl',
        function (users, $scope, sistema, $firebaseObject, auth, user, typeUser,userActual, projects ,projectsRelatedF,$window) {

            //Variables para ampliar/reducir el Dropdown de la barra
            $scope.class = '';
            $scope.expanded = '';

            //Obtiene los valores del sistema el cual contiene el menuInicial mediante el uso de una Factory
            $scope.sistema = sistema;




            var i=0;
            do {
                $scope.menuGeneral=MenuType();
                i++;
            }
            while (i < 5);


            //Funcion dropdown: Expande o contrae el dropdown de la barra según su estado
            $scope.dropdown = function () {

                if ($scope.class == '' && $scope.expanded == '') {
                    $scope.class = 'open';
                    $scope.expanded = 'true';
                }
                else {
                    $scope.class = '';
                    $scope.expanded = '';
                }

            };




            function getGeneralMenu(typeUser) {

                $scope.menuSearched;


                //Referencia del usuario
                var ref = firebase.database().ref("sistema/menuGeneral");

                console.log("Referencia menuGeneral:"+ref);

                //Busca basado en el UID del usuario en la rama USERS
                ref.orderByKey().equalTo(typeUser).on("child_added", function (snapshot) {

                    //Obtiene la informacion del menuGeneral
                    $scope.menuSearched = snapshot.val();

                });



                return $scope.menuSearched;

            }


            //Función MenuType: Obtiene el menu correspondiente basado el tipo de usuario actual
            function MenuType() {

                //Referencia del usuario
                var ref = firebase.database().ref("users");

                $scope.firebaseUser = auth.$getAuth();

                //Busca basado en el UID del usuario en la rama USERS
                ref.orderByKey().equalTo(userActual.getUID()).on("child_added", function (snapshot) {

                    //Obtiene la informacion del usuario
                    $scope.usuarioSearched = snapshot.val();

                    //Guardar la información del usuario en la factory User
                    user.set($scope.usuarioSearched);


                    //Obtencion del menu segun el tipo de usuario
                    if ($scope.usuarioSearched.tipo == "Administrador") {

                        //Actualizacion del typeUser Factory
                        typeUser.set("Administrador");

                        //Obtiene y muestra el menu de administrador
                        $scope.menuGen = getGeneralMenu("Administrador");

                        //Muestra en consola el cambio en la Factory
                        console.log("Tipo de Usuario Factory:" + typeUser.get());

                    }
                    else if ($scope.usuarioSearched.tipo == "Lider") {

                        //Actualizacion del typeUser Factory
                        typeUser.set("Lider");

                        //Obtiene y muestra el menu de lider
                        $scope.menuGen = getGeneralMenu("Lider");

                        //Muestra en consola el cambio en la Factory
                        console.log("Tipo de Usuario Factory:" + typeUser.get());

                    }
                    else if ($scope.usuarioSearched.tipo == "Configurador") {

                        //Actualizacion del typeUser Factory
                        typeUser.set("Configurador");

                        //Obtiene y muestra el menu de configurador
                        $scope.menuGen = getGeneralMenu("Configurador");

                        //Muestra en consola el cambio en la Factory
                        console.log("Tipo de Usuario Factory:" + typeUser.get());

                    }
                });
                return $scope.menuGen;
            };


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
                $scope.usuario = user.get();

                //All the Users -> Firebase Array
                $scope.usuarioss=users;

                //Get the Record in  FirebaseArray througth userUpdate Factory
                $scope.usuario1= $scope.usuarioss.$getRecord(auth.$getAuth().uid);

                ref.orderByChild('uid').equalTo($scope.usuario1.uid).on("child_added", function (snapshot) {

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

        });
