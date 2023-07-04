({
    init: function(cmp, evt, helper) {
        var myPageRef = cmp.get("v.pageReference");
        var token = myPageRef.state.c__token;
        var table = myPageRef.state.c__table;
        var csn = myPageRef.state.c__csn;
        var id = myPageRef.state.c__id;
        var cname = myPageRef.state.c__cname;
        
        cmp.set("v.token", token);
        cmp.set("v.table", table);
        cmp.set("v.id", id);
         cmp.set("v.cname", cname);
        cmp.set("v.csn",csn)  
    }
})