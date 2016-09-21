/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('configuracionCtrl',
        function(users, $scope,typeUser,$window,$http,modelToJson,projectSelected) {


                //$window.alert(JSON.stringify($scope.proyecto, null, 4));


            $scope.proyecto=projectSelected.getInformation();

            /*modelToJson.get($scope.proyecto.modelo).then(function (msg) {
                        $scope.msg = msg;
                });
                 */

            $http({
                method: 'jsonp',
                url: "https://firebasestorage.googleapis.com/v0/b/splot3-31f45.appspot.com/o/JSONMODELS%2Fdell-computersModified.json?alt=media&token=cc00fd35-3a56-4753-a537-28a7718dd6da",
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
