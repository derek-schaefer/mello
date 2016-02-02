(function() {

  'use strict';

  angular
    .module('mello.lists', [
      'ngResource'
    ])
    .factory('List', [
      '$resource',
      List
    ])
    .controller('ListCtrl', [
      '$scope',
      'List',
      ListCtrl
    ]);

  function List($resource) {
    return $resource(
      '/lists/:listId.json',
      { listId: '@id' },
      { update: { method: 'PUT' } }
    );
  }

  function ListCtrl($scope, List) {
    var self = this;

    this.selectCards = selectCards
    this.submit = submit;

    $scope.$on('list:update', function(event, payload) {
      if (payload.id === $scope.list.id) {
        angular.extend($scope.list, payload);
      }
    });

    function selectCards(cards) {
      return _.where(cards, { list_id: $scope.list.id });
    }

    function submit(list) {
      if (list.id) {
        return list.$update();
      } else {
        return list.$save();
      }
    }
  }

})();
