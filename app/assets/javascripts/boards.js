(function() {

  'use strict';

  angular
    .module('mello.boards', [
      'ngResource'
    ])
    .factory('Board', [
      '$resource',
      Board
    ])
    .controller('BoardsCtrl', [
      'Board',
      BoardsCtrl
    ])
    .controller('BoardCtrl', [
      '$scope',
      'Board',
      'List',
      'Card',
      BoardCtrl
    ]);

  function Board($resource) {
    return $resource(
      '/boards/:boardId.json',
      { boardId: '@id' },
      { update: { method: 'PUT' } }
    );
  }

  function BoardsCtrl(Board) {
    this.boards = Board.query();
  }

  function BoardCtrl($scope, Board, List, Card) {
    var self = this;
    var cable = null;

    this.board = null;
    this.lists = null;
    this.cards = null;
    this.submit = submit;

    $scope.$watch('boardId', function(boardId) {
      cable = subscribe(boardId);
      self.board = Board.get({ boardId: boardId });
      self.lists = List.query({ boardId: boardId });
      self.cards = Card.query({ boardId: boardId });
    });

    $scope.$on('$destroy', function() {
      cable.unsubscribe();
    });

    function subscribe(boardId) {
      return Cable.Board.subscribe(boardId, {
        received: function(data) {
          $scope.$apply(function() {
            receive(data);
          });
        }
      });
    }

    function receive(data) {
      console.log('received', data);
      $scope.$broadcast(data.event, data.payload);
      switch (data.event) {
      case 'board:update':
        update(data.payload);
        break;
      case 'list:create':
        addList(data.payload);
        break;
      case 'card:create':
        addCard(data.payload);
        break;
      }
    }

    function update(board) {
      self.board = new Board(board);
    }

    function addList(list) {
      self.lists.push(new List(list));
    }

    function addCard(card) {
      self.cards.push(new Card(card));
    }

    function submit(board) {
      if (board.id) {
        return board.$update();
      } else {
        return board.$save();
      }
    }
  }

})();
