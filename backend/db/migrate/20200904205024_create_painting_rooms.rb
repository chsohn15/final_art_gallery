class CreatePaintingRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :painting_rooms do |t|
      t.integer :painting_id
      t.integer :room_id

      t.timestamps
    end
  end
end
