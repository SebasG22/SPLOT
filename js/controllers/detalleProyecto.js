/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('detalleproyectoCtrl',
        function(auth,users, $scope,projectsRelatedF,typeUser,$state,$window,projectSelected,projectUpdate,userActual) {


            $scope.proyecto=projectSelected.getInformation();

            $scope.miembros=projectSelected.getMember();

            $scope.editProject=function () {

                projectUpdate.set($scope.proyecto);

                $state.go("inicio.editarProyecto");

            };

            $scope.edit=false;

            $scope.usuarioA=userActual.getUID();

            angular.forEach($scope.proyecto.lideres, function(value, key) {

                console.log("For Each:"+value.uid);
                console.log("User Actual:"+userActual.getUID());
                if(value.uid==$scope.usuarioA){
                        $scope.edit=true;
                    console.log("El usuario es lider del proyecto");
                }
                else{
                    $scope.edit=false;
                    console.log("El usuario NO es lider del proyecto");

                }
            });




            /* Imprime los miembros */
            //$window.alert(JSON.stringify($scope.miembros, null, 4));

        }
    );
