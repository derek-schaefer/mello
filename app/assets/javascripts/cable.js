// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//
// Turn on the cable connection by removing the comments after the require statements (and ensure it's also on in config/routes.rb).
//
//= require action_cable
//= require_self
//= require_tree ./channels

(function() {

  'use strict';

  window.Cable = {
    connect: function() {
      if (Cable.consumer === undefined) {
        Cable.consumer = ActionCable.createConsumer();
      }
      return Cable.consumer;
    }
  };

})();