# Daily-Shopping-backend

## Available Scripts

In the project directory, you can run:

### `npm run dev` 

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The application is supported by `nodemon` tool that helps develop node.js based application by automatically restarting the node application when file changes in the directory are deteced. 
You will also see any lint errors in the console.

### `npm run build`

With this script you can build application for production mode. After script is runned it will create build directory in the project root strucure.

## The application is dockerizing using separate Docker containers, one for Node.js and other one for database, for this case MongoDB. 

For raise up containers we need to run 

``` docker-compose up```

If we need to see which container is rasied up we need to run

``` docker ps```

If we did some changes then we need to run 

```  docker-compose build```

to rebuild those changes and repeat process.

## API documentation

Navigate to http://localhost:8080/api/auth/status in your browser to confirm that the app is up and running.

The response should look like similar to the following:
```
{"version":"1.0.0"}
```
# User registration

* **localhost:8080**
  /api/auth/signup
  
*  **Method:**
   `POST`

* **Data Params**
  
  **Required:**
  
  `username=[string], password=[string]`

* **Success Response:**
  * **Code:** 201 <br/>
    **Content:** `{user: {
     id,username, password, createdAt, updatedAt 
    }}`  

 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "User validation faild" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
    
# User login

* **localhost:8080**
  /api/auth/signin
  
*  **Method:**
   `POST`

* **Data Params**
  
  **Required:**
  
  `username=[string], password=[string]`

* **Success Response:**
  * **Code:** 200 <br/>
    **Content:** `{token, user: {
     id,username, password, createdAt, updatedAt 
    }}`  

 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "User validation faild" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

# User change password

* **localhost:8080**
  /api/auth/reset-password
  
*  **Method:**
   `POST`
   
* **URL Params**
  **Required:**
  
  `token=[integer]`

* **Data Params**
  
  **Required:**
  
  `token=[string], newPassword=[string]`

* **Success Response:**
  * **Code:** 200 <br/>
    **Content:** `{status: {
     "Password changed!" 
    }}`  

 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "User validation faild" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

# Create list

* **localhost:8080**
  /api/auth/create-list
  
*  **Method:**
   `POST`

*  **URL Params**

   **Required:**
 
   `token=[integer]
   
* **Data Params**
  
  **Required:**
  
  `listName=[string], userId=[string], 
  articles=[
    {
      articleName=[string],
      amount=[number]
    }
  ]`

* **Success Response:**
  * **Code:** 201 <br/>
    **Content:** `{user: {
     id,listName, articleName, amount, createdAt, updatedAt 
    }}`  

 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Error create list" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
  
   OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "jwt expired." }`
    
# Update list

* **localhost:8080**
  /api/auth/edit/:id
  
*  **Method:**
   `PATCH`
   
* **URL Params**
  **Required:**
  
  `token=[integer]`

*  **Path Params**

   **Required:**
 
   `id=[string]
   
* **Data Params**
  
  **Required:**
  
  `listName=[string], userId=[string], 
  articles=[
    {
      articleName=[string],
      amount=[number]
    }
  ]`

* **Success Response:**
  * **Code:** 202 <br/>
    **Content:** `{message: {
     List was updated successfully.
    }}`  

 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Error updating list with id" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
  
  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "jwt expired." }`
    
# Delete list

* **localhost:8080**
  /api/auth/delete/:id
  
*  **Method:**
   `DELETE`
   
* **URL Params**
  **Required:**
  
  `token=[integer]`
  
*  **Path Params**

   **Required:**
 
   `id=[string]

* **Success Response:**
  * **Code:** 200 <br/>
    **Content:** `{message: {
     List delete successfully.
    }}`  

 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Error deleting list with id" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
  
  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "jwt expired." }`
    
# Get user lists

* **localhost:8080**
  /api/auth
  
*  **Method:**
   `GET`
   
* **URL Params**
  **Required:**
  
  `token=[integer]`

*  **Path Params**

   **Required:**
 
   `id=[string]

* **Success Response:**
  * **Code:** 200 <br/>
    **Content:** `{message: {
     lists
    }}`  

 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Error getting list with id" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
  
  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "jwt expired." }`
