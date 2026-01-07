## MERN CRUD Task with MongoDB
This project demonstrates CRUD operations (Create, Read, Update, Delete) using Node.js, Express, and MongoDB.

---

## CRUD Process Documentation

#### Create (Insert) Users
- Method: POST
- Route: `/api/user/create`
- Inserts a new user into the `users` collection.
-  Request:
```json
{
    "name": "harsh",
    "email": "harsh21@mail.com",
    "age": 15
}
```
- Response

```json
{
    "success": true,
    "message": "User created successfully",
    "data": {
        "name": "harsh",
        "email": "harsh21@mail.com",
        "age": 15,
        "role": "user",
        "_id": "695eb31fa31ad4601a2b79a3",
        "__v": 0
    }
}
```

- Screenshot
![create_user](public/screenshots/create_user.png)

---

#### Get All Users
- Method: GET
- Route: `/api/user/get-users`
- Description: Fetch all users.
- Response:
```json
{
    "success": true,
    "message": "Users found",
    "users": [
        {
            "_id": "695eb2fca31ad4601a2b79a0",
            "name": "harsh",
            "email": "harsh@mail.com",
            "age": 1,
            "role": "admin",
            "__v": 0
        },
        {
            "_id": "695eb31fa31ad4601a2b79a3",
            "name": "harsh",
            "email": "harsh21@mail.com",
            "age": 15,
            "role": "user",
            "__v": 0
        }
    ]
}
```
---

#### Get Users By Age Condition

- Method: GET
- Route: `/api/user/get-users/age?age=12`
- Description: Fetch users with age greater than the provided value.
- Query Parameter: age (required, number)
- Response:
```json
{
    "success": true,
    "count": 1,
    "data": [
        {
            "_id": "695eb31fa31ad4601a2b79a3",
            "name": "harsh",
            "email": "harsh21@mail.com"
        }
    ]
}
```
- Screenshot
![get_user_by_condition](public/screenshots/get_user_by_condition.png)

---

#### Get Sorted Users
- Method: GET
- Route: `/api/user/get-users/sorted?sortBy=age&order=asc`
- Description: Fetch users sorted, paginated, and filtered.
- Query Parameters:
- sortBy (default: age) → age, name, email, role
- order (default: desc) → asc / desc
- page (default: 1)
- limit (default: 5)
- Response
```json
{
    "success": true,
    "totalUsers": 2,
    "currentPage": 1,
    "totalPages": 1,
    "data": [
        {
            "_id": "695eb2fca31ad4601a2b79a0",
            "name": "harsh",
            "email": "harsh@mail.com",
            "age": 1,
            "role": "admin",
            "__v": 0
        },
        {
            "_id": "695eb31fa31ad4601a2b79a3",
            "name": "harsh",
            "email": "harsh21@mail.com",
            "age": 15,
            "role": "user",
            "__v": 0
        }
    ]
}
```
---

#### Update User Role

- Method: PATCH
- Route: `/api/user/role/harsh21@gmail.com`
- Description: Update the role of a specific user.
- Request:
```json
{
    "role": "admin"
}
```
- Response:
```json
{
    "success": true,
    "message": "User role updated successfully",
    "user": {
        "_id": "695eb31fa31ad4601a2b79a3",
        "name": "harsh",
        "email": "harsh21@mail.com",
        "age": 15,
        "role": "admin",
        "__v": 0
    }
}
```
- Screenshot
![update_user_role](public/screenshots/update_user_role.png)

---

#### Increment Age For All Users

- Method: PATCH
- Route: `/api/user/increment-age`
- Description: Increment age field of all users by 1.
- Response:
```json
{
    "success": true,
    "message": "Age incremented by 1 for all users",
    "matchedCount": 2,
    "modifiedCount": 2
}
```
- Screenshot
![age_increment](public/screenshots/age_increment.png)

--- 

#### Delete User By Email

- Method: DELETE
- Route: `/api/user/harsh@mail.com`
- Description: Delete a single user based on email.
- Response:
```json
{
    "success": true,
    "message": "User deleted successfully"
}
```
- Screenshot:
![delete_by_email](public/screenshots/delete_by_email.png)

---

#### Delete Users Above Certain Age

- Method: DELETE
- Route: `/api/user-above-age?age=20`
- Description: Delete all users with age greater than provided value.
- Response:
```json
{
    "success": true,
    "message": "Users above age 20 deleted successfully"
}
```
- Screenshot:
![delete_above_age](public/screenshots/delete_above_age.png)

---

#### Drop User Collection

- Method: DELETE
- Route: /api/users/drop
- Description: Drops the entire users collection.
- Warning: This deletes all data permanently.
- Response:
```json
{
    "success": true,
    "message": "User collection dropped successfully"
}
```
- Screenshot:
![delete_collection](public/screenshots/delete_collection.png)


---

## Getting Started 
```bash
# 1. Clone the repository
git clone https://github.com/Harsh091234/its_mfs.git

# 2. Move to its_mfs
cd its_mfs

# 3. Install backend dependencies
pnpm --filter ./apps/Domain4_HarshSharma_Assignment_3 install
 
# 4. Create .env file in Domain4_HarshSharma_Assignment_3 folder
# (see .env setup below)

# 5. Start backend dev server 

pnpm --filter ./apps/Domain4_HarshSharma_Assignment_3 dev


🔒 .env Setup
MONGO_URI=your_mongodb_uri
PORT=3000