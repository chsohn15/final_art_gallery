class NoteSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :painting_id, :original?

  belongs_to :paintings
  
end
