
//Let's derive from the card and do some transformation for displayValue and displayName
quartett.ProjectCard = function(options) {
    quartett.Card.prototype.constructor.call(this, options);
};

quartett.ProjectCard.prototype = Object.create(quartett.Card.prototype);

quartett.ProjectCard.prototype.getDisplayValueFor = function(property, value){

    //Todo
    //Save the date as js date and then format it here

    return value;
};

quartett.ProjectCard.prototype.getDisplayNameFor = function(property){
    return property.charAt(0).toUpperCase() + property.slice(1);
};


quartett.data = {
    getCards: function(){
        return [
            new quartett.ProjectCard([
                { name: { value: 'bootstrap'}},
                { forks: { value: 10205 }},
                { stars: { value: 40652 }},
                { contributors: { value: 100 } },
                { birth: { value: '24.11.2011' }},
                { _image: { value: 'http://octodex.github.com/images/murakamicat.png' }}
            ]),
            new quartett.ProjectCard([
                { name: { value: 'bootstrap'}},
                { forks: { value: 2616 }},
                { stars: { value: 17627 }},
                { contributors: { value: 100 } },
                { birth: { value: '19.03.2006' }},
                { _image: { value: 'http://jquery.org/wp-content/uploads/2010/01/JQuery_logo_color_onwhite-300x74.png' }}
            ])
        ]
    }
}