class PaintingRoomsController < ApplicationController
    def index 
        paintingrooms = PaintingRoom.all
        render json: paintingrooms
    end

    def show
        pr = PaintingRoom.find(params[:id])
        render json: pr 
    end

    def create
        #byebug
        paintingroom = PaintingRoom.create(pr_params)
        render json: paintingroom
    end

    def unsave 
        pr = PaintingRoom.find_by(painting_id: params[:paintingID], room_id: params[:roomID])
        pr.destroy
        #render json: "Painting is deleted from room"
    end

    private 
    def pr_params
        params.require(:painting_room).permit(:painting_id,:room_id,:created_at,:updated_at)
    end

end
