class CreateRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.string :name
      t.string :user_id, :default => nil
      t.boolean :original?, :default => true

      t.timestamps
    end
  end
end
