/**
 * Multi-user SPLOT
 */

// definition of the main application
// define the main module
var app = angular.module('multiSplot', ['asideModule','ui.router','firebase','usersSplot','projectsSplot','othersSplot']);

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAdBtAgvhG9-tGmHlQNanwkBAnZrLU8u0o",
    authDomain: "splot3-31f45.firebaseapp.com",
    databaseURL: "https://splot3-31f45.firebaseio.com",
    storageBucket: "splot3-31f45.appspot.com",
};
firebase.initializeApp(config);

// configure the ui-route
var module = angular.module('multiSplot');
module
    .run(['$rootScope', '$state', '$window', 'auth',
        function($rootScope, $state, $window, auth) {

            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
                // Use the 'authenticate' attribute of the route
                if (toState.authenticate && auth.$getAuth() == null) {
                    // User isn’t authenticated
                    $state.transitionTo("login");
                    event.preventDefault();
                }
            });

            // behaviour before changing the current view
            $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
                // We can catch the error thrown when the $requireSignIn promise is rejected
                // and redirect the user back to the home page
                if (error === "AUTH_REQUIRED") {
                    $state.go("login")
                        .catch(function(error){
                            $window.alert("Error changing view: " + error)
                        });
                }
            });
        }
    ]);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    var basePath = 'modules/auth/';


    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('login', {
            url: '/login',
            templateUrl: basePath+'login.tpl.html',
            controller: 'loginCtrl',
            controllerAs: 'ctrl',
            authenticate: false
        })
        .state('signup', {
            url: '/signup',
            templateUrl: basePath+'signup2.tpl.html',
            controller: 'usuariosCtrl',
            controllerAs: 'ctrl',
            authenticate: false
        })
        .state('inicio', {
            url: '/inicio',
            templateUrl:  basePath+'Inicio.tpl.html',
            controller:'inicioCtrl',
            abstract:true,
            authenticate: false,
        })
        .state('bienvenida', {
            url: '/bienvenida',
            authenticate: false,
            parent: 'inicio',
            views: {
                'mainView': {
                    templateUrl: basePath+'bienvenida.html'
                }
            }
        })

<<<<<<< 0819d4d51bb2d6a6aeb1ef47e3e9dbc8550f69c2
});
=======
});
>>>>>>> New organization of the project: Modules
