class OrdersController < ApplicationController
  def index
    render json: Order.all
  end

  def show
    render json: Order.find(params[:id])
  end

  def create
    order = Order.create!(params.permit(:user_id, :first_name, :last_name, :email, :address, :address2, :city, :state, :postcode, :card_name, :card_number, :expiry_date, :security_code, :order_number, :shipping_cost, :order_total, all_items: [:id, :price, :quantity, :total, :user_id, { item: [:id, :name, :price, :category, :description, photos: []] }]))
    render json: order, status: :created
  end
end
