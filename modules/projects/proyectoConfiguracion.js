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

            $scope.myConf=[];

            angular.forEach($scope.msg.model.tree.children, function(valueCategory, keyCategory) {

                $scope.idCategory = valueCategory.id;

                angular.forEach(valueCategory.children, function(valueFeature, keyFeature) {

                    $scope.idFeature = valueFeature.id;

                    $scope.stateFeature = valueFeature.state;

                    $scope.idSelection = '';

                });

                $scope.myConf[keyCategory]={"idCategory":$scope.idCategory,"idFeature":$scope.idFeature,"stateFeature":$scope.stateFeature,
                    "idSelection":$scope.idSelection};

            });

                console.log("%O",$scope.myConf);

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
            };

            $scope.disminuir=function () {
                if($scope.act>1){
                    $scope.indix2='_id_'+($scope.act-1);
                    $scope.act=($scope.act-1);
                }
            }
        });
