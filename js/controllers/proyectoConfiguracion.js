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
        });
