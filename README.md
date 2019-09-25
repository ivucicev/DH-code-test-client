# DHCodeTestClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

# How To start the server?

Make sure your server is running on `http://localhost:3000`, 

then

```sh
    $ npm install
    $ ng s
```
should be enough,

if there is env difference, Ive added docker configuration so this app can run in its own container. It builds nodejs stuff then as a second step uses only nginx reverse proxy image where 
runs static files so its ultra lightweight

## login

Used forms are reactive forms, and validations for form inputs are over Validators function from reactive forms.
Before you log in you should sign up cause there are no hardcoded or seeded users.
after successfull login you should be redirected to encoding page

## register

Also im using reactive forms, validations are also from reactive forms, backend validations are from mongoose schema validator.
If someone enables submit button, it still wont submit because I double check submission, but if someone posts from example postman
validations are also there on server side, as always server side validations are must, on frontend they are nice to have...
after success register you should be redirected to sign in 

## encoding

Encoding is plain simple, it accepts everything but server validates only strings with alphabetic characters, returns encoding result as modal

## logout

dispatches logout action, sets initial state


## Security

Routing guards are set for route for `'encoder/encode'` you cant navigate to it unless you have valid session
Also if you are already logged in logIn success action should be dispatched and you should be redirected to `'encoder/encode` route

Http interceptor is used for making sure that api prefix is prepended to the called http route
Http interceptor is also used to inject authorization header to the request
Http interceptor is also making sure that withCredentials: true is used so angular app accepts CORS cookie...

# What could be done better

First I didnt see at the end of the email that ngRx is requirement, so I started without it and added it later for auth part of the application, 
currently is used only for auth stuff for tracking state of auth components, 

I could use NgRX on encoding part, and save history that way, and have the encoding results in state, but seemd that its enough for it to be stateless.

Also loading should be as global spinner or something, and loading should be triggerd as state also with NgRx, but currently it is not that way.

Same goes for the toaster messages, currently they are triggered for errors and success from effects, abut they could also be global and 
show messages depending on the current state of error message or success message.

UI Should be better thats for sure.

Angular material is used for UI and it should be used a little bit different, I should create AngularMaterialShared module or something similar for reusing all material components, currently 
all of its components are in sharedModule

Routing guards should use state to determine if user is authenticated, currently they are using auth service for it...

Maybe there is no need for modules lazy loading...

Folder structure also could be bit better organized.

Should use not master branch for development... 
Could set TravisCI or CircleCI or Github actions for code deployment

Should change angular app name, so creating component with scaffolding adds prefix to the names, but could think of good name for the app...

Time taken for this project with interruptions was about 3h

# Why do you have to deal with 2 repos one Frontend other Backend instead of one

Cause its much easier to setup CI & Docker, and split work from front to end, seems to be bit more tidy

If for this project purposes it should be other way, let me know so I can move it to the same repo

