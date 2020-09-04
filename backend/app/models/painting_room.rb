class PaintingRoom < ApplicationRecord
    belongs_to :painting
    belongs_to :room
end
