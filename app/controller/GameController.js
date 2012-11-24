Ext.define('QuartettApp.controller.GameController', {
    extend: 'Ext.app.Controller',
    requires: ['QuartettApp.view.CardActionOverlay'],
    config: {
        refs: {
            gameView: {
                selector: 'gameview'
            }
        },
        control: {
            gameview: {
                propertyTap: '_onPropertyTap'
            }
        },
        routes: {
            'start': 'startGame'
        }
    },
    startGame: function() {
        //<debug>
        Ext.Logger.log('GameController->Run Route: "startGame"');
        //</debug>

        var me = this;

        var gameOptions = {
            player: [
                {
                    name: 'Me',
                    cardLost: function(card, winnerCard, property){
                        me._onUserLostCard(card, winnerCard, property);
                    },
                    cardsWon: function(cards, property){
                        me._onUserWonCards(cards, property);
                    }
                }, 'Computer'],
            cards: quartett.data.getCards(),
            activePlayerChanged: function(game){
                me._updateActivePlayer(game);
            },
            gameMoved: function(game){
                me._onGameMoved(game);
            },
            drawHappened: function(game, data){
                me._onDrawHappened(game, data);
            },
            shuffle: true
        };

        var game = this._game = new quartett.Game(gameOptions);
        var myPlayer = this._myPlayer = game.getMe();

        this._validProperties = QuartettApp.helper.Helper
            .cardsToArrayOfKeyValuePairs(myPlayer.getTopmostCard())
            .filter(function(pair){
                return pair.key.indexOf('_') !== 0 && pair.key !== 'Name' && pair.key !== 'Carmaker';
            })
            .map(function(pair){
                return pair.key;
            });



        game.start('Me');
        var card = game.getMe().getTopmostCard();

        var gameView = this.getGameView();

        me._showCard(card);
        gameView.writeTitle('Your turn!');
        gameView.writeCardCount(myPlayer.getCardCount());
    },
    _updateActivePlayer: function(game){
        var whosTurn = game.getActivePlayer().getName() === 'Me' ? 'Your turn' : 'Computer\'s turn'
        this.getGameView().writeTitle(whosTurn);
    },
    _onPropertyTap: function(property){
        this._game.playCard(property.toLowerCase());
    },
    _showCard: function(card){
        var gameView = this.getGameView();

        var keyValuePairs = QuartettApp.helper.Helper
            .cardsToArrayOfKeyValuePairs(card)
            .filter(function(pair){
                return pair.key.indexOf('_') !== 0;
            });

        gameView.showCard(keyValuePairs, card);
    },
    _onGameMoved: function(game){
        var myTopmostCard = this._myPlayer.getTopmostCard();
        var gameView = this.getGameView();
        this._showCard(myTopmostCard);

        gameView.writeCardCount(this._myPlayer.getCardCount());
    },
    _onUserLostCard: function(card, winnerCard, property){
        var data = {
            playedProperty: card[property].displayName,
            yourValue: card[property].displayValue,
            otherPlayer: {
                name: 'Computer',
                value: winnerCard[property].displayValue
            }
        };
        var overlay = QuartettApp.view.CardActionOverlay;
        var me = this;
        overlay
            .flashLost(data)
            .next(function(){

                if(me._game.isFinished()){
                    me._notifyGameFinished(me._game.getActivePlayer())
                    return Deferred.fail();
                }
                else{
                    return Deferred.next();
                }
            })
            .next(function(){
                return me._computersTurn();
            });

    },
    _onUserWonCards: function(cards, property){
        var data = {
            playedProperty: property,
            count: cards.length - 1
        };
        var me = this;
        QuartettApp.view.CardActionOverlay.flashWin(data)
                                          .next(function(){
                                              if (me._game.isFinished()){
                                                  me._notifyGameFinished(me._game.getActivePlayer())
                                              }
                                          });
    },
    _onDrawHappened: function(game, options){
        var me = this;

        var value = options.playerOne.getTopmostCard()[options.property];

        if (this._game.getActivePlayer() === this._myPlayer){
            QuartettApp.view.CardActionOverlay.flashYourDraw({ playedProperty: options.property, value: value.value });
        }
        else{
            QuartettApp.view.CardActionOverlay.flashComputersDraw({ playedProperty: options.property, value: value.value })
                                              .next(function(){
                                                  me._computersTurn();
                                              })
        }

    },
    _playOnRandomProperty: function(){
        var properties = this._validProperties;
        var randomProperty = properties[Math.floor(Math.random() * properties.length)];
        this._game.playCard(randomProperty.toLowerCase());
    },
    _computersTurn: function(){
        var me = this;
        var overlay = QuartettApp.view.CardActionOverlay;
        return overlay
            .flashThinking()
            .next(function(){
                me._playOnRandomProperty();
            });
    },
    _notifyGameFinished: function(winner){
        var winner = winner.getName();
        var displayWinner = winner === 'Me' ? 'You' : winner;
        Ext.Msg.show({
            title: 'Game Finished',
            message: displayWinner + ' won the game!',
            width: 300,
            buttons: {text: 'Start again!'},
            fn: function(buttonId) {
                this.startGame();
            },
            scope: this
        });
    }
});