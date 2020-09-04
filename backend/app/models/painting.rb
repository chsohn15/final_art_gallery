class Painting < ApplicationRecord
    has_many :notes
    has_many :painting_rooms
    has_many :rooms, through: :painting_rooms
end
