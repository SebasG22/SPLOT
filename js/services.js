/**
 * Multi-user SPLOT
 */

var module = angular.module('multiSplot');

// list of users
module
    .service('usuarios', ['$customFirebaseArray',
        function($customFirebaseArray) {
            // reference to the database root
            var ref = firebase.database().ref();
            // reference to the /projects
            return $customFirebaseArray(ref.child('Usuarios'));
        }
    ]);

// authentication
module
    .factory('auth', ['$firebaseAuth',
        function($firebaseAuth) {
            return $firebaseAuth();
        }
    ]);

// User management
// ===============

// synchronized list of users
module
    .service('users', ['$firebaseArray',
        function($firebaseArray) {
            // reference to the database root
            var ref = firebase.database().ref();
            // reference to the /users
            return $firebaseArray(ref.child('users'));
        }
    ]);

// synchronized list of white-list
angular.module('multiSplot')
    .service('whitelist', ['$customFirebaseArray',
        function($customFirebaseArray) {
            // reference to the database root
            var ref = firebase.database().ref();
            // reference to the /projects
            return $customFirebaseArray(ref.child('whitelist'));
        }
    ]);

// synchronized list of projects
module
    .service('projects', ['$firebaseArray',
        function($firebaseArray) {
            // reference to the database root
            var ref = firebase.database().ref();
            // reference to the /users
            return $firebaseArray(ref.child('projects'));
        }
    ]);

// synchronized list of menus
module
    .service('sistema', ['$firebaseArray',
        function($firebaseArray) {
            // reference to the database root
            var ref = firebase.database().ref();
            // reference to the /users
            return $firebaseArray(ref.child('sistema'));
        }
    ]);



module
    .factory('userService',['users', 'auth', '$q', '$firebaseObject',
        function(users, auth, $q, $firebaseObject){
            // service to define
            var service = {};

            /*
             userService.createUser(email, password)
             */
            service.createUser = function(email, password,nombre,identificacion,direccion,profesion,permiso,imagen) {

                // return a promise
                return $q(function(resolve, reject) {

                    // creates and logins the user in firebase


                    auth.$createUserWithEmailAndPassword(email,password)
                        // the user was created in firebase ?


                        .then(function(firebaseUser) {
                            // report in console
                            console.log("User " + firebaseUser.uid + " created successfully in the Firebase Auth System!");

                            // add it to the /users array
                            // using the same uid defined by firebase
                            var userRef = users.$ref().child(firebaseUser.uid);
                            var newUser = $firebaseObject(userRef);
                            newUser.uid = firebaseUser.uid;
                            newUser.usuario = email;
                            newUser.nombre= nombre;
                            newUser.identificacion=identificacion;
                            newUser.direccion=direccion;
                            newUser.profesion=profesion;
                            newUser.tipo=permiso;
                            newUser.activo='true';
                            newUser.imagen=imagen;



                            // save
                            newUser.$save()
                                // if everything is ok
                                .then( function(ref) {
                                    // report in console
                                    console.log("User " + firebaseUser.uid + " added to the users list!");
                                    // the promise will return ok
                                    resolve(firebaseUser);
                                    // the user cannot be saved ?
                                }, function(error){
                                    // report in console
                                    console.error("User " + firebaseUser.uid + " cannot be added to the users list!");
                                    // the promise will produce an error
                                    reject(error);
                                });

                            // the user cannot be created in Firebase Auth ?
                        }, function(error) {
                            // report in console
                            console.error("User was not created in the Firebase Auth system!");
                            // the promise will produce an error
                            reject(error);
                        });

                }); // end of return $q

            };

            return service;
        }
    ]);





