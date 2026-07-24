

let compras = {

    start(){
        console.log(window)
        console.log(window.screen.availWidth)
        let lista = [];
        document.querySelectorAll(".price-area").forEach((item) => {
            this.showItem(item);
            item.addEventListener("click", (e) => {
                document.querySelector(".selec .flavor").innerHTML = `${pizzas[parseInt(e.currentTarget.getAttribute("data-sabor"))].sabor}`;
                document.querySelector(".selec .preco").innerHTML = `R$ ${pizzas[parseInt(e.currentTarget.getAttribute("data-sabor"))].preço},00`;
                document.querySelector(".form-img").setAttribute("src", `${pizzas[parseInt(e.currentTarget.getAttribute("data-sabor"))].foto}`);
                let desc = e.currentTarget.querySelector(".desc")
                document.querySelector(".buying-container").style.display = "flex"
            })
        })

        document.querySelector(".cancel").addEventListener("click",(e) => {
            document.querySelector(".buying-container").style.display = "none";
        })

        document.querySelector(".selec").addEventListener("submit", (e) => {
            e.preventDefault();
        })
        document.querySelector(".showKart").addEventListener("click",() => {
            if(window.screen.availWidth <= 420){
                document.querySelector(".fake-tela").style.display = "flex";
                
                document.querySelector(".kart").classList.toggle("oculto");
                
            }
            this.hide();
        })
        document.querySelector(".add-cart").addEventListener("click",() => {
            
            document.querySelector(".buying-container").style.display = "none";
            
            if(document.querySelector(".kart").classList[1] === "oculto"){
                console.log("Não precisa acicionar");
            }else{
                document.querySelector(".kart").classList.add("oculto");
            }
            
            this.hide();
            document.querySelector(".fake-tela").style.overflowY = "scroll";
            document.querySelector(".fake-tela").style.height = "100vh";

            let pedido = {
                nome: document.querySelector(".selec .flavor").innerHTML,
                preco: document.querySelector(".selec .preco").innerHTML,
                quantidade: document.querySelector("#Quantidade").value,
            }
            
            this.kart(pedido, lista);
          
        
        })

    },

    showItem(e){
        e.querySelector(".product").setAttribute("src", `${pizzas[parseInt(e.getAttribute("data-sabor"))].foto}`);
        e.querySelector(".desc").innerHTML = `${pizzas[parseInt(e.getAttribute("data-sabor"))].sabor}`;
        e.querySelector(".price").innerHTML = `R$ ${pizzas[parseInt(e.getAttribute("data-sabor"))].preço},00`;
    },
   
    kart(pedido, lista){
        
        lista.push(pedido);
        let newli = document.createElement("li");
        let newB = document.createElement("input");
        newB.setAttribute("type","number");
        let cont= 0;
        for(let i of lista){
            
            newB.setAttribute("value", i.quantidade);
            newB.setAttribute("data-ped", cont);
            cont+=1;
            newli.innerHTML = `${i.nome} - ${i.preco}`;
            newli.appendChild(newB);
            document.querySelector(".lista").appendChild(newli);
        }

        newB.addEventListener("click",(e) => {
            lista[parseInt(e.target.getAttribute("data-ped"))].quantidade = e.target.value;
            this.conta(lista);
        })

        this.conta(lista);
        
        
    },

    conta(lista){

        this.hide();
        let desc = 0.1;
        let valorFin = 0;
        let precoTot = 0;
        document.querySelector(".gastos").innerHTML = ""
        document.querySelector(".gastos").style.listStyle= "none";
        
        for(let i of lista){
            let newli = document.createElement("li");
            let valor = parseInt(i.preco.slice(3));
            let quantidade = parseInt(i.quantidade);
            valPar = valor * quantidade;
            precoTot += valPar;
            newli.innerHTML += `${i.nome} - ${valPar}`;
            document.querySelector(".gastos").appendChild(newli);
        }
        
        let valorDescontado = desc*precoTot;
        valorFin = (precoTot - valorDescontado);
        document.querySelector(".Tirou").innerHTML = this.ajustaValor(`${valorDescontado}`);
        document.querySelector(".total").innerHTML = this.ajustaValor(`${valorFin}`);
        let a = "abc";
        a.indexOf
    },

    ajustaValor(valor){
    
        if(valor.indexOf(".") === -1){
          return `R$ ${valor}.00`
        }else{
           
          return `R$ ${valor}0`
        }
    },

    hide(){
        let loop = setInterval(() => {
            if(window.screen.availWidth <= 420 && document.querySelector(".kart").classList[1] === "oculto"){
                document.querySelector(".fake-tela").style.display = "none"
            }else{
                document.querySelector(".fake-tela").style.display = "flex"
            }
        }, 100)
        
    }

    
}

compras.start();