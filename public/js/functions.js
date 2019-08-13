function modifyEntry(event, elem) {
  
    var elementId = $(elem).attr("id");
    var parts = elementId.split("_");
    var operation = parts[0];
    var id = parseInt(parts[1]);
  if(operation == 'delete'){
    if(confirm("Click OK to delete item from database.")){ 
      $.ajax({
        method: "post",
           url: "/api/deleteAircraft",
          data: {"id": id},
       success: function(){location.reload(true)}
       
      })
   }
  }else{
    location.href="/modifyAircraft?id=" + id;
       }
}   
function addCart(event, elem) {
      var elementId = $(elem).attr("id");
      var parts = elementId.split("_");
      var id = parseInt(parts[1]);
  $.ajax({
    method:"post",
    url:"/api/cartSession",
    success: function(){
    console.log("in success")
            $.ajax({
            method: "post",
               url: "/api/addCart",
              data: {"id": id},
           success: function(){
         

                   }
         
           }) 
  }
  })  
}   

function deleteCart(event, elem) {
    var elementId = $(elem).attr("id");
    var parts = elementId.split("_");
    var id = parseInt(parts[1]);
    if(confirm("Click OK to delete item from database.")){ 
      $.ajax({
        method: "post",
           url: "/api/deleteCart",
          data: {"id": id},
       success: function(){location.reload(true)}
       
      })
     
       }
}   
