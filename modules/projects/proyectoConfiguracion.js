/**
 * Multi-user SPLOT
 */

angular.module('projectsSplot')
    .controller('configuracionCtrl',
        function($scope,auth,users,typeUser,$http,modelToJson,projectSelected,projects) {

            $scope.proyecto=projectSelected.getInformation();

            $scope.msg=$scope.proyecto.modelo;

            $scope.myConf=[];
            
            //All the Projects -> Firebase Array
            $scope.projects = projects;

<<<<<<< 0819d4d51bb2d6a6aeb1ef47e3e9dbc8550f69c2
            $scope.indix2='_id_1';
=======
            /*modelToJson.get($scope.proyecto.modelo).then(function (msg) {
             $scope.msg = msg;
             });
             */
>>>>>>> New organization of the project: Modules

            $scope.act=1;

            //All the Users -> Firebase Array
            $scope.usuarios = users;

            //Get the Record in  FirebaseArray througth userUpdate Factory
            $scope.usuario = $scope.usuarios.$getRecord(auth.$getAuth().uid);

            $scope.userConfig;

            //Save the position
            $scope.userConfigPos;

            getUserConfiguration();

<<<<<<< 0819d4d51bb2d6a6aeb1ef47e3e9dbc8550f69c2
            function getUserConfiguration(){

                angular.forEach($scope.proyecto.configs, function(valueConfig, keyConfig) {

                    if(valueConfig.uid == $scope.usuario.$id){
                        $scope.userConfig=valueConfig;
                        $scope.userConfigPos=keyConfig;
                    }

                });

                }

            //Menu
            $scope.step=function (child_id) {
                $scope.indix2 ='_id_'+child_id;
                console.log("Indix 2:"+$scope.indix2);
            };

            $scope.aumentar=function () {
                if($scope.act < $scope.proyecto.modelo.model.tree.children.length ){
                    $scope.indix2='_id_'+($scope.act+1);
                    $scope.act=($scope.act+1);
                    var parentScope = $scope.$parent;
                    parentScope.$$childScope ;
                    console.log($scope.$parent.name);
                }
            };

            $scope.disminuir=function () {
                if($scope.act>1){
                    $scope.indix2='_id_'+($scope.act-1);
                    $scope.act=($scope.act-1);
                }
            };


            $scope.setValue = function (val) {

                console.log(projectSelected.get());
                //$scope.usuarios[$scope.usuarios.$indexFor(userUpdate.get())].activo = $scope.currentUser.activo;

                //$scope.projectSave=$scope.projects.$indexFor(projectSelected.get());

                $scope.projectToSave=$scope.projects.$getRecord(projectSelected.get());
                $scope.projectToSave.configs[$scope.userConfigPos].config[$scope.act-1].idSelection = val;

                $scope.projects.$save($scope.projectToSave);
                console.log(val);
            }


        });
=======
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
>>>>>>> New organization of the project: Modules
