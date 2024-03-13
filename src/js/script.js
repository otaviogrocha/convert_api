// LABEL OUT

const input = document.getElementById('cat_input');
const label = document.querySelector(`label[for="${input.id}"]`);

input.addEventListener('input', function() {
    if (input.value.trim() !== '') {
        label.style.display = 'none';
    } else {
        label.style.display = 'block';
    }
});


// MENU MOBILE
const menuButton = document.querySelector('.mobile-menu-icon > button > img');
const menuMobile = document.querySelector('.mobile-menu');

menuButton.addEventListener('click', function(){
    if(menuMobile.classList.contains('open')){
        menuMobile.classList.remove('open');
        menuButton.src = "src/images/menu mobile.svg"
        menuMobile.style.display = 'none';
    }
    else{
        menuMobile.classList.add('open');
        menuMobile.style.display = 'flex';
        menuMobile.style.flexDirection = 'column';
        menuMobile.style.textAlign = 'center';
        menuMobile.style.flexWrap = 'wrap'
        menuButton.src = "src/images/menu closed.svg";
    }
})




//API 


const card_1 = document.querySelector('.container > .catContainer.left > .catImage > img')
const card_2 = document.querySelector('.container > .catContainer.right > .catImage > img')
const cat_container = document.querySelector('.container > .catContainer.right')
const searchButton = document.querySelector('.search_button');



const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "DEMO-API-KEY"
  });
  
  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };
  
  fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=50", requestOptions)
    .then(response => response.json())
    .then(result => {        
        console.log(result)
        card_1.src = result[0].url;
        card_2.src = result[1].url;

        let foundBreed = '';
        searchButton.addEventListener('click', () => {

            const breed = input.value.trim();
            const capitalizedBreed = input.value.charAt(0).toUpperCase() + breed.slice(1); 
            
            for (const element of result){  //uso de const of para conseguir dar o break;          
                if (element.breeds?.[0].name === capitalizedBreed){                    
                    foundBreed = element.breeds?.[0].name;
                    foundImage = element.url;
                    break;
                }                
                
            };
            
            if (foundBreed !== '') {    
                card_1.style.display = 'block';            
                card_1.src = foundImage;
                cat_container.style.display ='none';
                console.log(foundBreed)
                foundBreed = '';
            }
            else{
                cat_container.style.display ='none';
                card_1.style.display = 'none';
                alert("Raça não encontrada!")
                foundBreed = '';
                console.log("Not found")
            }
            return;
        })
    })
    .catch(error => console.log('error', error));  
    
    