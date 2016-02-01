module BoardRelay
  extend ActiveSupport::Concern

  def board_relay(board_id, action)
    serializer = ActiveModel::Serializer.serializer_for(self)
    payload = serializer.new(self).attributes.as_json
    event = "#{model_name.singular}:#{action}"
    BoardRelayJob.perform_later(board_id, event, payload)
  end
end
