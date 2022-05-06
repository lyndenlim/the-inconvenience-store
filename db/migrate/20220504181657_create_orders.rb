class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.bigint :user_id
      t.bigint :item_id
      t.bigint :quantity
      t.decimal :price
      t.decimal :total

      t.timestamps
    end
  end
end
