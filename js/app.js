/**
 * Multi-user SPLOT
 */

// definition of the main application

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAdBtAgvhG9-tGmHlQNanwkBAnZrLU8u0o",
    authDomain: "splot3-31f45.firebaseapp.com",
    databaseURL: "https://splot3-31f45.firebaseio.com",
    storageBucket: "splot3-31f45.appspot.com",
};
firebase.initializeApp(config);


// define the main module
var app = angular.module('multiSplot', ['asideModule','ui.router','firebase']);

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

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.tpl.html',
            controller: 'loginCtrl',
            controllerAs: 'ctrl',
            authenticate: false
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup2.tpl.html',
            controller: 'usuariosCtrl',
            controllerAs: 'ctrl',
            authenticate: false
        })
        .state('inicio', {
            url: '/inicio',
            templateUrl: 'views/Inicio.tpl.html',
            authenticate: false,
            controller:'inicioCtrl'
        })
        .state('inicio.bienvenida', {
            url: '/bienvenida',
            templateUrl: 'views/bienvenida.html',
            authenticate: false
        })
        .state('inicio.perfil', {
            url: '/miperfil',
            templateUrl: 'views/perfil.html',
            controller:'profileCtrl',
            authenticate: false
        })

        .state('inicio.editarPerfil', {
            url: '/editarPerfil',
            templateUrl: 'views/formUsuarioUpdate.html',
            controller:'usuarioUpdateCtrl',
            authenticate: false

        })

        .state('inicio.crearUsuario', {
            url: '/crearUsuario',
            templateUrl: 'views/formUsuario.html',
            controller:'usuariosCtrl',
            authenticate: true

        })

        .state('inicio.listarUsuarios', {
            url: '/listarUsuarios',
            templateUrl: 'views/listarUsuarios.html',
            controller: 'userListCtrl',
            controllerAs: 'ctrl',
            authenticate: true
        })

        .state('inicio.crearProyecto', {
            url: '/crearProyecto',
            templateUrl: 'views/formProyecto.html',
            controller:'proyectosCtrl',
            authenticate: false

        })
    .state('inicio.listarProyectos', {
        url: '/listarProyectos',
        templateUrl: 'views/listarProyectos.tpl.html',
        controller:'projectListCtrl',
        authenticate: false

    })
        .state('inicio.detalleProyecto', {
            url: '/detalleProyecto',
            templateUrl: 'views/detalleProyecto.html',
            controller:'detalleproyectoCtrl',
            authenticate: false

        })

    .state('inicio.configuracionProyecto', {
        url: '/configuracionProyecto',
        templateUrl: 'views/proyectoConfiguracion.html',
        controller:'configuracionCtrl',
        authenticate: false

    });

});
