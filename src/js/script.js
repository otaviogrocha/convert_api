// LABEL OUT

const input = document.getElementById('cat_input'); // Pegando input
const label = document.querySelector(`label[for="${input.id}"]`); // Pegando a label do input


input.addEventListener('input', function() { 
    //Event listener para alterar display do label ao digitar
    if (input.value.trim() !== '') {
        label.style.display = 'none';
    } else {
        label.style.display = 'block';
    }
});


// MENU MOBILE
const menuButton = document.querySelector('.mobile-menu-icon > button > img'); //Imagem do icone
const menuMobile = document.querySelector('.mobile-menu'); //Elemento do menu

menuButton.addEventListener('click', function(){
    // Event listener para verificar se o menu está aberto ao clicar
    if(menuMobile.classList.contains('open')){
        menuMobile.classList.remove('open');
        menuButton.src = "src/images/menu mobile.svg" // alterando svg caso esteja aberto
        menuMobile.style.display = 'none'; // Ocultando menu mobile
    }
    else{
        menuMobile.classList.add('open');

        // alterando propriedades do css caso esteja fechado, alinhando o layout.
        menuMobile.style.display = 'flex';
        menuMobile.style.flexDirection = 'column'; // exibir um abaixo do outro
        menuMobile.style.textAlign = 'center';
        menuMobile.style.flexWrap = 'wrap' // exibir um abaixo do outro
        menuButton.src = "src/images/menu closed.svg"; // alterar svg caso esteja fechado
    }
})




//API 

// Cards a serem adicionados e comportamento do botão, respectivamente.
const card_1 = document.querySelector('.container > .catContainer.left > .catImage > img')
const card_2 = document.querySelector('.container > .catContainer.right > .catImage > img')
const cat_container = document.querySelector('.container > .catContainer.right')
const searchButton = document.querySelector('.search_button');

// Consumo da API de acordo com a documentação

const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "DEMO-API-KEY"
  });
  
  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };
  
  fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=50", requestOptions) // Limit alterado para 50 cat images.
    .then(response => response.json()) // tratamento para json, melhorando manipulação dos dados
    .then(result => {        
        // console.log(result)

        // Alteração dos CArds
        card_1.src = result[0].url; 
        card_2.src = result[1].url;

        let foundBreed = '';


// ---- Evento de clique para pesquisar o gato pela raça ----


        searchButton.addEventListener('click', () => {

            const breed = input.value.trim(); // Limpar espaços vazios
            const capitalizedBreed = input.value.charAt(0).toUpperCase() + breed.slice(1); // manipular string capitalizando a palavra para pesquisa
            
            for (const element of result){  //uso de const of para conseguir dar o break;          
                if (element.breeds?.[0].name === capitalizedBreed){   

                    //verificar se existe a raça nos arrays                 
                    foundBreed = element.breeds?.[0].name;
                    foundImage = element.url;

                    break; // break caso for encontrado
                }                
                
            };
            
            if (foundBreed !== '') {    
                // Caso exista a raça, alterar card 1

                card_1.style.display = 'block';            
                card_1.src = foundImage;
                cat_container.style.display ='none'; // Ocultar container da direita
                // console.log(foundBreed)
                foundBreed = ''; // Zerar variável para buscas subsequentes
            }
            else{
                //Caso não exista a raça, exibir um alert e ocultar ambos os cards.

                cat_container.style.display ='none';
                card_1.style.display = 'none';
                alert("Raça não encontrada!")
                foundBreed = ''; // Zerar variável para buscas subsequentes
                console.log("Not found")
            }
            return;
        })
    })
    .catch(error => console.log('error', error));  
    
    