# Be sure to restart your server when you modify this file. Action Cable runs in an EventMachine loop that does not support auto reloading.
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_user
      logger.add_tags('ActionCable', current_user.username)
    end

    private

    def find_user
      user = User.find_by(id: cookies.signed[:user_id])
      return user if user
      reject_unauthorized_connection
    end
  end
end
