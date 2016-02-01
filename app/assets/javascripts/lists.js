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
    .factory('Lists', [
      'Collection',
      Lists
    ])
    .controller('ListsCtrl', [
      '$scope',
      'Lists',
      'List',
      ListsCtrl
    ]);

  function Lists(Collection) {
    return Collection.create();
  }

  function List($resource) {
    return $resource('/lists/:listId.json', {
      listId: '@id'
    }, {
      update: { method: 'PUT' }
    });
  }

  function ListsCtrl($scope, Lists, List) {
    var self = this;
    var boardId = $scope.boardId;

    this.lists = null;
    this.submit = submit;

    Lists.get().then(function(lists) {
      self.lists = lists;
    });

    $scope.$on('list:create', updateEvent);
    $scope.$on('list:update', updateEvent);

    function updateEvent(event, payload) {
      update(event.name.split(':')[1], payload);
    }

    function update(action, list) {
      switch (action) {
      case 'create':
        return self.lists.push(new List(list));
      case 'update':
        return angular.extend(
          _.findWhere(self.lists, { id: list.id }),
          list
        );
      }
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
