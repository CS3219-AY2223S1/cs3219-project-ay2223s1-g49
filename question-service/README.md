# Question Service
Question service provides the collab service with the coding questions

## Question object
Each question has 3 field: 
1. id (string) - identical to the object id on creation
2. difficulty (string) - the difficulty of the question
3. content (string) - the question content to be solved

## API endpoints
### Create Question
__Endpoint:__ _url_/service/create/question  
__request body:__  
{  
&nbsp;&nbsp;"difficulty": "hard,  
&nbsp;&nbsp;"content: "this is a hard question"  
}  
__response body:__  
{  
&nbsp;&nbsp;"message": "Created question successfully!",  
}  
__error body:__  
{  
&nbsp;&nbsp;"Error": "_Whatever the error is_",  
}

<br>

### Delete Question
__Endpoint:__ _url_/service/delete/question  
__request body:__  
{  
&nbsp;&nbsp;"id": "0123456789",  
}  
__response body:__  
{  
&nbsp;&nbsp;"message": "Question deleted successfully!",  
}  
__error body:__  
{  
&nbsp;&nbsp;"Error": "_Whatever the error is_",  
}

<br>

### Get limit
__Endpoint:__ _url_/service/get/limit  
__request body:__  
{  
&nbsp;&nbsp;"difficulty": "hard",  
}  
__response body:__  
{  
&nbsp;&nbsp;"limit": 5,  
}  
__error body:__  
{  
&nbsp;&nbsp;"Error": "_Whatever the error is_",  
}

### Get random id
__Endpoint:__ _url_/service/get/random-id  
__request body:__  
{  
&nbsp;&nbsp;"difficulty": "hard",  
}  
__response body:__  
{  
&nbsp;&nbsp;"id": "0123456789",  
}  
__error body:__  
{  
&nbsp;&nbsp;"Error": "_Whatever the error is_",  
}

### Get question content
__Endpoint:__ _url_/service/get/question-content  
__request body:__  
{  
&nbsp;&nbsp;"id": "0123456789",  
}  
__response body:__  
{  
&nbsp;&nbsp;"content": "This is a hard question",  
}  
__error body:__  
{  
&nbsp;&nbsp;"Error": "_Whatever the error is_",  
}