Rails.application.routes.draw do
  resources :users
  resources :rooms
  resources :notes
  resources :paintings
  resources :painting_rooms, as: "paintingroom"
 
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
