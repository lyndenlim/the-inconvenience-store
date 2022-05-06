class CreateCarts < ActiveRecord::Migration[6.1]
  def change
    create_table :carts do |t|
      t.bigint :user_id
      t.bigint :item_id
      t.bigint :quantity
      t.decimal :price
      t.decimal :total

      t.timestamps
    end
  end
end
