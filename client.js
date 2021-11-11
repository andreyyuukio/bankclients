let allClients = [
    {
    name: "Anna",
    isActive: true,
    regDate: "01.01.2025",
    cardsType: "debit",
    currensy: "UAH",
    balanse: 101, 
    }, {
        name: "Borris",
        isActive: true,
        regDate: "01.01.2025",
        cardsType: "debit",
        currensy: "UAH",
        balanse: 0
    }, {
        name: "Crone",
        isActive: true,
        regDate: "01.01.2025",
        cardsType: "credit",
        currensy: "EUR",
        balanse: 124
    }, {
        name: "David",
        isActive: true,
        regDate: "01.01.2025",
        cardsType: "credit",
        currensy: "USD",
        balanse: 55,
    }, {
        name: "Eagle",
        isActive: true,
        regDate: "01.01.2025",
        cardsType: "credit",
        currensy: "USD",
        balanse: -25,
    }, {
        name: "Flacke",
        isActive: true,
        regDate: "01.01.2025",
        cardsType: "credit",
        currensy: "UAH",
        balanse: 1245,
    }, {
        name: "Gake",
        isActive: true,
        regDate: "01.01.2025",
        cardsType: "credit",
        currensy: "USD",
        balanse: 15,
    }, {
        name: "Grigorii",
        isActive: true,
        regDate: "01.01.2025",
        cardsType: "credit",
        currensy: "USD",
        balanse: 246,
    }, {
    name: "HIM",
    isActive: false,
    regDate: "01.01.2022",      
    cardsType: "debit",
    currensy: "USD",
    balanse: 34,     
      
    }, {
        name: "Indira",
        isActive: true,
        regDate: "01.01.2025",
        cardsType: "credit",
        currensy: "UAH",
        balanse: -5
    }
];
function change(clientsData){
    let wrapper = document.querySelector('.wrapper');
    let info = document.querySelector('.info');
    let url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
    let response = fetch(url)
        .then(response => response.json())
        .then(response => { 		 
            clientsData.forEach(convert())
            function convert(){
                  let capitalization = 0;
                    for (let client of clientsData){
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
        clientsData.forEach(client => {
            let tr = document.createElement('tr');
            content.appendChild(tr);           
            for (let key in client) {
                let td = document.createElement('td');
                tr.appendChild(td);
                td.innerHTML = client[key];
            }
        });   
    }
    showClients();
    function debtQuantity(clients){    
        let debtQnt = 0;
        for (let item of clients){
            debtQnt += item.balanse < 0 ? 1 : 0;
        }
        return debtQnt;
    }
}
change(allClients)
let div = document.createElement('div');
info.appendChild(div);
div.innerHTML = "Колчество должников банка: " + debtQuantity(allClients);
