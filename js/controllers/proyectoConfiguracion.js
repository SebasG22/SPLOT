/**
 * Created by SebasG on 6/08/16.
 */
angular.module('asideMenuDemo')
    .controller('configuracionCtrl',
        function(users, $scope,typeUser,$window,$http,Friend) {

          // $scope.proyecto=fileTojson.get();

                //$window.alert(JSON.stringify($scope.proyecto, null, 4));
                Friend.get().then(function (msg) {
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
