/**
 * Multi-user SPLOT
 */

angular.module('projectsSplot')
    .controller('configurationSolutionCtrl',
        function(auth,users, $scope,projectsRelatedF,typeUser,$state,$window,projectSelected,projectUpdate,userActual) {


            $scope.proyecto=projectSelected.getInformation();

            $scope.miembros=projectSelected.getMember();

            $scope.usuarios=users;

            $scope.miembrosProject=[];

            $scope.miembros.forEach(function (item, index) {
                $scope.miembrosProject.push($scope.usuarios.$getRecord(item.uid));
            });


            /* Imprime los miembros */
            //$window.alert(JSON.stringify($scope.miembros, null, 4));

        }
    );
