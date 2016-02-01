class List < ApplicationRecord
  include BoardRelay

  belongs_to :board
  has_many :cards, dependent: :destroy

  validates :board, presence: true
  validates :name, presence: true, uniqueness: { scope: :board_id }

  default_scope { order(name: :asc) }

  def board_relay(action)
    super board_id, action
  end
end
