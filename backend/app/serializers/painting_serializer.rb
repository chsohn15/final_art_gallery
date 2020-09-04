class PaintingSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :image_url, :movement, :date

  belongs_to :room
end
