(function() {

  'use strict';

  angular
    .module('mello.cards', [
      'ngResource'
    ])
    .factory('Card', [
      '$resource',
      Card
    ])
    .controller('CardCtrl', [
      '$scope',
      'Card',
      CardCtrl
    ]);

  function Card($resource) {
    return $resource(
      '/cards/:cardId.json',
      { cardId: '@id' },
      { update: { method: 'PUT' } }
    );
  }

  function CardCtrl($scope, Card) {
    var self = this;

    this.submit = submit;

    $scope.$on('card:update', function(event, payload) {
      if (payload.id === $scope.card.id) {
        angular.extend($scope.card, payload);
      }
    });

    function submit(card) {
      if (card.id) {
        return card.$update();
      } else {
        return card.$save();
      }
    }
  }

})();
