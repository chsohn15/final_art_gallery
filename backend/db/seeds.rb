# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Painting.destroy_all
Room.destroy_all

room1 = Room.create(
    name: "Journeys"
)

voyage = Painting.create(
    artist: "Thomas Cole",
    date: 1842,
    movement: "Romanticism",
    title: "The Voyage of Life: Youth",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Thomas_Cole_-_The_Voyage_of_Life_Youth%2C_1842_%28National_Gallery_of_Art%29.jpg/800px-Thomas_Cole_-_The_Voyage_of_Life_Youth%2C_1842_%28National_Gallery_of_Art%29.jpg")

bridge = Painting.create(
    artist: "Claude Monet",
    date: 1874,
    movement: "Impressionism",
    title: "The Bridge at Argenteuil",
    image_url: "https://www.impressionists.org/images/paintings/bridge-at-argenteuil.jpg")

cannes = Painting.create(
    artist: "Pablo Picasso",
    date: 1958,
    movement: "Expressionism",
    title: "La Baie de Cannes",
    image_url: "https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://www.art-critique.com/wp-content/uploads/thumbs/16-524577-3a57h6fzrmunifi45r2dj4.jpg")

cassatt = Painting.create(
    artist: "Mary Cassatt",
    date: 1893,
    movement: "Impressionism",
    title: "The Boating Party",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Mary_Cassatt_-_The_Boating_Party_-_Google_Art_Project.jpg/1280px-Mary_Cassatt_-_The_Boating_Party_-_Google_Art_Project.jpg")

    room1.paintings << [voyage, bridge, cannes, cassatt]
