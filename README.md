Freshcode Jobs Admin Panel
==========================

Installation:
-------------
```
$ npm install
$ npm start
```
For subsequent running use only **$ npm start**

Technologies:
-------------
**Multer** is a node.js middleware for handling multipart/form-data, which is used for uploading files.

**ng-file-upload** is a angularjs module for displaying uploaded pictures.

**PassportJS** is used for save authentication.

### Password:

For hashing passwords the API uses **npm bcryptjs**. 
If you want to add new use for login you have to use next code (*You can add this code in file ./app/passport.js*)

```
var salt = bcrypt.genSaltSync("");
var hash = bcrypt.hashSync("yourPasswordHere", salt);
console.log(hash);
```

*var* **hash** will store your crypted password. 
Then you need to add new user in file *./app/users.json*
```
{
    "username": "Enter username here",
    "password": "Hashed password",
    "token": "Random symbols",
    "byToken": false
}
```

API
---
### Work with data
**/getAllVacancies**
> - type: **POST**
> - receives: **nothing**
> - return type: **JSON**
> - return data: **list of all vacancies with their description**

**/getAllReviews**
> - type: **POST**
> - receives: **nothing**
> - return type: **JSON**
> - return data: **list of all reviews on page "employees' reviews"**

**/getReviewsMain**
> - type: **POST**
> - receives: **nothing**
> - return type: **JSON**
> - return data: **list of all reviews on main page**

**/updateCurrentVacancy**
> - type: **POST**
> - receives: **{vacancy: JSON}**
> - return type: **status code**
> - return data: **none**

**/updateCurrentReview**
> - type: **POST**
> - receives: **{review: JSON}**
> - return type: **status code**
> - return data: **none**

**/updateReviewMain**
> - type: **POST**
> - receives: **{review: JSON}**
> - return type: **status code**
> - return data: **none**

```
{name (must be exactly the same as in description) : value in mentioned type}
```

### Routers

**/**
> - type: **GET**
> - receives: **nothing**
> - redirect to: **admin main page**

**/frame**
> - type: **GET**
> - receives: **nothing**
> - redirect to: **list of vacancies**

**/login**
> - type: **GET**
> - receives: **nothing**
> - redirect to: **login page**

**/login:token**
> - type: **GET**
> - receives: **nothing**
> - redirect to: **login page**

**/logout**
> - type: **GET**
> - receives: **nothing**
> - redirect to: **login page**

**/saveOnGit**
> - type: **GET**
> - receives: **nothing**
> - return: **status code**

