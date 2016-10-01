/**
 * Created by SebasG on 1/10/16.
 */
/**
 * Multi-user SPLOT
 */

// definition of the main application
// define the main module
var app = angular.module('projectsSplot', ['asideModule','ui.router','firebase']);

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAdBtAgvhG9-tGmHlQNanwkBAnZrLU8u0o",
    authDomain: "splot3-31f45.firebaseapp.com",
    databaseURL: "https://splot3-31f45.firebaseio.com",
    storageBucket: "splot3-31f45.appspot.com",
};

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/listarProyectos');

    var basePath = 'modules/projects/';
    
    $stateProvider

        .state('crearProyecto', {
            url: '/crearProyecto',
            authenticate: false,
            parent: 'inicio',
            views: {
                'mainView': {
                    controller:'proyectosCtrl',
                    templateUrl: basePath+'formProyecto.html',

                }
            }
        })
        
        .state('editarProyecto', {
            url: '/editarProyecto',
            authenticate: false,
            parent: 'inicio',
            views: {
                'mainView': {
                    controller:'proyectoUpdateCtrl',
                    templateUrl: basePath+'formProyectoUpdate.html',

                }
            }
        })

        .state('listarProyectos', {
            url: '/listarProyectos',
            authenticate: false,
            parent: 'inicio',
            views: {
                'mainView': {
                    controller:'projectListCtrl',
                    templateUrl: basePath+'listarProyectos.tpl.html',

                }
            }

        })
        .state('detalleProyecto', {
            url: '/detalleProyecto',
            authenticate: false,
            parent: 'inicio',
            views: {
                'mainView': {
                    controller:'detalleproyectoCtrl',
                    templateUrl: basePath+'detalleProyecto.html',

                }
            }
        })

        .state('procesoConfiguracion', {
            url: '/procesoConfiguracion',
            authenticate: true,
            parent: 'inicio',
            views: {
                'mainView': {
                    templateUrl: basePath+'configurationProcess.html',

                }
            }

        })

        .state('configuracionProyecto', {
            url: '/configuracionProyecto',
            authenticate: false,
            parent: 'inicio',
            views: {
                'mainView': {
                    controller:'configuracionCtrl',
                    templateUrl: basePath+'proyectoConfiguracion.html',

                }
            }
        })

});
