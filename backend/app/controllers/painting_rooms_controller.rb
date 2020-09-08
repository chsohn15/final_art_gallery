class PaintingRoomsController < ApplicationController
    def index 
        paintingrooms = PaintingRoom.all
        render json: paintingrooms
    end

    def create
        #byebug
        paintingroom = PaintingRoom.create(pr_params)
        render json: paintingroom
    end


    private 
    def pr_params
        params.require(:painting_room).permit(:painting_id,:room_id,:created_at,:updated_at)
    end

end
