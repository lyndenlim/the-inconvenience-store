class OrderSerializer < ActiveModel::Serializer
  attributes :user_id, :all_items, :first_name, :last_name, :email, :address, :address2, :country, :city, :state, :postcode, :card_name, :card_number, :expiry_date, :security_code, :order_number, :order_date

  def order_date
    self.object.created_at.strftime("%m-%d-%Y")
  end
end
