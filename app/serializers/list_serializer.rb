class ListSerializer < ActiveModel::Serializer
  attribute :id
  attribute :board_id
  attribute :name
  attribute :description
  attribute :created_at
  attribute :updated_at
end
