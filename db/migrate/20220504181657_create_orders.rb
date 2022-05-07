class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.bigint :user_id
      t.text :all_items, array: true, default: []
      t.text :first_name
      t.text :last_name
      t.text :email
      t.text :address
      t.text :address2
      t.text :city
      t.text :state
      t.bigint :postcode
      t.text :card_name
      t.bigint :card_number
      t.text :expiry_date
      t.bigint :security_code
      t.bigint :order_number

      t.timestamps
    end
  end
end
