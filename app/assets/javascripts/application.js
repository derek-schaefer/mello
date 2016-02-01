// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require angular/angular
//= require angular-resource/angular-resource
//= require underscore/underscore
//= require_tree .

(function() {

  'use strict';

  angular
    .module('mello', [
      'mello.boards',
      'mello.lists',
      'mello.cards'
    ])
    .factory('Collection', [
      '$q',
      Collection
    ])
    .directive('flash', [
      '$timeout',
      flash
    ])
    .config([
      '$httpProvider',
      config
    ]);

  angular.element(document)
    .on('page:before-change page:before-unload', function() {
      angular.element(document.body).scope().$broadcast('$destroy');
    })
    .on('ready page:load', function() {
      angular.bootstrap(document.body, ['mello'], { strictDi: true });
    });

  function config($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] =
      angular.element('meta[name=csrf-token]').attr('content');
  }

  function Collection($q) {
    return {
      create: create
    };

    function create() {
      var future = $q.defer();

      return {
        get: get,
        set: set
      };

      function get() {
        return future.promise;
      }

      function set(lists) {
        return future.resolve(lists);
      }
    }
  }

  function flash($timeout) {
    return {
      link: link
    };

    function link($scope, $element, $attrs) {
      var delay = parseInt($attrs.timeout) || 5000;

      $timeout(function() {
        $element.slideUp();
      }, delay);
    }
  }

})();
