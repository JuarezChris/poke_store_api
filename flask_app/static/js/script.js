
var pokeCart = []
var pokeInput = ``

function add_cart(poke_id,poke_name="pikachu"){
    console.log("add cart")
    pokeCart.push(poke_id)
    cart_amount.innerHTML = pokeCart.length
    pokeInput += `
    <div>
        <label>${poke_name}</label>
        <input type="hidden" name='pokeId' value='${poke_id}_${poke_name}'> 
        <input type="number" name='${poke_name}' value='1'> 
    </div>
    `
    poke_purchase.innerHTML = `
        <form action="/poke_order" method="POST">
            ${pokeInput}
            <button>Purchase</button>
        </form>
    `
}

get_poke(1,151)

async function get_poke(param, param2=false){
    if(param2){
        for(let i = param; i<=param2; i++){
            get_poke_api(i)
        }
    }
    else{
        get_poke_api(param)
    }
}

async function get_poke_api(id){
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    let pokeData = await response.json()
    console.log(pokeData)
    console.log(pokeData.name)
    console.log(shop)
    shop.innerHTML += `
    <div id="pokeCard">
    <h3>${pokeData.name}</h3>
    <img src=${pokeData.sprites.front_shiny} alt=${pokeData.name}>
    <p>Price: $${pokeData.weight}</p>
    <button OnClick="add_cart('${pokeData.id}','${pokeData.name}')">add to cart</button>
    </div>
    `
}

get_poke_api()