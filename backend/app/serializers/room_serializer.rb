class RoomSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :original?, :paintings

  has_many :paintings
  belongs_to :user


end
