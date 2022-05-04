class OrderSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :item_id, :quantity, :total

  belongs_to :user
  belongs_to :item
end
