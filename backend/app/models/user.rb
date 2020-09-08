class User < ApplicationRecord
    has_one :room
    accepts_nested_attributes_for :room

    
end
