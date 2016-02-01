class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.references :list, null: false
      t.string :name, null: false
      t.text :content
      t.timestamps null: false
    end

    add_foreign_key :cards, :lists
    add_index :cards, %i(list_id name), unique: true
  end
end
