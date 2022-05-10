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
      t.bigint :order_number
      t.decimal :shipping_cost
      t.decimal :order_total

      t.timestamps
    end
  end
end
