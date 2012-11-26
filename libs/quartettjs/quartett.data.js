'use strict';

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
            ]),
            new quartett.ProjectCard([
                { name: { value: 'rails'}},
                { forks: { value: 4288 }},
                { stars: { value: 16594 }},
                { contributors: { value: 100 } },
                { birth: { value: '21.11.2004' }},
                { _image: { value: 'http://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Ruby_on_Rails.svg/500px-Ruby_on_Rails.svg.png' }}
            ]),
            new quartett.ProjectCard([
                { name: { value: 'git'}},
                { forks: { value: 975 }},
                { stars: { value: 3206 }},
                { contributors: { value: 100 } },
                { birth: { value: '03.04.2005' }},
                { _image: { value: 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/500px-Git-logo.svg.png' }}
            ]),
            new quartett.ProjectCard([
                { name: { value: 'nodejs'}},
                { forks: { value: 2842 }},
                { stars: { value: 18835 }},
                { contributors: { value: 100 } },
                { birth: { value: '15.02.2009' }},
                { _image: { value: 'http://upload.wikimedia.org/wikipedia/en/a/a7/Nodejs_logo_light.png' }}
            ]),
            new quartett.ProjectCard([
                { name: { value: 'mongodb'}},
                { forks: { value: 601 }},
                { stars: { value: 3582 }},
                { contributors: { value: 89 } },
                { birth: { value: '14.10.2007' }},
                { _image: { value: 'http://info.10gen.com/rs/10gen/images/mongodb%20badge.png' }}
            ])
        ];
    }
};