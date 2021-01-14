const axios = require('axios');

function searchResultsHTML(stores){
    return stores.map(store => {
        return`
            <a href="/store/${store.slug}" class="search__result">
                <strong>${store.name}</strong>
            </a>
        `;
    }).join('');
};

function typeAhead(search){
    if(!search) return;

    const searchInput = search.querySelector('input[name="search"]');
    const searchResults = search.querySelector('.search__results');

    searchInput.on('input', function(){
        console.log(this.value);
        // if there is no value, quit it!
        if(!this.value){
            searchResults.style.display = 'none';
            return; //stop
        }

        // show the search results!
        searchResults.style.display = 'block';
        searchResults.innerHTML = '';

        axios
            .get(`/api/search?q=${this.value}`)
            .then(res => {
                if(res.data.length) {
                    searchResults.innerHTML = searchResultsHTML(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    });

    //handle keyboard inputs
    searchInput.on('keyup', (e) => {
        // if they aren't pressing up, down or enter, do nothing...
        if(![38, 40, 13].includes(e.keyCode)){
            return;
        }
        console.log('Do Somthing!');
    })
};

export default typeAhead;