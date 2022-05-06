class UserSerializer < ActiveModel::Serializer
  attributes :id, :email

  has_many :orders
  has_many :items
end
