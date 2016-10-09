/**
 * Multi-user SPLOT
 */

// definition of the main application
// define the main module
var app = angular.module('othersSplot', ['asideModule','ui.router','firebase']);


app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/preguntasFrecuentes');

    var basePath = 'modules/others/';


    $stateProvider

        .state('nosotros', {
            url: '/nosotros',
            authenticate: true,
            parent: 'inicio',
            views: {
                'mainView': {
                    templateUrl: basePath+'team.html',
                }
            }
        })

        .state('preguntasFrecuentes', {
            url: '/preguntasFrecuentes',
            authenticate: true,
            parent: 'inicio',
            views: {
                'mainView': {
                    templateUrl: basePath+'faq.html',
                }
            }

        });


});
