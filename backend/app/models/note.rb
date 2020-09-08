class Note < ApplicationRecord
    belongs_to :painting, optional: true

end
