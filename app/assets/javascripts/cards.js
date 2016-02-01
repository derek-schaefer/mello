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
    .factory('Cards', [
      'Collection',
      Cards
    ])
    .controller('CardsCtrl', [
      '$scope',
      'Cards',
      'Card',
      CardsCtrl
    ]);

  function Cards(Collection) {
    return Collection.create();
  }

  function Card($resource) {
    return $resource('/cards/:cardId.json', {
      cardId: '@id'
    }, {
      update: { method: 'PUT' }
    });
  }

  function CardsCtrl($scope, Cards, Card) {
    var self = this;
    var boardId = $scope.boardId;

    this.cards = null;
    this.listCards = listCards;
    this.submit = submit;

    Cards.get().then(function(cards) {
      self.cards = cards;
    });

    $scope.$on('card:create', updateEvent);
    $scope.$on('card:update', updateEvent);

    function updateEvent(event, payload) {
      update(event.name.split(':')[1], payload);
    }

    function update(action, card) {
      switch (action) {
      case 'create':
        return self.cards.push(new Card(card));
      case 'update':
        return angular.extend(
          _.findWhere(self.cards, { id: card.id }),
          card
        );
      }
    }

    function listCards(list, cards) {
      return _.select(cards, function(card) {
        return card.list_id === list.id;
      });
    }

    function submit(card) {
      if (card.id) {
        card.$update();
      } else {
        card.$save();
      }
    }
  }

})();
