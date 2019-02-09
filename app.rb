#!/usr/bin/env ruby
require 'sinatra'
require 'sinatra/json'
require 'sinatra/reloader' if development?

require 'active_record'

ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || 
                                        "adapter" => "sqlite3",
                                        "database" => "./bbs.db"
                                       )

class Comment < ActiveRecord::Base
end

after do
  ActiveRecord::Base.connection.close
end

get '/' do
  slim :index
end

post '/comment' do
  Comment.create({
    body: params[:body],
    name: params[:user_id]
  })
end

get '/comments' do
  posts = Comment.order('id')
  json posts
end

get '/comments/last' do
  comment=Comment.last
  json comment
end
