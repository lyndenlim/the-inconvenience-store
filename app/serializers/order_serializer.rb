class OrderSerializer < ActiveModel::Serializer
  attributes :user_id, :order, :first_name, :last_name, :email, :address, :address2, :country, :city, :state, :postcode, :card_name, :card_number, :expiry_date, :security_code
end
