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

            $scope.resultado={};

            $scope.result=[];

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
                            $scope.showAnswer();
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
                            $scope.showAnswer();
                        },

                        // error
                        function(error) {
                            $window.alert("Ha ocurrido un error al tratar de solucionar el modelo");
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
                            $scope.showAnswer();
                        },

                        // error
                        function(error) {
                            $window.alert("Ha ocurrido un error al tratar de solucionar el modelo");
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
                            $scope.showAnswer();
                        },
                        // error
                        function(error) {
                            $window.alert("Ha ocurrido un error al tratar de solucionar el modelo");
                        }
                    );
            }

            $scope.clear= function () {
                $scope.resultado={};
                $scope.result=[];

            };


            $scope.showAnswer= function () {

                $scope.ant=0;
                $scope.temp;
                Object.keys($scope.resultado.solution).forEach(function (key) {

                    if($scope.resultado.solution[key] == 1){

                        if(!key.includes('id') || key.length>7){
                            if($scope.ant==0){
                                $scope.temp=key;
                                $scope.ant=1;
                            }
                            else {
                                $scope.result.push({"parent": $scope.temp, "child":key});
                                $scope.ant=0;
                                $scope.temp="";
                            }
                        }

                    }
                });

                $scope.result.forEach(function (item,index) {
                    console.log(item);
                });
            };
        }
    );
