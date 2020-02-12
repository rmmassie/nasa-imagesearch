let baseURL = 'http://images-api.nasa.gov/search';
let url;


let searchInput = document.getElementById('search-bar')
let searchForm = document.getElementById('searchForm')

searchInput.addEventListener('keyup',function (event) {
    if (event.keyCode == 13) {
       let searchTerm = document.getElementById('search-bar').value
       url = baseURL + '?q=' + searchTerm
       fetch(url)
       .then(function(result){return result.json()})
       .then(function(json){getResults(json)})   
    }
    })

function getResults(data) {
    let results = data.collection.items
    console.log(results)
    
    for (const item in results) {
        if (results.hasOwnProperty(item)) {
            const element = results[item];
            try {
            if (element.links[0].href.includes('video')) {
                console.log('Video Item, Passing');
                } else {
                    //build out the data container (Bootstrap Cards)
                    let thumbURL = element.links[0].href;
                    let caption = element.data[0].description;
                    let location = element.href;
                    
                 
                    
                    let parent = document.getElementById('searchResults');
                    let container = document.createElement('div')
                    let cardImage = document.createElement('img')
                  
                    container.setAttribute('class', 'card');
                    cardImage.setAttribute('class', 'card-img-top');
                
                    //Now fill the elements.
                    cardImage.setAttribute('src', thumbURL);
                    
                    container.appendChild(cardImage);
                    parent.appendChild(container);
                    container.setAttribute('data-toggle', 'modal')
                    container.setAttribute('data-target', '#detailModal')
                                                       
                    let modalTitle = document.getElementById('detailModalLabel')
                    // modalTitle.textContent = 
                    
                }
            
            }
            catch(err) {
            console.log(err)
            }
        }
    }
}

//Function to run on click of a card: Bring in the card, a caption, and the location of high-res images.
// function modalCall()