//<debug>
Ext.Loader.setConfig('disableCaching', false);
//</debug>

Ext.Loader.setPath({
    'Ext.ux': 'libs/ux'
});

Ext.require([
    'QuartettApp.services.TestService'
]);

//we need to have an instance of this service early in the process so that
//it can be accessed from within the init method of the controllers
QuartettApp.TestService = Ext.create('QuartettApp.services.TestService');

Ext.application({
    name: 'QuartettApp',

    requires: [
        'Ext.MessageBox'
    ],

    controllers: ['GameController'],
    views: ['Main'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
       // Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('QuartettApp.view.Main'));

        //this.redirectTo('start')
        //WTF redirectTo causes the route to run twice while this works
        window.location = '#start';
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
