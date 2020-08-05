
require 'sinatra'

class Item
    attr_accessor :name, :cost, :check
    def initialize(name,cost,check)
      @name = name
      @cost = cost
      @check = check
    end
end

item1 = Item.new('Ruby Metaprogramming Book','$500',false)
item2 = Item.new('MacBook Pro','$1300',false)
item3 = Item.new('Electric Bike','$670',false)
item4 = Item.new('Sennheiser Headphones','$180',false)
item5 = Item.new('home Brew Beer Kit','$320',false)

$wish_list_items = [item1,item2,item3,item4,item5]
$budget = 2250

get '/wishlist' do
  erb :wishlist
end

post '/optimizer' do
  budget = $budget
  $wish_list_items = $wish_list_items.sort_by { |x| [(x.cost[1..]).to_i] }
  $wish_list_items = $wish_list_items.each do |x|
    x.check = false
    x.check = true if budget- (x.cost[1..]).to_i >= 0
    budget -= (x.cost[1..]).to_i
  end
  $wish_list_items = $wish_list_items.reverse
  redirect '/wishlist'
end

post '/create_items' do
  @name = params[:name]
  @cost = params[:cost]
  item = Item.new(@name,'$'+@cost,false)
  $wish_list_items.push(item)
  redirect '/wishlist'
end


