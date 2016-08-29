/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('userListCtrl',
        function(users, $scope,typeUser,$window) {
            $scope.users = users;
            console.log("Ingrese a userListCtrl");

            console.log("Tipo de Usuario Factory: "+ typeUser.get());
            if(typeUser.get()=="Configurador" || typeUser.get()=="Lider" ){
                $window.alert("Página NO AUTORIZADA");
                $state.go("inicio.bienvenida");

            }

            $scope.eliminarUsuario=function (usuario) {
                console.log("Ingrese a Eliminar Usuario");
                console.log(usuario);
                console.log(usuario.uid)
                var reco=$scope.users.$getRecord(usuario.uid);
                console.log(reco);
                reco.activo=false;
                console.log(reco);
                $scope.users.$save(reco);
            }
        }
    );
