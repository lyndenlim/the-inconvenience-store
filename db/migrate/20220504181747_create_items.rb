class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name
      t.float :price
      t.text :category
      t.text :description
      t.text :photos, array: true, default: []

      t.timestamps
    end
  end
end
