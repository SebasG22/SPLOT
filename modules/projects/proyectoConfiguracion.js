/**
 * Multi-user SPLOT
 */

angular.module('projectsSplot')
    .controller('configuracionCtrl',
        function(users, $scope,typeUser,$window,$http,modelToJson,projectSelected) {

            $scope.proyecto=projectSelected.getInformation();

            //$window.alert(JSON.stringify($scope.proyecto.modelo, null, 4));


            /*modelToJson.get($scope.proyecto.modelo).then(function (msg) {
             $scope.msg = msg;
             });
             */

            $http({
                method: 'jsonp',
                url: ""+$scope.proyecto.modelo,

                params: {
                    format: 'json',
                    callback: 'JSON_CALLBACK'
                }
            }).then(function (response) {
                //$window.alert(JSON.stringify(response.data, null, 4));
                $scope.msg=response.data;
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