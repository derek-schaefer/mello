class CreateLists < ActiveRecord::Migration[5.0]
  def change
    create_table :lists do |t|
      t.references :board, null: false
      t.string :name, null: false
      t.text :description
      t.timestamps null: false
    end

    add_foreign_key :lists, :boards
    add_index :lists, %i(board_id name), unique: true
  end
end
