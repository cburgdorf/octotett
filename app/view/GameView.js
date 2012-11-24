Ext.define("QuartettApp.view.GameView", {
    extend: 'Ext.Container',
    xtype: 'gameview',
    requires: [
        'Ext.Container',
        'QuartettApp.helper.Helper',
        'Ext.ux.ImageViewer'
    ],
    config: {
        cardTemplate: new Ext.XTemplate(
            '<div class="card-data">',
                '<div class="left-box">',
                    '<tpl for=".">',
                    '<div class="col">',
                        '<span>{key}</span>' +
                    '</div>',
                    '</tpl>',
                '</div>',
                '<div class="right-box">',
                '<tpl for=".">',
                '<div class="col">',
                    '<span>{value}</span>',
                    //Todo: Currently we hard code those. Would be better to have generic title and subtitle on the card
                    //and render those with a different visual style
                    '<tpl if="key !== \'Name\' && key !== \'Carmaker\'">',
                        '<div data-key="{key}" class="x-button x-button-play"><span data-key="{key}" class="x-button-label">Play!</span></div>',
                    '</tpl>',
                '</div>',
                '</tpl>',
                '</div>',
            '</div>'
        ),
        items: [],
        activePlayer: '',
        layout: 'vbox'
    },
    initialize: function(){
        var me = this;

        me._cardCount = Ext.factory({
            xtype:'container',
            html: '0 cards',
            cls: 'card-counter'
        });

        me._titleBar = me.add({
            docked: 'top',
            xtype: 'titlebar',
            title: 'Play!',
            items:[me._cardCount]
        });

        var imageContainer = me.add({
            style: 'background: white',
            flex: 1,
            layout: {
                type: 'fit'
            }
        });

        me._imageBox = imageContainer.add({
            cls: 'card-image',
            xtype: 'imageviewer'
            //imageSrc: 'resources/images/cardimages/Ferrari_612_Scaglietti_Meilenwerk.jpg'
            //imageSrc: 'resources/images/cardimages/Bentley_Continental_GT_Speed_20090720_front.JPG'
        });

        me._propertyBox = me.add({
            html: 'This is our running game, showing the topmost card',
            docked: 'bottom',
            cls: 'property-grid'
        });

        me.element.on('tap', function(event){
            var $col = Ext.get(event.target);
            var property = $col.getAttribute('data-key');

            if (property){
                me.onPropertyTap(property);
                me.fireEvent('propertyTap', property)
                return
            }
        });
    },
    writeTitle: function(value){
        this._titleBar.setTitle(value);
    },
    writeCardCount: function(value){
        this._cardCount.setHtml(value + ' cards');
    },
    showCard: function(keyValuePairs, card){
        var template = this.getCardTemplate();
        var html = template.apply(keyValuePairs);
        this._propertyBox.setHtml(html);

        if (!card || !card._image || !card._image.value || card._image.value.length === 0){
            this._imageBox.unloadImage();
            this._imageBox.hide();
        }
        else {
            this._imageBox.show();
            this._imageBox.loadImage(card._image.value);
        }
    },
    onPropertyTap: function(property){
        //alert(property);
    }

});
