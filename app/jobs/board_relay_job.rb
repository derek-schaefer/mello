class BoardRelayJob < ApplicationJob
  def perform(id, event, payload)
    ActionCable.server.broadcast("boards:#{id}", {
      event: event, payload: payload
    })
  end
end
