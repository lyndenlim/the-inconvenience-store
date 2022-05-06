Rails.application.routes.draw do
  resources :carts
  resources :items
  resources :orders
  resources :users

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
