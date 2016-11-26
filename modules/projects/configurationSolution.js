/**
 * Multi-user SPLOT
 */

angular.module('projectsSplot')
    .controller('configurationSolutionCtrl',
        function(auth,users, $scope,projectsRelatedF,typeUser,$state,$window,projectSelected,$http) {


            $scope.proyecto=projectSelected.getInformation();

            $scope.miembros=projectSelected.getMember();

            $scope.usuarios=users;

            $scope.miembrosProject=[];

            $scope.resultado={};

            $scope.miembros.forEach(function (item, index) {
                $scope.miembrosProject.push($scope.usuarios.$getRecord(item.uid));
            });

            $scope.solve = function () {

                var peticion = {
                    method  : 'JSONP',
                    url     : 'https://script.google.com/macros/s/AKfycbyKIVkr62i1_CWw3Kb1YDo2Vg5fHX1wYWWbnkiBSY-E/dev',
                    params  : {
                        callback  : 'JSON_CALLBACK',
                        action    : 'solve',
                        id_model  : '-KVZip6LPXa83th4b6sg'
                    }
                };

                $http(peticion)
                    .then(

                        //ok
                        function(response) {
                            $scope.resultado = response.data;
                        },

                        // error
                        function(error) {
                            $window.alert("Ha ocurrido un error al tratar de solucionar el modelo");
                        }
                    );
            }

            $scope.solveConflictMinimize = function() {
                var peticion = {
                    method  : 'JSONP',
                    url     : 'https://script.google.com/macros/s/AKfycbyKIVkr62i1_CWw3Kb1YDo2Vg5fHX1wYWWbnkiBSY-E/dev',
                    params  : {
                        callback  : 'JSON_CALLBACK',
                        action    : 'solveConflictMinimize',
                        id_model  : '-KVZip6LPXa83th4b6sg',
                        id_config_1 : '3',
                        id_config_2 : '2'
                    }
                };

                $http(peticion)
                    .then(

                        //ok
                        function(response) {
                            $scope.resultado = response.data;
                        },

                        // error
                        function(error) {
                            $window.alert("error");
                        }
                    );
            }

            $scope.solveConflictMaximize = function() {
                var peticion = {
                    method  : 'JSONP',
                    url     : 'https://script.google.com/macros/s/AKfycbyKIVkr62i1_CWw3Kb1YDo2Vg5fHX1wYWWbnkiBSY-E/dev',
                    params  : {
                        callback  : 'JSON_CALLBACK',
                        action    : 'solveConflictMaximize',
                        id_model  : '-KVZip6LPXa83th4b6sg',
                        id_config_1 : '3',
                        id_config_2 : '2'
                    }
                };

                $http(peticion)
                    .then(

                        //ok
                        function(response) {
                            $scope.resultado = response.data;
                        },

                        // error
                        function(error) {
                            $window.alert("error");
                        }
                    );
            }

            $scope.solveConflictWithWeights = function() {
                var peticion = {
                    method  : 'JSONP',
                    url     : 'https://script.google.com/macros/s/AKfycbyKIVkr62i1_CWw3Kb1YDo2Vg5fHX1wYWWbnkiBSY-E/dev',
                    params  : {
                        callback  : 'JSON_CALLBACK',
                        action    : 'solveConflictWithWeights',
                        id_model  : '-KVZip6LPXa83th4b6sg',
                        id_config_1 : '3',
                        weight_1    : 10,
                        id_config_2 : '2',
                        weight_2    : 20
                    }
                };

                $http(peticion)
                    .then(

                        //ok
                        function(response) {
                            $scope.resultado = response.data;
                        },

                        // error
                        function(error) {
                            $window.alert("error");
                        }
                    );
            }

            $scope.clear= function () {

                $scope.resultado={};
                
            };
            /* Imprime los miembros */
            //$window.alert(JSON.stringify($scope.miembros, null, 4));

        }
    );
