/**
 * Multi-user SPLOT
 */


// obtenga el módulo y cree un controlador
angular.module('multiSplot').controller('usuarioUpdateCtrl',
    function($scope, $firebaseObject, $firebaseArray, users,user,whitelist,$customFirebaseArray,userService, auth, $state, $window,typeUser,userActual,userUpdate){
        $scope.usuarios = users;


        $scope.userType=typeUser.get();
        console.log("Ingrese a usuarioUpdateCtrl");


        console.log("Tipo de Usuario Factory: "+ typeUser.get());
        if(typeUser.get()=="Configurador" || typeUser.get()=="Lider" ){
            $window.alert("Página NO AUTORIZADA");
            $state.go("inicio.bienvenida");

        }

        console.log(typeUser.get());

       //REVISAR DIFERENCIA ENTRE USER Y USERACTUAL. ESTAN GUARDANDO LOS MISMOS DATOS


        $scope.auth2 =auth;
        $scope.changePassword = function () {
            if ($scope.newPassword1 == $scope.newPassword2) {
                auth.$updatePassword(newPassword1);
            }
        };

        //Obtener información del Usuario Actual
        $scope.usuario = user.get();

        $scope.usuario2=userActual.getUID();

        console.log($scope.usuario.uid);


        //All the Users -> Firebase Array
        $scope.usuarios=users;

        //Get the Record in  FirebaseArray througth userUpdate Factory
        $scope.currentUser= $scope.usuarios.$getRecord(userUpdate.get());


        //Method to Update the Information in Firebase
        $scope.actualizarUsuario=function () {



            /*$scope.usuarios[$scope.usuarios.$indexFor(userUpdate.get())]={
                activo:$scope.currentUser.activo,
                imagen:$scope.ubicacion,
                nombre:$scope.currentUser.nombre,
                profesion:$scope.currentUser.profesion,
                tipo:$scope.currentUser.tipo,
                usuario:$scope.currentUser.usuario};
             */

            $scope.usuarios[$scope.usuarios.$indexFor(userUpdate.get())].activo = $scope.currentUser.activo;
            $scope.usuarios[$scope.usuarios.$indexFor(userUpdate.get())].imagen = $scope.ubicacion;
            $scope.usuarios[$scope.usuarios.$indexFor(userUpdate.get())].nombre = $scope.currentUser.nombre;
            $scope.usuarios[$scope.usuarios.$indexFor(userUpdate.get())].profesion = $scope.currentUser.profesion;
            $scope.usuarios[$scope.usuarios.$indexFor(userUpdate.get())].tipo = $scope.currentUser.tipo;
            $scope.usuarios[$scope.usuarios.$indexFor(userUpdate.get())].usuario = $scope.currentUser.usuario;


            $scope.auth2.$updateEmail("rlxsebas222@gmail.com");

            $scope.usuarios.$save($scope.usuarios.$getRecord(userUpdate.get()));

            var b= $scope.usuarios.$indexFor("prueba") ;








            /*ref.$update({
                firstName: 1,
                lastName: 1,
                email: 1,
                password: 1
            });
            */
            var f=0;


            console.log($scope.usuarios.$getRecord('prueba'));


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

        $scope.onload = function() {
            document.getElementById('file').addEventListener('change', handleFileSelect, false);
            document.getElementById('file').disabled = false;

        };



        $scope.agregarUsuarioWH= function () {

            $scope.whitelist.$addWithKey($scope.identificacion.value,{nombre:$scope.nombre,identificacion:$scope.identificacion.value,correo:$scope.login,direccion:$scope.direccion,profesion:$scope.profesion,permiso:$scope.permiso})
            console.log("Agregado al whitelist");
            console.log($scope.whitelist);
            $window.alert("Se ha agregado el usuario a la whitelist")
            $state.go("inicio.listarUsuarios");
        };















    }
);



