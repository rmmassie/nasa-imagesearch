let baseURL = 'https://images-api.nasa.gov/search';
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
        .then(function() {
            let imageResults = document.getElementById("searchResults")
            imageResults.style.display = 'flex';
            imageResults.style.height= 'fit-content'
            let body = document.querySelector('body')
            var rect = imageResults.getBoundingClientRect();
            console.log(rect.y)
            window.scrollBy({ 
                top: rect.y,
                left: 0, 
                behavior: 'smooth' 
              })
            let navigation = document.getElementById('navigation')   
            navigation.style.display = 'block'
            
            })
        
        
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
                    let modalTitle = document.getElementById('detailModalLabel')
                    modalTitle.textContent = caption
                    console.log(caption)
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
               
                }
            
            }
            catch(err) {
            console.log(err)
            }
        }
    }
}
//Need to pass in thumb, title, desc, asset.path
function buildModal(image, desc) {
    //parseInfo to populate high-res & original res buttons
   
    let modal = createElement('div');
        modal.setAttribute("class","modal fade");
        modal.setAttribute("id","detailModal");
        modal.setAttribute('tabindex', '-1');
    let dialog = createElement('div');
        dialog.setAttribute('class', 'modal-dialog');
    let content = createElement('div');
        content.setAttribute('class', 'modal-content');
    //Head Element
    let header = createElement('div');
        header.setAttribute('class', 'modal-header');
    let headerText = createElement('h5');
        headerText.setAttribute('class', 'modal-title');
        headerText.setAttribute('id', 'detailModalLabel');
        headerText.innerHTML = 'Image Details & Download';
    //Content Element
    let contentBody = createElement('div');
        contentBody.setAttribute('class', 'modal-body');
    let bodyImage = createElement('img');
        bodyImage.setAttribute('src', image);
    let bodydesc = createElement('p');
        bodydesc.textContent = desc;
    let footer = createElement('div');
        footer.setAttribute('class', 'modal-footer');
    let bigbtn = createElement('button');
        bigbtn.setAttribute('id', 'bigImg');
        bigbtn.setAttribute('type', 'button');
        bigbtn.setAttribute('class', 'btn btn-primary');
        bigbtn.innerHTML = 'Original';
    let medbtn = createElement('button');
        medbtn.setAttribute('id', 'medImg');
        medbtn.setAttribute('type', 'button');
        medbtn.setAttribute('class', 'btn btn-primary');
        medbtn.innerHTML = 'High-Res';
    let close = createElement('button');
        close.setAttribute('data-dismiss', 'modal');
        close.setAttribute('type', 'button');
        close.setAttribute('class', 'btn btn-primary');
        close.innerHTML = 'Close';

        footer.appendChild(bigbtn);
        footer.appendChild(medbtn);
        footer.appendChild(close);

        contentBody.appendChild(bodyImage);
        contentBody.appendChild(bodydesc);

        header.appendChild(headerText)

        content.appendChild(header);
        content.appendChild(contentBody);
        content.appendChild(footer);

        dialog.appendChild(content);
        modal.appendChild(dialog);


    


        
        
    


}
