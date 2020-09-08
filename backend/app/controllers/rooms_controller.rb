class RoomsController < ApplicationController

    def index
        rooms = Room.all 
        render json: rooms, include: :paintings
    end

    def show 
        room = Room.find(params[:id])
        render json: room
    end

    def update 
       
        room = Room.find(params[:id])
        room.update(room_params)
        
        render json: room
    end

    private

    def room_params
        params.require(:room).permit!
        # (:id, :name, :user_id, :original?, :paintings => [])
    end
   
end
