class OrdersController < ApplicationController
  def index
    render json: Order.all
  end

  def show
    render json: Order.find(params[:id])
  end

  def create
    order = Order.create!(params.permit(:user_id, :order, :first_name, :last_name, :email, :address, :address2, :country, :city, :state, :postcode, :card_name, :card_number, :expiry_date, :security_code))
    render json: order, status: :created
  end
end
