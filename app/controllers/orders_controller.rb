class OrdersController < ApplicationController
  def index
    render json: Order.all
  end

  def show
    render json: Order.find(params[:id])
  end

  def create
    order = Order.create!(params.permit(:user_id, :item_id, :quantity, :price, :total))
    render json: order, status: :created
  end

  def destroy
    Order.find(params[:id]).destroy
    head :no_content
  end
end
