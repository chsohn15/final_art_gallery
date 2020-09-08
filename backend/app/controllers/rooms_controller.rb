class RoomsController < ApplicationController

    def index
        rooms = Room.all 
        render json: rooms, include: :paintings
    end

    def show 
        room = Room.find(params[:id])
        render json: room
    end

   
end
