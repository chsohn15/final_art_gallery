class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :room

  has_one :room
  #has_many :paintings

end
