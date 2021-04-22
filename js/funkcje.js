//*************************************Sklep***************************************
    function create_table(){
        var list = JSON.parse(localStorage.getItem('basket'));
        var table = document.createElement('table');
        let thead = table.createTHead();
        let t_thead = ["Nazwa produktu", "Cena", "Informacje"];
        let line = thead.insertRow();
        let suma = 0;
        for(let i = 0; i < 3; i++){
            let collumn = line.insertCell();
            collumn.innerHTML = t_thead[i];
        }
        let tbody = document.createElement('tbody');
        for(let i=0; i < list.length; i++){
            line = tbody.insertRow();
            collumn = line.insertCell();
            collumn.innerHTML = list[i].name;
            collumn = line.insertCell();
            collumn.innerHTML = list[i].price;
            suma+= parseInt(list[i].price, 10);
            collumn = line.insertCell();
            collumn.innerHTML = list[i].val;
            collumn = line.insertCell();
            collumn.innerHTML = "<button onclick=\"edit('"+i+"')\">Edytuj</button>";
            collumn = line.insertCell();
            collumn.innerHTML = "<button onclick=\"usun('"+i+"')\">Usun</button>";
        }
        line = tbody.insertRow();
        collumn = line.insertCell();
        collumn.innerHTML = "Do zapłaty";
        collumn = line.insertCell();
        collumn.innerHTML = suma + "PLN";
        table.appendChild(tbody);
        table.setAttribute("border", "1px");
        document.getElementById('items').appendChild(table);
    }
    function save(id){
        let item ={};
        var list = JSON.parse(localStorage.getItem('basket'));
        if(list===null) list = [];
        switch(id){
            case 1: item.val = document.getElementById('scarf').value;
                    item.name = "Szalik";
                    item.price = "25";
                    alert('Dodano przedmiot');
                    break;
            case 2: item.val = document.getElementById('shirt').value;
                    item.name = "Koszulka";
                    item.price = "35";
                    alert('Dodano przedmiot');
                    break;
            case 3: item.val = document.getElementById('sup').value;
                    item.name = "Podstawka";
                    item.price = "5";
                    alert('Dodano przedmiot');
                    break;
        }
        list.push(item);
        localStorage.setItem('basket', JSON.stringify(list));
    }   
    function show(){
        var list = JSON.parse(localStorage.getItem('basket'));
        var el = document.getElementById('items');
        if(list===null) el.innerHTML = "<h5>Koszyk jest pusty</h3>";
        else{
        el.innerHTML = "<h5>Twoje produkty</h2>";
        create_table();
        }
    }
    function f_clear(){
        localStorage.removeItem('basket');
        var el = document.getElementById('items');
        el.innerHTML = "<h5>Produkty usuniete</h5>";
        }
    function usun(id){
        var list = JSON.parse(localStorage.getItem('basket'));
        list.splice(id, 1);
        localStorage.setItem('basket',JSON.stringify(list));
        if (list.length===0) f_clear();
        show();
    }
    function edit(id){
        var list = JSON.parse(localStorage.getItem('basket'));
        var el = document.getElementById('items');
        el.innerHTML='<br/><h4>' +list[id].name + ' ' + list[id].val +  ' - Zmien na </h4>';
        if(list[id].name==="Koszulka"){
            let select = document.createElement('select');
            select.id = 'sel';
            let option = document.createElement('option');
            option.appendChild(document.createTextNode('S')); option.value = "S";
            select.appendChild(option);
            option = document.createElement('option');
            option.appendChild(document.createTextNode('M')); option.value = "M";
            select.appendChild(option);
            option = document.createElement('option');
            option.appendChild(document.createTextNode('L')); option.value = "L";
            select.appendChild(option);
            option = document.createElement('option');
            option.appendChild(document.createTextNode('Xl')); option.value = "XL";
            select.appendChild(option);
            el.appendChild(select);
            el.innerHTML;
        }
        if(list[id].name==="Szalik"){
            let select = document.createElement('select');
            select.id = 'sel';
            let option = document.createElement('option');
            option.appendChild(document.createTextNode('Wzór 1')); option.value = "Styl 1";
            select.appendChild(option);
            option = document.createElement('option');
            option.appendChild(document.createTextNode('Wzór 2')); option.value = "Styl 2";
            select.appendChild(option);
            el.appendChild(select);
            el.innerHTML;
        }
        if(list[id].name==="Podstawka"){
            let select = document.createElement('select');
            select.id = 'sel';
            let option = document.createElement('option');
            option.appendChild(document.createTextNode('4 CM')); option.value = "4 CM";
            select.appendChild(option);
            option = document.createElement('option');
            option.appendChild(document.createTextNode('6 CM')); option.value = "6 CM";
            select.appendChild(option);
            el.appendChild(select);
            el.innerHTML;
        }
        let ok = document.createElement('button');
        ok.innerHTML = "OK";
        ok.onclick = function(){
            list[id].val = document.getElementById('sel').value;
            localStorage.setItem('basket',JSON.stringify(list));
            show();
            el.innerHTML+="Produkt został zmieniony";
        };
        el.appendChild(ok);
    }
    function order(){
        var list = JSON.parse(localStorage.getItem('basket'));
        var el = document.getElementById('content');
        if(list===null) el.innerHTML = "<h4>W koszyku nic nie było</h4>";
        else el.innerHTML = "<h4>Dokonałeś zakupu</h5><br/>";
        el.innerHTML += "<form action=\"index.html\"><input type=\"submit\" value=\"OK\"/></form>";
        localStorage.removeItem('basket');
    }
    
//***********************************Formularz + Sklad********************************
class User{
        constructor() {
        }
        f_form(){
            let text ="<h3>Skontaktuj sie z nami !<br/></h3>";
            text += '<form action="#" method="get">';
            text += '<table><tbody><tr><td>';
            text += 'Imie : </td><td><input type ="text" name = "imie" title="Podaj imie" pattern="[a-zA-Z]{2,20}" required/></td></tr><tr><td>';
            text += 'Nazwisko : </td><td><input type ="text" name = "nazwisko" title="Podaj nazwisko" pattern="[a-zA-Z]{2,20}" required/></td></tr><tr><td>';
            text += 'Numer telefonu :</td><td><input type ="text" name = "numer" title="Podaj numer telefonu" pattern="[0-9]{9}" required/></td></tr><tr><td>';
            text += 'Adres email: </td><td><input type ="email" name = "email" title="Podaj adres email" required/></td></tr><tr><td colspan="2">';
            text += '<textarea name = "tekst" required/>Opisz nam swój problem</textarea></td></tr><tr><td>';
            text += '<input id="wyslij" type ="submit" value="Wyslij" /></td><td>';
            text += '<input id="wyczysc" type="reset" value="Wyczysc"/></td></tr></tbody></table></form>';
            return text;
        }
        f_team(){
            let text = '<a href="images/sklad.jpg" data-lightbox="galeria" target="blank"><img src="images/sklad.jpg" alt="error" width="700px"/></a>';
            return text;
        }
    }
document.addEventListener('DOMContentLoaded', () => {
    var user=new User();
    var el =document.getElementById('content');
    document.getElementById('team').addEventListener("click", ()=> {
        el.innerHTML = user.f_team();
    });
    document.getElementById('content_form').innerHTML = user.f_form();
 });
    
//***********************************Slider************************************
function slideSwitch() {
 var $active = $('#slideshow IMG.active');
 if ($active.length === 0)
 $active = $('#slideshow IMG:last');
 var $next = $active.next().length ? $active.next()
 : $('#slideshow IMG:first');
 $active.addClass('last-active');
 $next.css({opacity: 0.0})
 .addClass('active')
 .animate({opacity: 1.0}, 1000, function () {
 $active.removeClass('active last-active');
 });
}
$(function () {
 setInterval("slideSwitch()", 3000);
});

//******************************Lightbox***************************************
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

const images = document.querySelectorAll('table img');
images.forEach(image =>{
    image.addEventListener('click', () => {
        lightbox.classList.add('active');
        const img = document.createElement('img');
        img.src = image.src;
        while(lightbox.firstChild){
            lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(img);
    });
});

lightbox.addEventListener('click', e => {
    if(e.target !== e.currentTarget) 
        return;
    lightbox.classList.remove('active');
});