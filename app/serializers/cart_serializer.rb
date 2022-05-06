class CartSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :item, :quantity, :price, :total

  def items
    self.object.item
  end
end
