class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.string :content
      t.integer :user_id, :default => nil
      t.integer :painting_id
      t.boolean :original?

      t.timestamps
    end
  end
end
