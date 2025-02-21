# Todo API Documentation

## Base URL
```http
http://localhost:5000

Endpoints
1. Get All Todos
HTTP

GET /todos
Response

JSON

[
    {
        "id": 1,
        "title": "Sample Todo",
        "description": "This is a sample todo",
        "completed": false,
        "created_at": "2023-08-20T10:30:00"
    }
]
2. Get Single Todo
HTTP

GET /todos/{id}
Parameters

id (path parameter): The ID of the todo
Response

JSON

{
    "id": 1,
    "title": "Sample Todo",
    "description": "This is a sample todo",
    "completed": false,
    "created_at": "2023-08-20T10:30:00"
}
3. Create Todo
HTTP

POST /todos
Request Body

JSON

{
    "title": "New Todo",
    "description": "Description of the new todo",
    "completed": false
}
Required Fields

title: String
Optional Fields

description: String
completed: Boolean (defaults to false)
Response

JSON

{
    "id": 2,
    "title": "New Todo",
    "description": "Description of the new todo",
    "completed": false,
    "created_at": "2023-08-20T10:35:00"
}
4. Update Todo
HTTP

PUT /todos/{id}
Parameters

id (path parameter): The ID of the todo
Request Body

JSON

{
    "title": "Updated Todo",
    "description": "Updated description",
    "completed": true
}
Optional Fields

title: String
description: String
completed: Boolean
Response

JSON

{
    "id": 1,
    "title": "Updated Todo",
    "description": "Updated description",
    "completed": true,
    "created_at": "2023-08-20T10:30:00"
}
5. Delete Todo
HTTP

DELETE /todos/{id}
Parameters

id (path parameter): The ID of the todo
Response

Status: 204 No Content
Error Responses
400 Bad Request
JSON

{
    "error": "Title is required"
}
404 Not Found
JSON

{
    "error": "Todo not found"
}

