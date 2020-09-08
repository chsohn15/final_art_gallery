class PaintingSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :image_url, :movement, :date

  belongs_to :rooms
  has_many :notes
end
