class OrderSerializer < ActiveModel::Serializer
  attributes :user_id, :all_items, :first_name, :last_name, :email, :address, :address2, :city, :state, :postcode, :order_number, :order_date, :shipping_cost, :order_total

  def order_date
    self.object.created_at.strftime("%m-%d-%Y")
  end
end
