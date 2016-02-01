class Board < ApplicationRecord
  include BoardRelay

  has_many :lists, dependent: :destroy
  has_many :cards, through: :lists

  validates :name, presence: true, uniqueness: true

  default_scope { order(name: :asc) }

  def board_relay(action)
    super id, action
  end
end
