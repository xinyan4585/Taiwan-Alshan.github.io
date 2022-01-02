$(document).ready(function(){
   $('.fa-search').click(function(){
       $('.search').toggleClass('active');
   });
   $('.b-box').click(function(){
       $('.na-menu').toggleClass('active2');
       $(this).toggleClass('active3');
       $('.x').fadeToggle(0);
   });
   $('.small-pic a').click(function(){
    $(this).attr('href');
    $('.big-pic img').attr('src',$(this).attr('href'));

    return false;

})

$('.collaspible').click(function(){
    $('.content').toggleClass('active6')
})
});

// let counter = 1;
// setInterval(function(){
//     document.getElementById('radio' + counter).checked = true;
//     counter++;
//     if(counter > 4){
//         counter = 1;
//     }
// },8000)




if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){
    var removebutton = document.getElementsByClassName('cart-btn')
    for(var i =0; i< removebutton.length;i++ ){
        var button = removebutton[i]
        button.addEventListener('click',removeClick)
    }
    var quantityInput = document.getElementsByClassName('cart-input"')
    for(var i =0; i<  quantityInput.length;i++ ){
        var button =  quantityInput[i]
        button.addEventListener('change', quantityChange)
    }
    var addToCart = document.getElementsByClassName('shop-item-btn')
    for(var i =0; i< addToCart.length;i++ ){
        var button = addToCart[i]
        button.addEventListener('click',addToCartClick)
    }
    document.getElementsByClassName('total-btn')[0].addEventListener('click',purchaseClick)
}

function purchaseClick(){
    prompt('請輸入寄送地址')
    alert('訂單已送出')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    update()
}
function removeClick(event){
     var buttonClick = event.target
     buttonClick.parentElement.parentElement.remove()
     update()
}
function quantityChange(event){
    var input = event.target
    if(isNaN(input.value) || input.value >= 0){
        input.value = 1
    }
    update()
}
function addToCartClick(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var img = shopItem.getElementsByClassName('shop-item-img')[0].src
    addItem(title,price,img)
    update()
}
function addItem(title,price,img){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartName = cartItems.getElementsByClassName('cart-title')
    for(var i=0;i< cartName.length;i++){
        if(cartName[i].innerText == title){
            alert('商品已重複')
            return
        }

    }
    var cartContent = `
    <div class="cart-item">
    <img src="${img}" alt="" class="cart-img" width="100px">
    <span class="cart-title">${title}</span>
</div>
<span class="cart-price">${price}</span>
<div class="details">
    <input type="number" class="cart-input" value="1">
    <button class="cart-btn">remove</button>
</div>
    `

    cartRow.innerHTML = cartContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('cart-btn')[0].addEventListener('click',removeClick)
    cartRow.getElementsByClassName('cart-input')[0].addEventListener('change', quantityChange)
}
function update(){
    var cartContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartContainer.getElementsByClassName('cart-row')
    var total = 0
    for(var i =0; i<cartRows.length;i++ ){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total +(price *quantity)
    }
    total = Math.round(total * 100)/100
    document.getElementsByClassName('total-price')[0].innerText = 'NT.' + total
}


function getHartResponse(userText){
    let botResponse = getBot(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>' 
    $('#chatbox').append(botHtml);
    document.getElementById('chat-bar').scrollIntoView(true);
}
function getResponse(){
    let userText = $('#textInput').val();
    if(userText == ""){
        userText = "送出一則訊息"
    }

       let userHtml = '<p class="userText"><span>' + userText + '</span></p>'
       $('#textInput').val("")
       $('#chatbox').append( userHtml);
       document.getElementById('chat-bar').scrollIntoView(true);

       setTimeout(() => {
           getHartResponse(userText)
       },1000)
}


function buttonText(sampleText){
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>'
    $('#textInput').val("")
    $('#chatbox').append( userHtml);
    document.getElementById('chat-bar').scrollIntoView(true);
}

function sendButton(){
     getResponse();
}
$('#textInput').keypress(function(e){
    if(e.wich == 13){
        getResponse();
    }
});

function getBot(input){
    if(input == "送出一則訊息"){
        return"已收到留言，我們將盡快回復"
    }else{
        return"漸入嘉境與文化部合作建立一個簡單明瞭的阿里山旅行觀光資訊整合平台，提供最新資訊給民眾查閱，希望在政府的積極推動下，民眾也能掌握最新消息，暢遊山林。"
    }
}
