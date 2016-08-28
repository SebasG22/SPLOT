/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('detalleproyectoCtrl',
        function(users, $scope,projectsRelatedF,typeUser,$state,$window,projectSelected) {


            $scope.proyecto=projectSelected.getInformation();

            $scope.miembros=projectSelected.getMember();

            /* Imprime los miembros */
            //$window.alert(JSON.stringify($scope.miembros, null, 4));

        }
    );
