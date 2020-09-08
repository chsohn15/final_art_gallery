class Room < ApplicationRecord
    has_many :painting_rooms
    has_many :paintings, through: :painting_rooms
    belongs_to :user
end
