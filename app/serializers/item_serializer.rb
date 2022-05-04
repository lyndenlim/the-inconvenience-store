class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :category, :description, :photos
end
