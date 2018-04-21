#!/usr/bin/env ruby
require 'sinatra'
require 'sinatra/json'
require 'sinatra/reloader' if development?

require 'active_record'

ActiveRecord::Base.configurations = YAML.load_file('database.yml')
ActiveRecord::Base.establish_connection(:development)

class Comment < ActiveRecord::Base
end

after do
  ActiveRecord::Base.connection.close
end

get '/' do
  slim :index
end

post '/comment' do
  Comment.create(
    body: params[:body],
    user_name: params[:user_id]
  )
end

get '/comments' do
  posts = Comment.order('id')
  json posts
end

get '/comments/last' do
  comment = Comment.last
  json comment
end
