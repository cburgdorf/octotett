Ext.define("QuartettApp.helper.Helper", {
    singleton: true,
    xtype: "helper",
    cardsToArrayOfKeyValuePairs: function(value){
        var tempArray = [];
        Ext.Object.each(value, function(key, val){
            if (val.displayName){
                tempArray.push({
                    key: val.displayName,
                    value: val.displayValue
                });
            }
        });
        return tempArray;
    }
});
