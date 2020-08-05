require 'sinatra'
require 'pg'
require 'pry'


class Item
    attr_accessor :name, :cost, :check
    def initialize(name,cost,check)
      @name = name
      @cost = cost
      @check = check
    end
end

$wish_list_items = []
$budget = 2250


get '/username' do
  erb :user_index
end

#search input
post '/search' do
  $username = params[:username]
  redirect "/wishlist?username=" + params[:username]
end



#user wishlist show
get '/wishlist' do
  $wish_list_items = []
  begin
    con = PG.connect :dbname => 'wish_list_factory'
    user_wishlist = con.exec "SELECT item_name, item_costs, checked FROM users INNER JOIN wish_list_items ON wish_list_items.user_id = users.user_id WHERE username = '#{params[:username]}' ORDER BY item_costs DESC"
    user_wishlist.each do |wish|
      item = Item.new(wish['item_name'],'$'+wish['item_costs'],wish['checked'])
      $wish_list_items.push(item)
    end

  rescue PG::Error => e
    puts e.message
  ensure
    user_wishlist.clear if user_wishlist
    con.close if con
  end

  erb :wishlist
end


#back to menu
post '/back' do
  redirect '/username'
end


#optimize
post '/optimizer' do
  budget = $budget
  begin
    con = PG.connect :dbname => 'wish_list_factory'
    con.exec "UPDATE wish_list_items SET checked = '0'"
    user_wishlist_ASC = con.exec "SELECT item_id, item_costs, checked FROM users INNER JOIN wish_list_items ON wish_list_items.user_id = users.user_id WHERE username = '#{params[:username]}' ORDER BY item_costs ASC"
    user_wishlist_ASC.each do |wish|
      if budget - wish['item_costs'].to_i >= 0
        con.exec "UPDATE wish_list_items SET checked = '1' WHERE item_id = #{wish['item_id']}"
        budget -= wish['item_costs'].to_i
      end
    end


  rescue PG::Error => e
    puts e.message
  ensure
    user_wishlist_ASC.clear if user_wishlist_ASC
    con.close if con
  end

  redirect "/wishlist?username=" + params[:username]
end


#create item
post '/create_items' do
  @name = params[:name]
  @cost = params[:cost]
  begin
    con = PG.connect :dbname => 'wish_list_factory'
    user_id =  con.exec "SELECT user_id FROM users WHERE username = '#{params[:username]}'"
    user_id = user_id.values.first.first.to_i
    id_item = con.exec "SELECT count(item_name) FROM users INNER JOIN wish_list_items ON wish_list_items.user_id = users.user_id WHERE username = '#{params[:username]}'"
    id_item = id_item.values.first.first.to_i
    con.exec "INSERT INTO wish_list_items (item_id, item_name, item_costs, user_id) VALUES(#{id_item + 1},'#{@name}','#{@cost}',#{user_id})"

  rescue PG::Error => e
    puts e.message
  ensure
    con.close if con
  end

  redirect "/wishlist?username=" + params[:username]
end

post '/reset' do
  begin
      con = PG.connect :dbname => 'wish_list_factory'
      user_id =  con.exec "SELECT user_id FROM users WHERE username = '#{params[:username]}'"
      user_id = user_id.values.first.first.to_i
      con.exec "DELETE FROM wish_list_items WHERE user_id = #{user_id}"

  rescue PG::Error => e
    puts e.message
  ensure
    con.close if con
  end

  redirect "/wishlist?username=" + params[:username]
end


