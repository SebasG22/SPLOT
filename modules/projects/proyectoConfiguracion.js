/**
 * Multi-user SPLOT
 */

angular.module('projectsSplot')
    .controller('configuracionCtrl',
        function(users, $scope,typeUser,$window,$http,modelToJson,projectSelected,projects) {

            $scope.proyecto=projectSelected.getInformation();



            //$window.alert(JSON.stringify($scope.proyecto.modelo, null, 4));


            /*modelToJson.get($scope.proyecto.modelo).then(function (msg) {
             $scope.msg = msg;
             });
             */


            //All the Users -> Firebase Array
            $scope.projects = projects;

            //Get the Record in  FirebaseArray

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

                $scope.currentProject = $scope.projects.$getRecord(projectSelected.get());

                $scope.projects[$scope.projects.$indexFor(projectSelected.get())].modelo = $scope.msg;

                $scope.projects.$save($scope.projects.$getRecord(projectSelected.get()));

                $scope.currentProject = $scope.projects.$getRecord(projectSelected.get());

                $scope.msg=$scope.currentProject.copia.model;

            });


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
