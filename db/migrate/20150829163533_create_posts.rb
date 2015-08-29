class CreatePosts < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :name
      t.string :body
      t.timestamps null: false
    end
  end
end
