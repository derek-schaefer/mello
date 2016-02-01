class UserSerializer < ActiveModel::Serializer
  attribute :id
  attribute :email
  attribute :username
  attribute :created_at
  attribute :updated_at
end
