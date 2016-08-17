/**
 * Created by SebasG on 6/08/16.
 */
angular.module('asideMenuDemo')
    .controller('configuracionCtrl',
        function(users, $scope,typeUser,$window,$http) {

          // $scope.proyecto=fileTojson.get();

                //$window.alert(JSON.stringify($scope.proyecto, null, 4));

                $http.get('json/stores.json');
        });
