({
    init: function(cmp, evt, helper) {
        var myPageRef = cmp.get("v.pageReference");
          var order = myPageRef.state.c__order;
       var ordername = myPageRef.state.c__ordername;
          cmp.set("v.order", order);
        cmp.set("v.ordername", ordername);
     
  
      
    }
})