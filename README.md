# Back_End

# After School Classes Back-End
This is the back-end of the After School Classes project, developed using node.js/express.js. The application allows students and parents to browse, sort, and purchase after-school classes and activities.

# GitHub Repository
- [Back-End GitHub Repository](https://github.com/aj217/Back_End.git)

# Lessons
- **GET /api/get-lessons**: Retrieve all available lessons.
- **GET /api/search?q={query}**: Search lessons by subject, location, price, or spaces.
- **POST /api/add-lesson**: Create a new lesson.
- **PUT /api/update-lesson/:id**: Update details of a specific lesson using its ID.

# Orders
- **PUT /api/update-lesson/:id**: Update details of a specific lesson using its ID.

# Technologies Used
- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for building REST APIs.
- **MongoDB**: NoSQL database for storing lessons and orders.
- **properties-reader**: For environment variable management.

# SchoolStore.lessonlist.json
[{
  "_id": {
    "$oid": "6732acdfeee6249960215662"
  },
  "subject": "Science",
  "location": "Brent cross",
  "price": 120,
  "spaces": 6,
  "image": "/science.png"
},
{
  "_id": {
    "$oid": "6732acdfeee6249960215663"
  },
  "subject": "History",
  "location": "Golders Green",
  "price": 90,
  "spaces": 0,
  "image": "/history.png"
},
{
  "_id": {
    "$oid": "6732acdfeee6249960215664"
  },
  "subject": "Art",
  "location": "Hendon",
  "price": 75,
  "spaces": 6,
  "image": "/art.png"
},
{
  "_id": {
    "$oid": "6732acdfeee6249960215660"
  },
  "subject": "Math",
  "location": "Hendon",
  "price": 100,
  "spaces": 5,
  "image": "/math.png"
},
{
  "_id": {
    "$oid": "6732acdfeee6249960215661"
  },
  "subject": "English",
  "location": "Colindale",
  "price": 80,
  "spaces": 3,
  "image": "/english.png"
},
{
  "_id": {
    "$oid": "6732acdfeee6249960215665"
  },
  "subject": "Music",
  "location": "Kingsbury",
  "price": 110,
  "spaces": 4,
  "image": "/music.png"
},
{
  "_id": {
    "$oid": "6732acdfeee6249960215666"
  },
  "subject": "physics",
  "location": "Harrow",
  "price": 150,
  "spaces": 2,
  "image": "/physics.png"
},
{
  "_id": {
    "$oid": "6732acdfeee6249960215668"
  },
  "subject": "Biology",
  "location": "Wembely",
  "price": 120,
  "spaces": 5,
  "image": "/biology.png"
},
{
  "_id": {
    "$oid": "6732acdfeee6249960215669"
  },
  "subject": "Geography",
  "location": "Hendon",
  "price": 95,
  "spaces": 3,
  "image": "/geography.png"
},
{
  "_id": {
    "$oid": "6732acdfeee6249960215667"
  },
  "subject": "chemistry",
  "location": "Hendon",
  "price": 100,
  "spaces": 6,
  "image": "/chemistry.png"
}]

# SchoolStore.orders.json
[{
  "_id": {
    "$oid": "6733f745827caeb0eb38aa83"
  },
  "name": "Alice Johnson",
  "phone": "1122334455",
  "lessonIDs": [
    "6732acdfeee6249960215661",
    "6732acdfeee6249960215664",
    "6732acdfeee6249960215668"
  ],
  "number_of_spaces": 5
},
{
  "_id": {
    "$oid": "6733f95a827caeb0eb38aa84"
  },
  "name": "Aayush",
  "phone": "0123456789",
  "lessonIDs": [
    null
  ],
  "number_of_spaces": 2
},
{
  "_id": {
    "$oid": "6733f9c2827caeb0eb38aa85"
  },
  "name": "Akshar",
  "phone": "7946177148",
  "lessonIDs": [
    null
  ],
  "number_of_spaces": 1
},
{
  "_id": {
    "$oid": "6733f9fb827caeb0eb38aa86"
  },
  "name": "Abhi",
  "phone": "1234554321",
  "lessonIDs": [
    null
  ],
  "number_of_spaces": 5
},
{
  "_id": {
    "$oid": "67340570827caeb0eb38aa87"
  },
  "name": "Aayush",
  "phone": "0222222222",
  "lessonIDs": [
    null
  ],
  "number_of_spaces": 4
},
{
  "_id": {
    "$oid": "6734c0a869a32b2d25cb188a"
  },
  "name": "Yash",
  "phone": "1234567890",
  "lessonIDs": [
    "6734bdf369a32b2d25cb1887",
    "6734bae62737b076a21394cd"
  ],
  "number_of_spaces": 2
},
{
  "_id": {
    "$oid": "673627f175b2024e861bdc93"
  },
  "name": "Priansh",
  "phone": "0123456789",
  "lessonIDs": [
    "6732acdfeee6249960215668"
  ],
  "number_of_spaces": 2
},
{
  "_id": {
    "$oid": "6736820c81df93778b37cc6e"
  },
  "name": "Rima Patel",
  "phone": "0123456789",
  "lessonIDs": [
    "6732acdfeee6249960215668"
  ],
  "number_of_spaces": 2
},
{
  "_id": {
    "$oid": "6737aef486c60e4e83457611"
  },
  "name": "Lucas ",
  "phone": "1234567890",
  "lessonIDs": [
    "6732acdfeee6249960215668"
  ],
  "number_of_spaces": 1
},
{
  "_id": {
    "$oid": "673cbefb2cb186f7baad3acb"
  },
  "name": "akshar",
  "phone": "0123456789",
  "lessonIDs": [
    "6732acdfeee6249960215663"
  ],
  "number_of_spaces": 1
},
{
  "_id": {
    "$oid": "673df12311f50199307439ab"
  },
  "name": "Aayush",
  "phone": "0123456789",
  "lessonIDs": [
    "6732acdfeee6249960215662"
  ],
  "number_of_spaces": 1
},
{
  "_id": {
    "$oid": "673df2d111f50199307439ae"
  },
  "name": "priansh",
  "phone": "0123456789",
  "lessonIDs": "673df17511f50199307439ac",
  "number_of_spaces": 1
}]

# SchoolStore.postmancollection.json
{
	"info": {
		"_postman_id": "96181df1-5f25-4bd2-b842-3921c1cede24",
		"name": "SchoolProject",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "39688724"
	},
	"item": [
		{
			"name": "http://localhost:5001/api/get-lessons",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:5001/api/get-lessons",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5001",
					"path": [
						"api",
						"get-lessons"
					]
				}
			},
			"response": []
		},
		{
			"name": "http://localhost:5001/api/add-lesson",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n   \"name\": \"Vatsal\",\r\n   \"phone\": \"0987654321\",\r\n   \"lessonIDs\": [\"6732acdfeee6249960215667\",\"6732acdfeee6249960215668\",\"6732acdfeee6249960215664\"],\r\n   \"number_of_spaces\": 5\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:5001/api/add-order",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5001",
					"path": [
						"api",
						"add-order"
					]
				}
			},
			"response": []
		},
		{
			"name": "http://localhost:5001/api/update-lesson/6732acdfeee6249960215663",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"subject\": \"History\",\r\n    \"location\": \"Golders Green\",\r\n    \"price\": 90,\r\n    \"spaces\": 8\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:5001/api/update-lesson/6732acdfeee6249960215663",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5001",
					"path": [
						"api",
						"update-lesson",
						"6732acdfeee6249960215663"
					]
				}
			},
			"response": []
		}
	]
}

