(function() {

  'use strict';

  Cable.Board = {
    subscribe: function(id, context) {
      return Cable.connect().subscriptions
        .create({ channel: 'BoardChannel', id: id }, context);
    }
  };

})();
