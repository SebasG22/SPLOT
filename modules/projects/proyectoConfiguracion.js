/**
 * Multi-user SPLOT
 */

angular.module('projectsSplot')
    .controller('configuracionCtrl',
        function(users, $scope,typeUser,$window,$http,modelToJson,projectSelected,projects, userActual) {

            $scope.proyecto=projectSelected.getInformation();

            $scope.msg=$scope.proyecto.modelo;

            $scope.myConf=[];
            
            //All the Projects -> Firebase Array
            $scope.projects = projects;

            $scope.indix2='_id_1';

            $scope.act=1;

            //Menu
            $scope.step=function (child_id) {
                $scope.indix2 ='_id_'+child_id;
                console.log("Indix 2:"+$scope.indix2);
            };

            $scope.aumentar=function () {
                $scope.indix2='_id_'+($scope.act+1);
                $scope.act=($scope.act+1);
                var parentScope = $scope.$parent;
                parentScope.$$childScope ;
                console.log($scope.$parent.name);

            };

            $scope.disminuir=function () {
                if($scope.act>1){
                    $scope.indix2='_id_'+($scope.act-1);
                    $scope.act=($scope.act-1);
                }
            };

            $scope.setValue = function (val) {

                console.log(val);
            }


        });
