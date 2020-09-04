class PaintingsController < ApplicationController

    def index
        paintings = Painting.all 
        render json: paintings
    end
end
