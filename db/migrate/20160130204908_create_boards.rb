class CreateBoards < ActiveRecord::Migration[5.0]
  def change
    create_table :boards do |t|
      t.string :name, null: false
      t.text :description
      t.timestamps null: false
    end

    add_index :boards, :name, unique: true
  end
end
