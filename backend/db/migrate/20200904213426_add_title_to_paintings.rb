class AddTitleToPaintings < ActiveRecord::Migration[6.0]
  def change
    add_column :paintings, :title, :string
  end
end
