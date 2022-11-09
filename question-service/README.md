# Question Service
Question service provides the collab service with the coding questions

## Question object
Each question has 3 field: 
1. id (string) - identical to the object id on creation
2. difficulty (string) - the difficulty of the question
3. content (string) - the question content to be solved

## API endpoints
### Create Question (blocked during deployment)
__Endpoint:__ _url_/service/create/question  
__request body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"difficulty": "hard",  
&nbsp;&nbsp;&nbsp;&nbsp;"content: "this is a hard question",
&nbsp;&nbsp;&nbsp;&nbsp;"answer: "this is the answer to hard question"  
&nbsp;&nbsp;}  
__response body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"message": "Created question successfully!",  
&nbsp;&nbsp;}  
__error body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"Error": "_Whatever the error is_",  
&nbsp;&nbsp;}

<br>

### Delete Question (blocked during deployment)
__Endpoint:__ _url_/service/delete/question  
__request body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"id": "0123456789",  
&nbsp;&nbsp;}  
__response body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"message": "Question deleted successfully!",  
&nbsp;&nbsp;}  
__error body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"Error": "_Whatever the error is_",  
&nbsp;&nbsp;}

<br>

### Get limit
__Endpoint:__ _url_/service/get/limit  
__request body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"difficulty": "hard",  
&nbsp;&nbsp;}  
__response body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"limit": 5,  
&nbsp;&nbsp;}  
__error body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"Error": "_Whatever the error is_",  
&nbsp;&nbsp;}

### Get random id
__Endpoint:__ _url_/service/get/random-id  
__request body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"difficulty": "hard",  
&nbsp;&nbsp;}  
__response body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"id": "0123456789",  
&nbsp;&nbsp;}  
__error body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"Error": "_Whatever the error is_",  
&nbsp;&nbsp;}

### Get question content
__Endpoint:__ _url_/service/get/question-content  
__request body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"id": "0123456789",  
&nbsp;&nbsp;}  
__response body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"content": "This is a hard question",  
&nbsp;&nbsp;}  
__error body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"Error": "_Whatever the error is_",  
&nbsp;&nbsp;}

### Get question answer
__Endpoint:__ _url_/service/get/question-answer  
__request body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"id": "0123456789",  
&nbsp;&nbsp;}  
__response body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"answer": "This is the answer to hard question",  
&nbsp;&nbsp;}  
__error body:__  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;"Error": "_Whatever the error is_",  
&nbsp;&nbsp;}
