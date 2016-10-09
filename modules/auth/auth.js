/**
 * Multi-user SPLOT
 */

angular.module('multiSplot')
    .controller('authCtrl',
        function($scope, $state, auth, $window,userActual) {
            $scope.auth = auth;

            // any time auth state changes, add the user data to scope
            $scope.auth.$onAuthStateChanged(function(firebaseUser) {
                $scope.firebaseUser = firebaseUser;
                userActual.set(firebaseUser);

            });

            this.signOut = function() {

                $scope.auth.$signOut();

                $state.go("login")

                    .catch(function(error){
                        $window.alert("Error changing view: " + error)
                    });
            }

        }
    );