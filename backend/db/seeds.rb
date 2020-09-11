# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Painting.destroy_all
Room.destroy_all
Note.destroy_all
User.destroy_all
PaintingRoom.destroy_all


user1 = User.create(
    name: "James Bo",
    username: "jbo"
)

room1 = Room.create(
    name: "Epic Journeys"
)
room2 = Room.create(
    name: "Where Entropy Reigns Supreme"
)

room3 = Room.create(
    name: "My Collection",
    original?: false,
    user: user1
)


voyage = Painting.create(
    artist: "Thomas Cole",
    date: 1842,
    movement: "Romanticism",
    title: "The Voyage of Life: Youth",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Thomas_Cole_-_The_Voyage_of_Life_Youth%2C_1842_%28National_Gallery_of_Art%29.jpg/800px-Thomas_Cole_-_The_Voyage_of_Life_Youth%2C_1842_%28National_Gallery_of_Art%29.jpg")

note1 = Note.create(
    content: '"The Voyage of Life: Youth" by Thomas Cole',
    original?: true
)

note2 = Note.create(
    content: "The painting depicts a heroic young adult who looks forward with confidence and exuberance toward the future. The hero's physical separation from the angel shows his increasing independence as he ventures toward his aspirations.",
    original?: true
)

note3 = Note.create(
    content: "The castle in the distance represents the youth's hopes and dreams for the future. The airy quality of the visage reflects the elusive and lofty nature of dreams.",
    original?: true
)

note4 = Note.create(
    content: "The verdurous landscape emphasizes the youth's growth and beauty during this point in his life. The calm waters undescore a peaceful transition from childhood to independence.",
    original?: true
)

voyage.notes << [note1, note2, note3, note4]

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

cliff = Painting.create(
    artist: "Claude Monet",
    date: 1882,
    movement: "Impressionism",
    title: "Cliff Walk at Pourville",
    image_url: "https://www.claude-monet.com/images/paintings/cliff-walk-at-pourville.jpg")

age = Painting.create(
    artist: "Thomas Cole",
    date: 1842,
    movement: "Romanticism",
    title: "The Voyage of Life:Old Age",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Thomas_Cole_-_The_Voyage_of_Life_Old_Age%2C_1842_%28National_Gallery_of_Art%29.jpg/1280px-Thomas_Cole_-_The_Voyage_of_Life_Old_Age%2C_1842_%28National_Gallery_of_Art%29.jpg")



waves = Painting.create(
    artist: "Arnold Böcklin",
    date: 1883,
    movement: "Symbolism",
    title: "Im Spiel der Wellen",
    image_url: "https://res.cloudinary.com/tne/image/authenticated/s--7v0Ti9hm--/q_80/artworks/ARNOLD-BOECKLIN_IM-SPIEL-DER-WELLEN_CC-BY-SA_BSTGS_7754.jpg")

liberty = Painting.create(
    artist: "Eugène Delacroix",
    date: 1830,
    movement: "Romanticism",
    title: "Liberty Leading The People",
    image_url: "https://images.theconversation.com/files/235848/original/file-20180911-144455-ktyybr.jpg?ixlib=rb-1.1.0&q=30&auto=format&w=600&h=475&fit=crop&dpr=2")
                    
wrath = Painting.create(
    artist: "John Martin",
    date: 1851,
    movement: "Romanticism",
    title: "The Great Day of His Wrath",
    image_url: "https://www.tate.org.uk/art/images/work/N/N05/N05613_10.jpg")
    
encounter = Painting.create(
    artist: "James W Johnson",
    date: "2014",
    movement: "Abstract Postmodernism",
    title: "Encounter",
    image_url: "https://images.fineartamerica.com/images-medium-large-5/encounter-james-w-johnson.jpg")

    
chaos = Painting.create(
    artist: "Rita Dianni-Kaleel",
    date: 2010,
    movement: "Abstract Post-Modernism",
    title: "The Order Of Chaos",
    image_url: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/the-order-of-chaos-rita-dianni-kaleel.jpg")
        
life = Painting.create(
    artist: "Erin Hanson",
    date: 2014,
    movement: "Abstract Post-Modernism",
    title: "The Path",
    image_url: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/the-path-erin-hanson.jpg")
    

            room1.paintings << [voyage, bridge, cannes, cassatt, cliff, age]
            room2.paintings << [waves,liberty,life,wrath, encounter, chaos]
            
            
            
            
