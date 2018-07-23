# Set Up Devise with React.js and Sessions

- from command line - rails new [project name] --webpack=react --database=postgresql -T
- you can add "--skip-sprockets" directive to disabling the asset pipeline (if you want to solely use webpack 
instead) but it will fail on heroku by default so further action is required if you want to go this route.

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

# If you want to move all JS to webpack (not recomended as problems with heroku deployment)
- remove the following gems from the gemfile
```
gem 'sass-rails'
gem 'uglifier'
gem 'coffee-rails'
gem 'turbolinks'
```
- add the node packages
```
yarn add rails-ujs turbolinks
```
- in app/javascript/packs/application.js
```
import Rails from 'rails-ujs'
import Turbolinks from 'turbolinks'

Rails.start()
Turbolinks.start()
```
- to add bootstrap (you need jquery at the moment):-
```
yarn add jquery bootstrap@4.0.0 popper.js
``` 
- in app/config/webpack/environment.js
```
const webpack = require('webpack')

environment.plugins.set('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  Popper: ['popper.js', 'default']
}))
```
- import bootstrap in  app/javascript/packs/application.js
```
import 'bootstrap/dist/js/bootstrap'
```
- in app/javascript/src/styles/app.scss
```
@import '~bootstrap/scss/bootstrap';
```
- to see full instructions
https://medium.com/@coorasse/goodbye-sprockets-welcome-webpacker-3-0-ff877fb8fa79

- Note
- if you use scss from rails you need to refresh the browser to see changes but from react it's automatic
- advantages of using rails is that gems are easy to install for scss

- copy directories and files from app/javascript/src/api and app/javascript

# Add Devise and rails serializer
- in gem file:
 ```
gem 'devise' 
gem 'active_model_serializers', '~> 0.9.7'
 ```
 - bundle install
 - from command line:
```
rails generate devise:install
```
- in config/environments/development.rb:-
```
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

```
- in config/application.rb
```
...
config.to_prepare do
  DeviseController.respond_to :html, :json
end
...
```
- create an api_controller.rb file in controllers dirctory as follows:
```
class ApiController < ActionController::API
  include ::ActionController::Serialization
  respond_to :json
end
``` 
- add an 'api' sub directory to the 'controllers' directory
- on command line:-
```
rails generate devise User
rails g controller api/Auth index
```
- change the AuthController class to:
```
class Api::AuthController < ApiController
```
- in routes.rb
```
devise_for :users, defaults: { format: :json }

namespace :api, defaults: { format: :json } do

  scope :auth do
    get 'is_signed_in', to: 'auth#index'
  end
end
```
- also add (to the bottom) a catch all route
```
get '*path', to: 'init#index'
```
- in app/controllers/application_controller.rb - change exception to null_session:
```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
end
```

- note, in app/javascript/src/api/init.js that axios uses "withCredentials: true" and the csrf function (used in 
app/javascript/src/api/init.js)

- also note that everything in app/javascript/src/components is for testing the sign in sign out sign up process
 
# to start the server run the following command

foreman start -f Procfile.dev -p 3000
