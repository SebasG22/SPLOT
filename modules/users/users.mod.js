/**
 * Multi-user SPLOT
 */

// definition of the main application
// define the main module
var app = angular.module('usersSplot', ['asideModule','ui.router','firebase']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/listarUsuarios');

    var basePath = 'modules/users/';

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================

        .state('crearUsuario', {
            url: '/crearUsuario',
            authenticate: true,
            parent: 'inicio',
            views: {
                'mainView': {
                    controller:'usuariosCtrl',
                    templateUrl: basePath+'formUsuario.html',
                }
            }
        })

        .state('listarUsuarios', {
            url: '/listarUsuarios',
            authenticate: true,
            parent: 'inicio',
            views: {
                'mainView': {
                    controller:'userListCtrl',
                    controllerAs: 'ctrl',
                    templateUrl: basePath+'listarUsuarios.html',
                }
            }
        })

        .state('perfil', {
            url: '/miperfil',
            authenticate: false,
            parent: 'inicio',
            views: {
                'mainView': {
                    controller:'profileCtrl',
                    templateUrl: basePath+'perfil.html',

                }
            }
        })

        .state('editarPerfil', {
            url: '/editarPerfil',
            authenticate: false,
            parent: 'inicio',
            views: {
                'mainView': {
                    controller:'usuarioUpdateCtrl',
                    templateUrl: basePath+'formUsuarioUpdate.html',
                }
            }
        })

        .state('usuarioInactivo', {
            url: '/usuarioInactivo',
            authenticate: false,
            controller:'userInactiveCtrl',
            templateUrl: basePath+'userInactive.html'
        })

});