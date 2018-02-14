# Set Up Devise with React.js and Sessions

- from command line - rails new [project name] --webpack=react --database=postgresql -T

- create a Procfile.dev in the root directory of the app and add the following lines to it.
```
web: bundle exec rails s
webpacker: ./bin/webpack-dev-server
```
- if you don't have foreman installed then install into your home directory (out side your app) as follows:-
```
gem install foreman
```
- back inside your app...
- from command line:-
```
rails g controller init index
``` 
- edit config/routes.rb and add:-
```
root "init#index"
```
- edit app/views/init/index.html.erb and replace with the following:-
```
<div id="root"></div>
<%= javascript_pack_tag 'application' %>
```
- create app/javascript/src directory
- delete app/javascript/packs/hello_react.jsx
- edit app/javascript/packs/application.js and replace with:-
```
console.log('Hello World from Webpacker')
import "../src"
```
- create app/javascript/src/index.js and add the following in it:-
```
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```
- from command line:- 
```
yarn add react-router-dom
```
- copy everything from app/javascript/src (including the directories) to your project
- rename app/assets/stylesheets/application.css to application.scss
- copy contents of app/assets/stylesheets/application.scss to your project

# OR you can use scss within react by:-
- create app/javascript/src/styles directory
- create app/javascript/src/styles/app.scss file
- add contents as above
- add the following import to app/javascript/src/App.js
```
import './styles/app.scss'
```
- in app/views/init/index.html.erb add the following line:-
```
<%= stylesheet_pack_tag 'application' %>
``` 
so it looks like this:-
```
<div id="root"></div>
<%= javascript_pack_tag 'application' %>
<%= stylesheet_pack_tag 'application' %>
```
- Note
- if you use scss from rails you need to refresh the browser to see changes but from react it's automatic
- advantages of using rails is that gems are easy to install for scss

- copy directories and files from app/javascript/src/api and app/javascript

# Add Devise
- in gem file:
 ```
gem 'devise' 
 ```
 - bundle install
 - from command line:
```
rails generate devise:install
```
- in config/application.rb
```
...
config.to_prepare do
  DeviseController.respond_to :html, :json
end
...
```
- in routes.rb
```
devise_for :users, defaults: { format: :json }
```
- in app/controllers/application_controller.rb - change exception to null_session:
```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
end
```

- note, in app/javascript/src/api/init.js that axios uses "withCredentials: true" and the csrf function (used in 
app/javascript/src/api/auth.js)

- also note that everything in app/javascript/src/components is for testing the sign in sign out sign up process
 
# to start the server run the following command

foreman start -f Procfile.dev -p 3000
