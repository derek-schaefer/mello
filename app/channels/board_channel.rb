# Be sure to restart your server when you modify this file. Action Cable runs in an EventMachine loop that does not support auto reloading.
class BoardChannel < ApplicationCable::Channel
  def subscribed
    return reject unless board
    stream_from "boards:#{board.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  private

  def board
    @board ||= Board.find_by(id: params[:id])
  end
end
