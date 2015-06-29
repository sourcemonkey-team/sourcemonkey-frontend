(function() {
  'use strict';

  window.app = angular.module('editorApp', ['ngRoute', 'jsTree.directive']).
  config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/', {
        templateUrl: '../partials/editor.html',
        controller: 'EditorCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
    }
  ]);

}());
