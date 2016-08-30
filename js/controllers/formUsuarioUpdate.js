/**
 * Multi-user SPLOT
 */

// obtenga el módulo y cree un controlador
angular.module('multiSplot').controller('usuarioUpdateCtrl',
    function ($scope, $firebaseObject, $firebaseArray, users, user, whitelist, $customFirebaseArray, userService, auth, $state, $window, typeUser, userActual, userUpdate) {

        //Get all the user
        $scope.usuarios = users;

        //REVISAR DIFERENCIA ENTRE USER Y USERACTUAL. ESTAN GUARDANDO LOS MISMOS DATOS


        $scope.auth2 = auth;

        //All the Users -> Firebase Array
        $scope.usuarios = users;

        //Get the Record in  FirebaseArray througth userUpdate Factory
        $scope.currentUser = $scope.usuarios.$getRecord(userUpdate.get());

        //Get the Action througth UserUpdate Factory
        $scope.action = userUpdate.getAction();

        //Get the User Type to allow some fields in the form
        $scope.userType = typeUser.get();

        //Method to Update the Information in Firebase
        $scope.update = function () {

            //If the user want to Edit Information
            if ($scope.action == 'EditInformation') {

                $scope.usuarios[$scope.usuarios.$indexFor(userUpdate.get())].activo = $scope.currentUser.activo;
                $scope.usuarios[$scope.usuarios.$indexFor(userUpdate.get())].nombre = $scope.currentUser.nombre;
                $scope.usuarios[$scope.usuarios.$indexFor(userUpdate.get())].profesion = $scope.currentUser.profesion;
                $scope.usuarios[$scope.usuarios.$indexFor(userUpdate.get())].tipo = $scope.currentUser.tipo;

                if ($scope.ubicacion != undefined) {

                    $scope.usuarios[$scope.usuarios.$indexFor(userUpdate.get())].imagen = $scope.ubicacion;
                }

                $scope.usuarios.$save($scope.usuarios.$getRecord(userUpdate.get()));
                $window.alert("Se ha actualizado la información correctamente");

                //Go to profile page
                $state.go("inicio.perfil");

            }

            //If the user want to Change Password
            else if ($scope.action == 'ChangePassword') {

                if ($scope.currentUser.newpassword1 == $scope.currentUser.newpassword2) {
                    $scope.auth2.$updatePassword($scope.currentUser.newpassword1);

                    $window.alert("Se ha actualizado la contraseña correctamente");

                    //Clean Variables
                    $scope.currentUser.newpassword1 = '';
                    $scope.currentUser.newpassword2 = '';

                    auth.signOut();

                    $state.go("login");
                }
                else {
                    $window.alert("Las contraseñas no coinciden");

                }

            }

            //If the user want to Change Mail
            else if ($scope.action == 'ChangeMail') {

                $scope.auth2.$updateEmail($scope.currentUser.usuario2);

                $scope.usuarios.$save($scope.usuarios.$getRecord(userUpdate.get()));

                $window.alert("Se ha actulizado el correo correctamente");

                //Clean Variables
                $scope.currentUser.usuario2 = '';

                auth.signOut();

                $state.go("login");


            }

        };

        //Upload Images througth Firebase Storage

        var auth = firebase.auth();
        var storageRef = firebase.storage().ref();


        function handleFileSelect(evt) {

            evt.stopPropagation();
            evt.preventDefault();
            var file = evt.target.files[0];

            $scope.tipoArchivo = file.type;
            var metadata = {
                'contentType': file.type
            };

            // Push to child path.
            var uploadTask = storageRef.child('files/' + file.name).put(file, metadata);


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

                $scope.ubicacion = url;

            });


        }

        //Function Onload to add an event Listener in file element
        $scope.onload = function () {
            document.getElementById('file').addEventListener('change', handleFileSelect, false);
            document.getElementById('file').disabled = false;

        };
    }
);



