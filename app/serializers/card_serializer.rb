class CardSerializer < ActiveModel::Serializer
  attribute :id
  attribute :list_id
  attribute :name
  attribute :content
  attribute :created_at
  attribute :updated_at
end
