class User < ApplicationRecord
  has_many :orders, dependent: :destroy
  has_many :carts, -> { order "id" }
  has_many :items, through: :carts

  has_secure_password

  validates :email, uniqueness: true
end
