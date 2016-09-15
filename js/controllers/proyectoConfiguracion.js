/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('configuracionCtrl',
        function(users, $scope,typeUser,$window,$http,modelToJson,projectSelected) {


                //$window.alert(JSON.stringify($scope.proyecto, null, 4));


            $scope.proyecto=projectSelected.getInformation();
                modelToJson.get($scope.proyecto.modelo).then(function (msg) {
                        $scope.msg = msg;
                });


                $scope.indix2='_id_1';

                $scope.act=1;

                $scope.aumentar=function () {
                        $scope.indix2='_id_'+($scope.act+1);
                        $scope.act=($scope.act+1);
                }

                $scope.disminuir=function () {
                        if($scope.act>1){
                                $scope.indix2='_id_'+($scope.act-1);
                                $scope.act=($scope.act-1);
                        }
                }
        });
