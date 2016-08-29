/**
 * Multi-user SPLOT
 */

// firebaseArray with a method to add an item defining the key
angular.module('multiSplot')
    .factory("$customFirebaseArray",
        function($firebaseArray, $firebaseObject) {

            return $firebaseArray.$extend({

                $addWithKey: function (uid, obj) {
                    var objRef = this.$ref().child(uid);
                    var newObj = $firebaseObject(objRef);
                    angular.merge(newObj, obj);
                    return newObj.$save();
                }

            });
        });

angular
    .module('multiSplot')
    .factory('fileTojson', function ($http,$window,$scope) {
        return {
            get: function () {
                console.log("inside function");
                console.log(""+$http.get('json/stores.json'));
                $window.alert(JSON.stringify($http.get('json/stores.json'), null, 4));

                $http.get('json/stores.json').then(function (msg) {
                    $scope.msg = msg;
                    console.log("He convertido el archivoJson a un Arreglo");
                    console.log(msg);
                    $window.alert(JSON.stringify(msg, null, 4));

                });
                return $http.get('json/stores.json');
            }
        };
    });

angular
    .module('multiSplot')
    .factory('typeUser', function() {
        var type;
    return {

        get: function () {
            return type;
        },
        set: function (typeInput) {
            type=typeInput;
        }
    };
});

angular
    .module('multiSplot')
    .factory('user', function() {
        var user;
        return {

            get: function () {
                return user;
            },
            set: function (userInfo) {
                user=userInfo;
            }
        };
    });

angular
    .module('multiSplot')
    .factory('userActual', function() {
        var userA;
        var uid;
        return {

            get: function () {
                return userA;
            },
            setUID: function (valueUID) {
                uid= valueUID;
            },
            getUID: function () {
                return uid;
            },
            set: function (usr) {
                userA=usr;
            }
        };
    });

// Factory para almacenar los proyectos relacionados
angular
    .module('multiSplot')
    .factory('projectsRelatedF', function() {
        var projects;

        return {

            get: function () {
                return projects;
            },
            set: function (project) {
                projects=project;
            }
        };
    });

// Factory para almacenar el project Key del proyecto que se desea ver en detalle cuado se haga click en detallar
angular
    .module('multiSplot')
    .factory('projectSelected', function() {
        var key;
        var information;
        var members;

        return {

            get: function () {
                return key;
            },
            set: function (newKey) {
                key=newKey;
            },
            getInformation: function () {
                return information;
            },
            setInformation: function (newInfo) {
                information=newInfo;
            },
            getMember: function () {
                return members;
            },
            setMember: function (newMembers) {
                members=newMembers;
            }
        };
    });

angular
    .module('multiSplot')
    .controller('yourCtrl', function ($scope, fileTojson,$window) {
        fileTojson.get().then(function (msg) {
            $scope.msg = msg;
            console.log("He convertido el archivoJson a un Arreglo");
            console.log(msg);
        });
    });


angular
    .module('multiSplot')
    .factory('yourCtrl2', function ($scope, fileTojson,$window) {


        return {

            getFile: function () {

                fileTojson.get().then(function (msg) {
                    $scope.msg = msg;
                    console.log("He convertido el archivoJson a un Arreglo");
                    console.log(msg);
                    $window.alert(JSON.stringify(msg, null, 4));

                });

                return msg;
            }
        };
    });

angular
    .module('multiSplot')
    .factory('Friend', function ($http) {
        return {
            get: function () {
                console.log("inside function");
                return $http.get('json/dell-computers2.json');
            }
        };
    });

angular
    .module('multiSplot')
    .controller('yourCtrl', function ($scope, Friend) {
        Friend.get().then(function (msg) {
            $scope.msg = msg;
        });
    });


//Factory to pass the user information to Edit Page
angular
    .module('multiSplot')
    .factory('userUpdate', function() {
        var userInfo;
        var action;

        return {

            get: function () {
                return userInfo;
            },
            set: function (userInfoR) {
                userInfo=userInfoR;
            },
            getAction:function () {
                return action;
            },
            setAction:function (actionR) {
                action=actionR;
            }
        };
    });
