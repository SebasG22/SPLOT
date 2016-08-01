/**
 * Created by SebasG on 10/07/16.
 */
angular.module('asideMenuDemo')
    .controller('projectListCtrl',
        function(users, $scope,projectsRelatedF,typeUser,$state,$window) {


            $scope.projects = projectsRelatedF.get();


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
