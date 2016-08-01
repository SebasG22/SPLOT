/**
 * Created by SebasG on 7/07/16.
 */
angular.module('asideMenuDemo')
    .controller('proyectosCtrl',
        function(users, $scope,$window,fileTojson,projects,$state,$firebaseObject,typeUser) {
            //Arreglo para  guardar los lideres en Firebase
            $scope.lideres=[];
            //Arreglo para mostrar los lideres en Pantalla (RAM)
            $scope.listarLideres=[];
            //Arreglo para guardar los miembros en Firebase
            $scope.miembros=[];
            //Arreglo para mostrar los miembros en Pantalla (RAM)
            $scope.listarMiembros=[];


            $scope.archivos=[];
            $scope.usuarios=users;
            $scope.agregarLider=false;
            $scope.agregarMiembro=false;
            $scope.agregarArchivo=false;
            $scope.modeloFeatures;



            console.log("Ingrese a Form Proyecto");
            console.log("Tipo de Usuario Factory: "+ typeUser.get());
            if(typeUser.get()=="Administrador2" || typeUser.get()=="Configurador"){
                $window.alert("Página NO AUTORIZADA");
                $state.go("inicio.bienvenida");

            }


            $scope.mostrarLideres= function () {
                if(!$scope.agregarLider) {
                    $scope.agregarLider=true;
                    $scope.agregarMiembro=false;
                }
                else{
                    $scope.agregarLider=false;
                }
            };

            $scope.agregarLideres=function (usuario) {


                    console.log("Usuarios:" + $scope.usuarios);
                    $scope.miembros.push({uid: usuario.uid});
                    console.log("Miembros:" + $scope.miembros);
                    $scope.lideres.push({uid: usuario.uid});
                    console.log("Lideres:" + $scope.lideres);

                var ref = firebase.database().ref("users");
                console.log("Referencia :"+ref);

                $scope.search = null;
                $scope.info;


                console.log("Identificador del Usuario:"+usuario.uid);
                ref.orderByKey().equalTo(usuario.uid).on("child_added", function(snapshot) {
                    console.log("Key:"+snapshot.ref);
                    console.log("Informacion:"+snapshot.val());
                    $scope.info= snapshot.val();
                    console.log("Nombre Usuario:"+$scope.info.nombre)
                    search = $firebaseObject(snapshot.ref);

                    console.log("Método Usuario Encontrado:"+ search);
                });
                console.log("Usuario Encontrado:"+$scope.info);
                $scope.listarLideres.push($scope.info);


                    var index = $scope.usuarios.indexOf(usuario);
                    $scope.usuarios.splice(index, 1);
                    console.log("Usuarios:" + $scope.usuarios);


            };

            $scope.eliminarLideres= function (usuario) {
                var index = $scope.miembros.indexOf(usuario);
                $scope.miembros.splice(index, 1);
                index= $scope.lideres.indexOf(usuario);
                $scope.lideres.splice(index, 1);
                index= $scope.listarLideres.indexOf(usuario);
                $scope.listarLideres.splice(index, 1);
                var ref = firebase.database().ref("users");
                console.log("Referencia :"+ref);

                $scope.search = null;
                $scope.info;


                console.log("Identificador del Usuario:"+usuario.uid);
                ref.orderByKey().equalTo(usuario.uid).on("child_added", function(snapshot) {
                    console.log("Key:"+snapshot.ref);
                    console.log("Informacion:"+snapshot.val());
                    $scope.info= snapshot.val();
                    console.log("Nombre Usuario:"+$scope.info.nombre)
                    search = $firebaseObject(snapshot.ref);

                    console.log("Método Usuario Encontrado:"+ search);
                });
                console.log("Usuario Encontrado:"+$scope.info);
                $scope.usuarios.push($scope.info);





            };

            //Miembros

            $scope.mostrarMiembros= function () {
                if(!$scope.agregarMiembro) {
                    $scope.agregarMiembro=true;
                    $scope.agregarLider=false;
                }
                else{
                    $scope.agregarMiembro=false;
                }
            };

            $scope.agregarMiembros=function (usuario) {


                console.log("Usuarios:" + $scope.usuarios);
                $scope.miembros.push({uid: usuario.uid});
                console.log("Miembros:" + $scope.miembros);
                var index = $scope.usuarios.indexOf(usuario);
                $scope.usuarios.splice(index, 1);
                console.log("Usuarios:" + $scope.usuarios);





                var ref = firebase.database().ref("users");
                console.log("Referencia :"+ref);

                $scope.search = null;
                $scope.info;


                console.log("Identificador del Usuario:"+usuario.uid);
                ref.orderByKey().equalTo(usuario.uid).on("child_added", function(snapshot) {
                    console.log("Key:"+snapshot.ref);
                    console.log("Informacion:"+snapshot.val());
                    $scope.info= snapshot.val();
                    console.log("Nombre Usuario:"+$scope.info.nombre)
                    search = $firebaseObject(snapshot.ref);

                    console.log("Método Usuario Encontrado:"+ search);
                });
                console.log("Usuario Encontrado:"+$scope.info);
                $scope.listarMiembros.push($scope.info);


            };






            $scope.eliminarMiembros= function (usuario) {
                var index = $scope.miembros.indexOf(usuario);
                $scope.miembros.splice(index, 1);
                var index = $scope.listarMiembros.indexOf(usuario);
                $scope.listarMiembros.splice(index, 1);
                var ref = firebase.database().ref("users");
                console.log("Referencia :"+ref);

                $scope.search = null;
                $scope.info;


                console.log("Identificador del Usuario:"+usuario.uid);
                ref.orderByKey().equalTo(usuario.uid).on("child_added", function(snapshot) {
                    console.log("Key:"+snapshot.ref);
                    console.log("Informacion:"+snapshot.val());
                    $scope.info= snapshot.val();
                    console.log("Nombre Usuario:"+$scope.info.nombre)
                    search = $firebaseObject(snapshot.ref);

                    console.log("Método Usuario Encontrado:"+ search);
                });
                console.log("Usuario Encontrado:"+$scope.info);
                $scope.usuarios.push($scope.info);
            };


            //Archivos

            $scope.mostrarArchivos= function () {
                if(!$scope.agregarArchivo) {
                    $scope.agregarArchivo=true;
                }
                else{
                    $scope.agregarArchivo=false;
                }
            };

            $scope.agregarArchivos=function () {
                //ubicacion = Link lectura de archivo Firebase
                //ruta = carpeta alojamiento en Firebase


                $scope.archivos.push({nombre: $scope.nombreArchivo,descripcion: $scope.descripcionArchivo , tipo:$scope.tipoArchivo, ubicacion:$scope.ubicacion,ruta:$scope.ruta});
                console.log("Archivos:" + $scope.archivos);
                $scope.nombreArchivo='';
                $scope.descripcionArchivo='';
                $scope.tipoArchivo='';
                $scope.ubicacion='';
                $scope.ruta='';





            };

            $scope.eliminarArchivo= function (archivo) {
                var index = $scope.archivos.indexOf(archivo);
                $scope.archivos.splice(index, 1);
                // Create a reference to the file to delete
                var desertRef = storageRef.child(archivo.ruta);

// Delete the file
                desertRef.delete().then(function() {
                    // File deleted successfully
                }).catch(function(error) {
                    // Uh-oh, an error occurred!
                });
            };






            //Subir Archivos



            var auth = firebase.auth();
            var storageRef = firebase.storage().ref();


            function handleFileSelect(evt) {

                evt.stopPropagation();
                evt.preventDefault();
                var file = evt.target.files[0];

                $scope.tipoArchivo=file.type;
                var metadata = {
                    'contentType': file.type
                };

                // Push to child path.
                var uploadTask = storageRef.child('files/' + file.name).put(file, metadata);


                // Listen for errors and completion of the upload.
                // [START oncomplete]
                uploadTask.on('state_changed', null, function(error) {
                    // [START onfailure]
                    console.error('Upload failed:', error);
                    // [END onfailure]
                }, function() {
                    console.log('Uploaded',uploadTask.snapshot.totalBytes,'bytes.');
                    console.log(uploadTask.snapshot.metadata);
                    $scope.ruta=uploadTask.snapshot.metadata.fullPath;
                    var url = uploadTask.snapshot.metadata.downloadURLs[0];
                    console.log('File available at', url);

                    $scope.ubicacion=url;

                });

            }

            function handleFileSelect2(evt) {

                evt.stopPropagation();
                evt.preventDefault();
                var file = evt.target.files[0];

                $scope.tipoArchivo=file.type;
                var metadata = {
                    'contentType': file.type
                };

                // Push to child path.
                var uploadTask = storageRef.child('files/' + file.name).put(file, metadata);


                // Listen for errors and completion of the upload.
                // [START oncomplete]
                uploadTask.on('state_changed', null, function(error) {
                    // [START onfailure]
                    console.error('Upload failed:', error);
                    // [END onfailure]
                }, function() {
                    console.log('Uploaded',uploadTask.snapshot.totalBytes,'bytes.');
                    console.log(uploadTask.snapshot.metadata);
                    var url = uploadTask.snapshot.metadata.downloadURLs[0];
                    console.log('File available at', url);




                     fileTojson.get().then(function (msg) {
                     $scope.msg = msg.data;
                     console.log("He convertido el archivoJson a un Arreglo");
                     console.log(msg.data);
                         $scope.modeloFeatures={ubicacion:url,ruta:uploadTask.snapshot.metadata.fullPath,modelo:$scope.msg};
                         console.log("Modelo de Features:"+ $scope.modeloFeatures.modelo);
                     });


                });
                // [END oncomplete]
            }



            $scope.onload = function() {
                document.getElementById('file').addEventListener('change', handleFileSelect2, false);
                document.getElementById('file').disabled = false;

                document.getElementById('file2').addEventListener('change', handleFileSelect, false);
                document.getElementById('file2').disabled = false;


            };

            //Obtener Fecha Actual
            var utc = new Date().toJSON().slice(0,10);



            $scope.agregarProyecto=function () {

                projects.$add({
                    nombre:$scope.nombreProyecto,
                    descripcion:$scope.descripcionProyecto,
                    lideres:$scope.lideres,
                    miembros:$scope.miembros,
                    archivos:$scope.archivos,
                    modelo:$scope.modeloFeatures,
                    fecha_creacion:utc

                });
                $scope.nombreProyecto='';
                    $scope.descripcionProyecto='';

                console.log("Proyecto creado correctamente");

                $state.go("inicio.listarProyectos");

            }



        }
    );
