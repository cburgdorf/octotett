Ext.define("QuartettApp.view.Main", {
    extend: 'Ext.tab.Panel',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'QuartettApp.view.GameView'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {   title: 'Play',
                iconCls: 'star',
                xtype: "gameview",
                id: 'gameview'
            },
            {
                title: 'Options',
                iconCls: 'settings',
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'center'
                },
                items:[{html:'coming soon'}]
            }
        ]
    }
});
