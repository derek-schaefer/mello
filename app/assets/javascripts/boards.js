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
      'Lists',
      'List',
      'Cards',
      'Card',
      BoardCtrl
    ]);

  function Board($resource) {
    return $resource('/boards/:boardId.json', {
      boardId: '@id'
    }, {
      update: { method: 'PUT' }
    });
  }

  function BoardsCtrl(Board) {
    this.boards = Board.query();
  }

  function BoardCtrl($scope, Board, Lists, List, Cards, Card) {
    var self = this;
    var cable = null;

    this.board = null;
    this.submit = submit;

    $scope.$watch('boardId', function(boardId) {
      cable = subscribe(boardId);
      self.board = Board.get({ boardId: boardId });
      List.query({ boardId: boardId }, function(lists) {
        Lists.set(lists);
      });
      Card.query({ boardId: boardId }, function(cards) {
        Cards.set(cards);
      });
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
      var event = data.event.split(':');
      if (event[0] === 'board') update(event[1], data.payload);
      $scope.$broadcast(data.event, data.payload);
    }

    function update(action, board) {
      self.board = new Board(board);
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
