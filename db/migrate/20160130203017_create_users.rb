class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :username, null: false
      t.string :password_digest
      t.timestamps null: false
    end

    add_index :users, :email, unique: true
    add_index :users, :username, unique: true
  end
end
