$(function(){
 $("#submit-comment").click(function(){
  var comment=$("#comment-body").val();
  var userId=$("#user-name").val();
  if(userId.length == 0){
   userId="NONAME";
  }
  if(comment.length==0){
   $("#error").text("内容が空の場合は投稿できません");
   return;
  }
  console.log(comment.length);
  var request=$.ajax({
    type: "POST",
    url: "/comment",
    data: {
     body: comment,
     user_id: userId
    }
  });

  request.done(function(){
   $.ajax({
     type: "GET",
     url: "/comments/last",
     dataType: "json"
   }).done(function(res){
   var c=make_post_content(res);
   $("#comments").prepend(c);
   $("#error").text("");
   $("#comment-body").val("");
   $("#user-name").val("");
   });
  });
 });

 $.ajax({
   type: "GET",
   url: "/comments"
 }).done(function(datas){
  datas.forEach(function(data){
   var c=make_post_content(data);
   $("#comments").prepend(c);
  });
 });


});

function make_post_content(res){
 var comment=$(document.createElement("div")).addClass("comment");
 var name=$(document.createElement("div")).addClass("comment-name").text("名前: "+res.name);
 var content=$(document.createElement("div")).addClass("comment-content").text(res.body);
 var content_text=content.html();
 content.html(content_text.replace(/\n/mg,"<br>"));
 var d=new Date(res.created_at);
 d.setTime(d.getTime()+9*60*60*1000);
 var date=$(document.createElement("div")).addClass("comment-date").text(d.toLocaleString());
 comment.append(name);
 comment.append(content);
 comment.append(date);

 return comment;
};
