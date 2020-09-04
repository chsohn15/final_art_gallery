class CreatePaintings < ActiveRecord::Migration[6.0]
  def change
    create_table :paintings do |t|
      t.string :artist
      t.integer :date
      t.string :movement
      t.string :image_url

      t.timestamps
    end
  end
end
