class PaintingRoomsController < ApplicationController
    def index 
        paintingrooms = PaintingRoom.all
        render json: paintingrooms
    end
    def create
        paintingroom = PaintingRoom.create(pr_params)
        render json: paintingroom
    end


    private 
    def pr_params
        params.require(:painting_rooms).permit(:painting_id,:room_id)
    end

end
