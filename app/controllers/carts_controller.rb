class CartsController < ApplicationController
  def index
    render json: Cart.all
  end

  def show
    render json: Cart.find(params[:id])
  end

  def create
    cart = Cart.create!(params.permit(:user_id, :item_id, :quantity, :price, :total))
    render json: cart, status: :created
  end

  def destroy
    Cart.find(params[:id]).destroy
    head :no_content
  end

  def clear
    Cart.destroy_all
    head :no_content
  end
end
