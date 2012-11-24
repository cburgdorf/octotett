//Todo Figure out why exactly should one use a panel as overlay. Swaping this against a container (which is more
//lightweight does also work)

Ext.define("QuartettApp.view.CardActionOverlay", {
    extend: 'Ext.Container',
    xtype: 'cardactionoverlay',
    requires: [
        'Ext.Container'
    ],
    config: {
        modal: true,
        hideOnMaskTap: true,
        showAnimation: {
            type: 'popIn',
            duration: 250,
            easing: 'ease-out'
        },
        hideAnimation: {
            type: 'popOut',
            duration: 250,
            easing: 'ease-out'
        },
        cls:'card-action-overlay',
        centered: true,
        width: Ext.os.deviceType == 'Phone' ? 260 : 400,
        height: Ext.os.deviceType == 'Phone' ? 220 : 400,
        styleHtmlContent: true,
        cardLostTemplate: new Ext.XTemplate(
            '<div class="card-lost">',
                '<h1>Lost Card</h1>',
                '<div>',
                    '<div class="diff">-1</div>',
                    '<span>',
                        'You had <span class="value">{yourValue}</span> on the <span class="property">{playedProperty}</span>',
                        ' whereas <span class="player-name">{otherPlayer.name}</span> had <span class="value">{otherPlayer.value}</span>',
                    '</span>',
                '</div>',
            '</div>'
        ),
        cardsWonTemplate: new Ext.XTemplate(
            '<div class="cards-won">',
                '<h1>Won Cards</h1>',
                '<div>',
                    '<div class="diff">+{count}</div>',
                    '<span>',
                        'You won on the <span class="property">{playedProperty}</span> property. ',
                        'All others sucked badly',
                    '</span>',
                '</div>',
            '</div>'
        ),
        yourDrawTemplate: new Ext.XTemplate(
            '<div class="draw">',
                '<h1>Draw Card!</h1>',
                '<div>',
                    '<span>',
                        'You both have <span class="value">{value}</span> on the the <span class="property">{playedProperty}</span> property. ',
                        'Please pick a different property',
                    '</span>',
                '</div>',
            '</div>'
        ),
        computersDrawTemplate: new Ext.XTemplate(
            '<div class="draw">',
                '<h1>Draw Card!</h1>',
                '<div>',
                    '<span>',
                        'You both have <span class="value">{value}</span> on the the <span class="property">{playedProperty}</span> property. ',
                        'The Computer needs to pick another property',
                    '</span>',
                '</div>',
            '</div>'
        ),
        thinkingTemplate: [
            '<div class="thinking">',
                '<h1>Computer is thinking hard...</h1>',
            '</div>'
        ].join(),
        youWon: [
            '<div class="won">',
            '<h1>You won! Congrats!</h1>',
            '</div>'
        ].join(),
        youLost: [
            '<div class="lost">',
            '<h1>You lost! Pity!</h1>',
            '</div>'
        ].join()
    },
    statics:{
        flashLost: function(data){
            return this._withShortLivedInstance(function(instance){
                instance.showLost(data);
            });
        },
        flashWin: function(data){
            return this._withShortLivedInstance(function(instance){
                instance.showWin(data);
            });
        },
        flashThinking: function(){
            return this._withShortLivedInstance(function(instance){
                instance.showThinking();
            });
        },
        flashYourDraw: function(data){
            return this._withShortLivedInstance(function(instance){
                instance.showYourDraw(data);
            });
        },
        flashComputersDraw: function(data){
            return this._withShortLivedInstance(function(instance){
                instance.showComputersDraw(data);
            });
        },
        _withShortLivedInstance: function(action, ms){
            //We want to keep our DOM size small. That's why we don't keep the overlay around. In general avoid
            //DOM size growth. It's usually much better to create and destroy things as you need them.
            //This is why we use a factory method that automatically attaches the overlay to the viewport
            //and destroys it once we are done.

            var cardActionOverlay = new this;
            Ext.Viewport.add(cardActionOverlay);

            //This is a template method, the outside can decide how to act on the instance
            action(cardActionOverlay);

            var deferred = new Deferred();

            ms = ms === undefined ? 3000 : ms;

            Ext.defer(function(){
                cardActionOverlay.on('hide', function(){
                    cardActionOverlay.destroy();
                    deferred.call();
                }, this, {single: true });

                cardActionOverlay.hide();
            }, ms, this);

            return deferred;
        }
    },
    showLost: function(data){
        this.setHtml(this.getCardLostTemplate().apply(data));
        this.show();
    },
    showWin: function(data){
        this.setHtml(this.getCardsWonTemplate().apply(data));
        this.show();
    },
    showThinking: function(){
        this.setCls('card-action-overlay thinking')
        this.setHtml(this.getThinkingTemplate());
        this.show();
    },
    showYourDraw: function(data){
        this.setHtml(this.getYourDrawTemplate().apply(data));
        this.show();
    },
    showComputersDraw: function(data){
        this.setHtml(this.getComputersDrawTemplate().apply(data));
        this.show();
    }
});
