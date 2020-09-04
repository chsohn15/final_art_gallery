class RoomSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :original?

  has_many :paintings
end
