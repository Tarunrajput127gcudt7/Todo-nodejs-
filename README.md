Steps to Use Postman:
1.Set Base URL:
Base URL hoga: http://localhost:9000

2.Create a New User (Signup):
Endpoint: POST /users/signup
Body (JSON):
{
  "email": "user@example.com",
  "password": "123456",
  "username": "user1",
  "role": "user"
}

Response:
Success message ke sath naya user create hoga.

3.Login User:
Endpoint: POST /users/login
Body (JSON):
{
  "email": "user@example.com",
  "password": "123456"
}
Response:
JWT token milega, jo automatically cookie mein save ho jayega.

4.Add a Todo (Protected Route):

Pehle login karke JWT token ko cookie ke through send karwana padega (automatic hota hai).
Endpoint: POST /todo/add

Body (JSON):
{
  "title": "My Task",
  "description": "Complete the project",
  "status": "pending",
  "dueDate": "30/09/2024"
}

Response:
Todo successfully create ho jayega.

5.Fetch All Todos:
Endpoint: GET /todo/all
Response:
Sare todos fetch ho jayenge.

6.Fetch a Specific Todo:
Endpoint: GET /todo/one/:id
Example: GET /todo/one/64f7c7a8c93f8b1b2f4a1f26
Response:
Specific todo ki details milengi.

7.Update a Todo (Protected Route):
Endpoint: PATCH /todo/one/:id
Body (JSON):
{
  "status": "completed"
}
Response:
Todo updated successfully.

8.Delete a Todo:
Endpoint: DELETE /todo/one/:id
Response:
Todo deleted successfully.

Error Handling:
Agar koi galti hoti hai (e.g., token nahi milta ya validation fail hoti hai), 
toh aapko JSON response mein error message milta hai:

{
  "message": "Error message here"
}

Summary:
npm install se dependencies install karein.
Ensure karein ki MongoDB service chal rahi ho.
node server.js command se server start karein.
Postman ke through APIs ko test karein using the routes mentioned above.






