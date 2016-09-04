/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('detalleproyectoCtrl',
        function(users, $scope,projectsRelatedF,typeUser,$state,$window,projectSelected,projectUpdate) {


            $scope.proyecto=projectSelected.getInformation();

            $scope.miembros=projectSelected.getMember();
            
            $scope.editProject=function () {
              
                projectUpdate.set($scope.proyecto);

                $state.go("inicio.editarProyecto");
                
            };

            /* Imprime los miembros */
            //$window.alert(JSON.stringify($scope.miembros, null, 4));

        }
    );
