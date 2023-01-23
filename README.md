# MyMangaList2.0

My Manga List 2.0 it's a improved version of My Manga List. It's still a place to organise the manga you're reading, but it separates different series of mangas and its volumes.

# About

You can add all your read and to-be-read mangas and this API will organize it for you.

- Add a manga series by its name, author, genre and a image. And add all volumes from its series you've previously added by its volume number, image and the total amount of chapters.
- List all series added, as well as all volumes added.
- List manga series by different genres such as shounen, shoujo, seinen and josei.
- Updating a manga you're currently reading so you don't miss the chapter you paused.
- Rate your manga volume once you've finished it, including a description on how you've liked it.
- Delete a manga volume from your database.

# Routes

SERIES ROUTES:
	
	POST: /series
	Adding a new manga series to your db:
		- Body: { 
  			"name": "SPYxFAMILY", 
  			"author": "Tatsuya Endo", 
  			"genre": "shounen",
  			"image": "https://m.media-amazon.com/images/I/71RPJe1eVCL.jpg" 
 		}

	GET: /series
	Return all series you've added.

	GET: /genre?genre=shounen
	Return all series from a specific genre.

VOLUMES ROUTES:
	
	POST: /volume
	Adding a new volume from a series you've already added:
		- Body: { 
  			"serie_name": "SPYxFAMILY",
			"number": 1
  			"image": "https://m.media-amazon.com/images/I/71RPJe1eVCL.jpg",
			"total_chapters": 20,
			
 		}
	GET: /volume
	List of all volumes you've added.

	PUT: /volume
	Update a volume that you're currently reading.
		- Body: { 
  			"serie_name": "SPYxFAMILY",
			"number": 1
  			"status": "reading",
			"read_chapters": 10
 		}

	PUT: /finish
	Update a volume that you finished, you can add a rating and a avaliation in the description area.
		- Body: { 
  			"serie_name": "SPYxFAMILY",
			"number": 1
  			"status": "read",
			"read_chapters": 20,
			"rating": "5.0",
			"description": "Anya likes peanuts, but hates carrots"
			
 		}

	DELETE: /volume/:volumeId
	Delete a volume by its id.
