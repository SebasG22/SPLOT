/**
 * Multi-user SPLOT
 */

angular.module('projectsSplot')
    .controller('proyectosCtrl',
        function (users, $scope, $window, $http, projects, $state, $firebaseObject, typeUser) {

            //PRINT IN CONSOLE THE TYPE OF CURRENT USER
            console.log("Tipo de Usuario Factory: " + typeUser.get());

            //CHECK THE CURRENT USER, IF HE HAS THE PERMISSION HE CAN SEE THE PAGE, IF NOT THE USER REDIRECT HIM TO WELCOME PAGE
            if (typeUser.get() == "Administrador2" || typeUser.get() == "Configurador") {
                $window.alert("Página NO AUTORIZADA");
                $state.go("bienvenida");

            }

            //Variable to save the leaderships in Firebase
            $scope.lideres = [];

            //Variable to save the leaderships in RAM (Current Session)
            $scope.listarLideres = [];

            //Variable to save the members in Firebase
            $scope.miembros = [];

            //Variable to save the members in RAM (Current Session)
            $scope.listarMiembros = [];

            //Variable to save the files
            $scope.archivos = [];

            //Get all the users from Factory
            $scope.usuarios = users;

            //Initial Values to open the buttons
            $scope.agregarLider = false;
            $scope.agregarMiembro = false;
            $scope.agregarArchivo = false;

            //Variable to save the Feature Model File
            $scope.modeloFeatures;

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

            //Method to add leaderships in RAM
            $scope.agregarLideres = function (usuario) {
                console.log("Usuarios:" + $scope.usuarios);
                $scope.miembros.push({uid: usuario.uid});
                console.log("Miembros:" + $scope.miembros);
                $scope.lideres.push({uid: usuario.uid});
                console.log("Lideres:" + $scope.lideres);

                var ref = firebase.database().ref("users");
                console.log("Referencia :" + ref);

                $scope.search = null;
                $scope.info;


                console.log("Identificador del Usuario:" + usuario.uid);
                ref.orderByKey().equalTo(usuario.uid).on("child_added", function (snapshot) {
                    console.log("Key:" + snapshot.ref);
                    console.log("Informacion:" + snapshot.val());
                    $scope.info = snapshot.val();
                    console.log("Nombre Usuario:" + $scope.info.nombre)
                    search = $firebaseObject(snapshot.ref);

                    console.log("Método Usuario Encontrado:" + search);
                });
                console.log("Usuario Encontrado:" + $scope.info);
                $scope.listarLideres.push($scope.info);


                var index = $scope.usuarios.indexOf(usuario);
                $scope.usuarios.splice(index, 1);
                console.log("Usuarios:" + $scope.usuarios);


            };


            //Method to delete Leadership in RAM
            $scope.eliminarLideres = function (usuario) {
                var index = $scope.miembros.indexOf(usuario);
                $scope.miembros.splice(index, 1);
                index = $scope.lideres.indexOf(usuario);
                $scope.lideres.splice(index, 1);
                index = $scope.listarLideres.indexOf(usuario);
                $scope.listarLideres.splice(index, 1);
                var ref = firebase.database().ref("users");
                console.log("Referencia :" + ref);

                $scope.search = null;
                $scope.info;


                console.log("Identificador del Usuario:" + usuario.uid);
                ref.orderByKey().equalTo(usuario.uid).on("child_added", function (snapshot) {
                    console.log("Key:" + snapshot.ref);
                    console.log("Informacion:" + snapshot.val());
                    $scope.info = snapshot.val();
                    console.log("Nombre Usuario:" + $scope.info.nombre)
                    search = $firebaseObject(snapshot.ref);

                    console.log("Método Usuario Encontrado:" + search);
                });
                console.log("Usuario Encontrado:" + $scope.info);
                $scope.usuarios.push($scope.info);


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

            //Method to save Members in RAM
            $scope.agregarMiembros = function (usuario) {


                console.log("Usuarios:" + $scope.usuarios);
                $scope.miembros.push({uid: usuario.uid});
                console.log("Miembros:" + $scope.miembros);
                var index = $scope.usuarios.indexOf(usuario);
                $scope.usuarios.splice(index, 1);
                console.log("Usuarios:" + $scope.usuarios);


                var ref = firebase.database().ref("users");
                console.log("Referencia :" + ref);

                $scope.search = null;
                $scope.info;


                console.log("Identificador del Usuario:" + usuario.uid);
                ref.orderByKey().equalTo(usuario.uid).on("child_added", function (snapshot) {
                    console.log("Key:" + snapshot.ref);
                    console.log("Informacion:" + snapshot.val());
                    $scope.info = snapshot.val();
                    console.log("Nombre Usuario:" + $scope.info.nombre)
                    search = $firebaseObject(snapshot.ref);

                    console.log("Método Usuario Encontrado:" + search);
                });
                console.log("Usuario Encontrado:" + $scope.info);
                $scope.listarMiembros.push($scope.info);


            };


            //Method to delete Member in RAM
            $scope.eliminarMiembros = function (usuario) {
                var index = $scope.miembros.indexOf(usuario);
                $scope.miembros.splice(index, 1);
                var index = $scope.listarMiembros.indexOf(usuario);
                $scope.listarMiembros.splice(index, 1);
                var ref = firebase.database().ref("users");
                console.log("Referencia :" + ref);

                $scope.search = null;
                $scope.info;


                console.log("Identificador del Usuario:" + usuario.uid);
                ref.orderByKey().equalTo(usuario.uid).on("child_added", function (snapshot) {
                    console.log("Key:" + snapshot.ref);
                    console.log("Informacion:" + snapshot.val());
                    $scope.info = snapshot.val();
                    console.log("Nombre Usuario:" + $scope.info.nombre)
                    search = $firebaseObject(snapshot.ref);

                    console.log("Método Usuario Encontrado:" + search);
                });
                console.log("Usuario Encontrado:" + $scope.info);
                $scope.usuarios.push($scope.info);
            };


            //Method to show files througth a button: When the user do a click
            $scope.mostrarArchivos = function () {
                if (!$scope.agregarArchivo) {
                    $scope.agregarArchivo = true;
                }
                else {
                    $scope.agregarArchivo = false;
                }
            };

            //Method to add Files in RAM
            $scope.agregarArchivos = function () {
                //ubicacion = Link lectura de archivo Firebase
                //ruta = carpeta alojamiento en Firebase
                $scope.archivos.push({
                    nombre: $scope.nombreArchivo,
                    descripcion: $scope.descripcionArchivo,
                    tipo: $scope.tipoArchivo,
                    ruta: $scope.rutaFiles
                });
                console.log("Archivos:" + $scope.archivos);
                $scope.nombreArchivo = '';
                $scope.descripcionArchivo = '';
                $scope.tipoArchivo = '';
                $scope.ubicacion = '';
                $scope.rutaFiles = '';

            };

            //Method to delete a File in Ram and FirebaseStorage
            $scope.eliminarArchivo = function (archivo) {
                var index = $scope.archivos.indexOf(archivo);
                $scope.archivos.splice(index, 1);
                // Create a reference to the file to delete
                var desertRef = storageRef.child(archivo.ruta);

                // Delete the file
                desertRef.delete().then(function () {
                    // File deleted successfully
                }).catch(function (error) {
                    // Uh-oh, an error occurred!
                });
            };

            //Events to Upload the File
            var auth = firebase.auth();

            //Get the reference to save files in Firebase (FirebaseStorage)
            var storageRef = firebase.storage().ref();


            //Event to handle the Feature Model
            function handleFileSelect(evt) {

                evt.stopPropagation();
                evt.preventDefault();
                var file = evt.target.files[0];

                $scope.tipoArchivo = file.type;
                var metadata = {
                    'contentType': file.type
                };

                // Push to child path.
                var uploadTask = storageRef.child('jsonModels/' + file.name).put(file, metadata);


                // Listen for errors and completion of the upload.
                // [START oncomplete]
                uploadTask.on('state_changed', null, function (error) {
                    // [START onfailure]
                    console.error('Upload failed:', error);
                    // [END onfailure]
                }, function () {
                    console.log('Uploaded', uploadTask.snapshot.totalBytes, 'bytes.');
                    console.log(uploadTask.snapshot.metadata);
                    $scope.ruta = uploadTask.snapshot.metadata.fullPath;
                    var url = uploadTask.snapshot.metadata.downloadURLs[0];
                    console.log('File available at', url);

                    $scope.modeloFeatures = url;

                    //HACER CONVERSION DE ARCHIVO JSON TO OBJECT FUNCIONANDO
                    //NO VA AQUI

                    /*$http.get(url).then(function (msg) {
                     $scope.msg = msg;
                     console.log("He convertido el archivoJson a un Arreglo");
                     console.log(msg);
                     $window.alert(JSON.stringify(msg, null, 4));
                     });
                     */


                });


            }

            //Event to handle project files

            function handleFileSelect2(evt) {

                evt.stopPropagation();
                evt.preventDefault();
                var file = evt.target.files[0];

                $scope.tipoArchivo = file.type;
                var metadata = {
                    'contentType': file.type
                };

                // Push to child path.
                var uploadTask = storageRef.child('projectsFiles/' + file.name).put(file, metadata);


                // Listen for errors and completion of the upload.
                // [START oncomplete]
                uploadTask.on('state_changed', null, function (error) {
                    // [START onfailure]
                    console.error('Upload failed:', error);
                    // [END onfailure]
                }, function () {
                    console.log('Uploaded', uploadTask.snapshot.totalBytes, 'bytes.');
                    console.log(uploadTask.snapshot.metadata);
                    var url = uploadTask.snapshot.metadata.downloadURLs[0];
                    console.log('File available at', url);
                    $scope.rutaFiles=url;




                });
                // [END oncomplete]
            }

            //Initialize the event
            $scope.onload = function () {
                document.getElementById('file').addEventListener('change', handleFileSelect, false);
                document.getElementById('file').disabled = false;

                document.getElementById('file2').addEventListener('change', handleFileSelect2, false);
                document.getElementById('file2').disabled = false;


            };

            //Get the current Date in YYYY/MM/DD
            var utc = new Date().toJSON().slice(0, 10);

            $scope.addProject = function () {

                //Check all the form fiels are completed
                if($scope.projectName==undefined || $scope.projectDescription==undefined || $scope.lideres.length==0 || $scope.miembros.length==0 || $scope.archivos.length==0 || $scope.modeloFeatures== undefined  ){
                    $window.alert("Complete el formulario adecuadamente");

                }
                else{
                    //Get the current Date in YYYY/MM/DD
                    var utc = new Date().toJSON().slice(0, 10);

                    //All the Users -> Firebase Array
                    $scope.projects = projects;

                    //Get the Record in  FirebaseArray

                    $http({
                        method: 'jsonp',
                        url: ""+$scope.modeloFeatures,

                        params: {
                            format: 'json',
                            callback: 'JSON_CALLBACK'
                        }
                    }).then(function (response) {
                        //$window.alert(JSON.stringify(response.data, null, 4));

                        $scope.msg=response.data;

                        $scope.models=[];

                        angular.forEach($scope.miembros, function(valueMember, keyMiembros) {


                            $scope.models[keyMiembros]={uid:valueMember.uid,featureModel:$scope.msg};

                        });

                        /*
                        $scope.currentProject = $scope.projects.$getRecord(projectSelected.get());

                        $scope.projects[$scope.projects.$indexFor(projectSelected.get())].modelo = $scope.msg;

                        $scope.projects.$save($scope.projects.$getRecord(projectSelected.get()));

                        $scope.currentProject = $scope.projects.$getRecord(projectSelected.get());

                        $scope.msg=$scope.currentProject.copia.model;
                        */

                    });
                    //Add the project in Firebase
                    projects.$add({
                        nombre: $scope.projectName,
                        descripcion:$scope.projectDescription,
                        lideres:$scope.lideres,
                        miembros:$scope.miembros,
                        archivos:$scope.archivos,
                        modelo:$scope.modeloFeatures,
                        models:$scope.models,
                        fecha:utc


                    }).then(function () {
                        $window.alert("SPLOT V.30 ha agregado correctamente el proyecto al sistema, este ya se encuentra disponible para su configuración");
                        $state.go("listarProyectos");
                    });

                }



            };





            //BUSCA TODOS LOS PROYECTOS RELACIONADOS CON EL USUARIO

            $scope.activeUsersFilter = function (item) {

                if (item.activo === 'true') {
                    return item;
                }
            };

            //Proyectos relacionados con el usuario
            $scope.projectsRelated = [];



        }
    );
