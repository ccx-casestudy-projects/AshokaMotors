({
    init: function(cmp, evt, helper) {
        var myPageRef = cmp.get("v.pageReference");
        var token = myPageRef.state.c__token;
     
        cmp.set("v.token", token);
     
        
    }
})