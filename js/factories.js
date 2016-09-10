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
    .factory('modelToJson', function ($http) {
        return {
            get: function () {
                console.log("inside function");
                return $http.get('json/dell-computers2.json');
            }
        };
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


//Factory to pass the project information to Edit Page
angular
    .module('multiSplot')
    .factory('projectUpdate', function() {
        var project;

        return {

            get: function () {
                return project;
            },
            set: function (projectR) {
                project=projectR;
            }

        };
    });


//Factory para mostrar el menu dependiendo del usuario
angular
    .module('multiSplot')
    .factory('menu', function() {
        var menu;
        return {

            set: function (menuR) {
                menu=menuR;
            },
            get: function () {
                return menu;
            }
        };
    });

