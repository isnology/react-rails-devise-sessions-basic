# Set Up Devise with React.js and Sessions

 - from the command line: 
 ```
 yarn add js-cookie
 ```
 - add the following to the gem file: 
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
OR
- in controllers/application_controller.rb
```
respond_to :json
```  
- in routes.rb
```
devise_for :users, defaults: { format: :json }
```