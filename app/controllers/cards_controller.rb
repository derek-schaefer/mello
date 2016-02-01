class CardsController < ApplicationController
  before_action :authenticate_user
  respond_to :json

  def index
    respond_with find_cards
  end

  def show
    respond_with find_card
  end

  def create
    card = Card.new
    ok = card.update(card_params)
    card.board_relay(:create) if ok
    respond_with card
  end

  def update
    card = find_card
    ok = card.update(card_params)
    card.board_relay(:update) if ok
    respond_with card
  end

  private

  def find_cards
    @cards ||= Card.joins(:board).where(boards: { id: board_id })
  end

  def find_card
    @card ||= Card.find(params[:id])
  end

  def card_params
    params.require(:card).permit(
      :list_id, :name, :content
    )
  end

  def board_id
    params[:board_id] || params[:boardId]
  end
end
