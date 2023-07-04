({
    loadPositions: function(component, event, helper) {
        var action = component.get("c.getImages");
        action.setParams
        ({
            vid: '01t5i000005nv4yAAA'
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.positions", response.getReturnValue());
            } else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    }
});