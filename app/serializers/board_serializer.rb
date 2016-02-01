class BoardSerializer < ActiveModel::Serializer
  attribute :id
  attribute :name
  attribute :description
  attribute :created_at
  attribute :updated_at
end
