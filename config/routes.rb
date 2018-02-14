Rails.application.routes.draw do
  
  root "init#index"
  devise_for :users, defaults: { format: :json }
  scope :auth do
    get 'is_signed_in', to: 'auth#index'
  end
  get '*path', to: 'init#index'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
