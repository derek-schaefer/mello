class ListsController < ApplicationController
  before_action :authenticate_user
  respond_to :json

  def index
    respond_with find_lists
  end

  def show
    respond_with find_list
  end

  def create
    list = List.new
    ok = list.update(list_params)
    list.board_relay(:create) if ok
    respond_with list
  end

  def update
    list = find_list
    ok = list.update(list_params)
    list.board_relay(:update) if ok
    respond_with list
  end

  private

  def find_lists
    @lists ||= List.where(board_id: board_id)
  end

  def find_list
    @list ||= List.find(params[:id])
  end

  def list_params
    params.require(:list).permit(
      :board_id, :name, :description
    )
  end

  def board_id
    params[:board_id] || params[:boardId]
  end
end
