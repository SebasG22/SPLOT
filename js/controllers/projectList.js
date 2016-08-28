/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('projectListCtrl',
        function(users, $scope,projectsRelatedF,typeUser,$state,$window,projectSelected) {


            $scope.projects = projectsRelatedF.get();


            $scope.projectDetail= function (projectKey,project,miembros) {
                /*Imprimir el project Key*/
                //$window.alert("Ha seleccionado: "+ projectKey);

                /*Imprimir el project*/
                //$window.alert(JSON.stringify(project, null, 4));

                /*Imprimir el miembros*/
                //$window.alert(JSON.stringify(miembros, null, 4));

                projectSelected.set(projectKey);
                projectSelected.setInformation(project);
                projectSelected.setMember(miembros);

                $state.go("inicio.detalleProyecto");

            };


            //Comprobación del tipo de usuario para mantener o redireccionar a otra página
            if(typeUser.get()=="Administrador2" ){
                $window.alert("Página NO AUTORIZADA");
                $state.go("inicio.bienvenida");

            }

            //Método pendiente por revisar: COMO ELIMINAR UN HIJO DE PROJECTS EN FIREBASE
            $scope.eliminarProyecto=function (proyecto) {
                console.log("Ingrese a Eliminar Proyecto");

            }
        }
    );
