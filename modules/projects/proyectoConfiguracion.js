/**
 * Multi-user SPLOT
 */

angular.module('projectsSplot')
    .controller('configuracionCtrl',
        function(users, $scope,typeUser,$window,$http,modelToJson,projectSelected,projects, userActual) {

            $scope.proyecto=projectSelected.getInformation();


            angular.forEach($scope.proyecto.models, function(valueModel, keyModel) {

                console.log(userActual.getUID());
                console.log(valueModel.uid);
                if(valueModel.uid==userActual.getUID()){

                    $scope.msg=valueModel.featureModel;
                }

            });


            //All the Projects -> Firebase Array
            $scope.projects = projects;

            $scope.indix2='_id_1';

            $scope.act=1;

            $scope.aumentar=function () {
                $scope.indix2='_id_'+($scope.act+1);
                $scope.act=($scope.act+1);
            };

            $scope.disminuir=function () {
                if($scope.act>1){
                    $scope.indix2='_id_'+($scope.act-1);
                    $scope.act=($scope.act-1);
                }
            }
        });
