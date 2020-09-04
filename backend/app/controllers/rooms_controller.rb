class RoomsController < ApplicationController

    def index
        rooms = Room.all 
        render json: rooms, include: :paintings
    end
end
