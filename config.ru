# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment', __FILE__)

# Action Cable uses EventMachine which requires that all classes are loaded in advance
Rails.application.eager_load!
require 'action_cable/process/logging'

if ENV['CABLE']
  run ActionCable.server
else
  run Rails.application
end
