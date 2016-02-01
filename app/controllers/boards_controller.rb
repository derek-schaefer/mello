class BoardsController < ApplicationController
  before_action :authenticate_user
  respond_to :html, :json

  def index
    respond_with find_boards
  end

  def show
    respond_with find_board
  end

  def create
    board = Board.new
    ok = board.update(board_params)
    board.board_relay(:create) if ok
    respond_with board
  end

  def update
    board = find_board
    ok = board.update(board_params)
    board.board_relay(:update) if ok
    respond_with board
  end

  private

  def find_boards
    @boards ||= Board.all
  end

  def find_board
    @board ||= Board.find(params[:id])
  end

  def board_params
    params.require(:board).permit(
      :name, :description
    )
  end
end
