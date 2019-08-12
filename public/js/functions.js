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
//  $.ajax({
//         method: "get",
//            url: "/api/modifyAircraft",
//           data: {"id": id},
//        success: function(results){
          
//         $.ajax({
//         method: "get",
//            url: "/dataEntry",
//           data: {"results": results},
//              })
        
         
         
       }
//       })
//   }
  


}   

// function dollarsToXX(dollars) {
                        
// }
