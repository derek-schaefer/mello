class Card < ApplicationRecord
  include BoardRelay

  belongs_to :list
  has_one :board, through: :list

  validates :list, presence: true
  validates :name, presence: true, uniqueness: { scope: :list_id }

  default_scope { order(name: :asc) }

  def board_relay(action)
    super board.id, action
  end
end
