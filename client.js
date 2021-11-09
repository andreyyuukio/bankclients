let wrapper = document.querySelector('.wrapper');
let info = document.querySelector('.info');
let allClients = [];
class clientsData{
    constructor(name, isActive, regDate, cardsType, currensy, balanse){
        this.name = name;
        this.isActive = isActive;
        this.regDate = regDate;
        this.cardsType = cardsType;
        this.currensy = currensy;
        this.balanse = balanse;
    }  
}
let client1 = new clientsData("Anna", true, "01.01.2025", "debit", "UAH", 265);
let client2 = new clientsData("Boris", true, "01.01.2025", "debit", "UAH", 0);
let client3 = new clientsData("Crone", true, "01.01.2025", "credit", "EUR", 105);
let client4 = new clientsData("David", true, "01.01.2025", "credit", "USD", 55);
let client5 = new clientsData("Eagle", false, "01.01.2021", "credit", "USD", -125);
let client6 = new clientsData("Flacee", true, "01.01.2024", "credit", "UAH", -524);
let client7 = new clientsData("Jim", true, "01.01.2024", "credit", "USD", 53);
let client8 = new clientsData("Grigirii", true, "01.01.2024", "debit", "USD", 445);
let client9 = new clientsData("HIM", false, "01.01.2022", "debit", "USD", 34);
let client10 = new clientsData("Ivan", true, "01.01.2024", "credit", "UAH", -114);

allClients.push(client1, client2, client3, client4, client5, client6, client7, client8, client9, client10);

let url =  "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
let response = fetch(url)
 .then(response => response.json())
 .then(response => { 		 
    allClients.forEach(convert()) 
    	function convert(){
      	let capitalization = 0;
            for (let client of allClients){
                if (client.currensy === "UAH"){          	
  					client.balanse /= response[0].sale
    			}
                else if(client.currensy === "EUR"){
          	        client.balanse = client.balanse * response[1].buy / response[0].sale
                }      		
                capitalization += client.balanse          
   	 		}       
            
            let capital = document.createElement('div');
            info.appendChild(capital);
            capital.innerHTML = "Капиталл = " + capitalization.toFixed(2) + "$";
        }    
    }   
 );
 
function showClients(){
    let content = document.querySelector('tbody#content');
    allClients.forEach(client => {
        let tr = document.createElement('tr');
        content.appendChild(tr);        
       // console.log(client); 
        for (let key in client) {
            let td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = client[key]
        }        

    })
     
}
showClients()

function debtQuantity(clients){    
        let debtQnt = 0;
        for (let item of clients){
     debtQnt += item.balanse < 0 ? 1 : 0;
     }
         return debtQnt;
     }
   let div = document.createElement('div');
   info.appendChild(div);
   div.innerHTML = "Колчество должников банка: " + debtQuantity(allClients);


 


  
