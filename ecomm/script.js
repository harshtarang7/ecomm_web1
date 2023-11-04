let uList = document.querySelector("#category");
let modal=document.querySelector('#modal')
let ProductShow=document.querySelector("#ProductsDiv")
let priceRange=document.querySelector("#price")
let priceDisplay=document.querySelectorAll("#priceDisplay span")
let searchItem = document.querySelector("#Search-product")
let table_cart=document.querySelector('#table_cart')
let table_btn=document.querySelector('#cart_btn')
let p_total=document.querySelector('#total')
let carts=JSON.parse(localStorage.getItem('cartItems')) ?? [];
let user_id

// to get category 

let getCategory = ((e)=>{
    fetch('https://dummyjson.com/products/categories')
    .then((res)=>{
        return res.json()
    })
    .then(finalResult =>{
        let items=''
        finalResult.forEach((element,i) =>{
            items+=`<li onclick="getProducts('${element}')" class="list-group-item " data-id="${i}">${element}</li>`
        })
        uList.innerHTML=items
        
    })
})
getCategory();


// to show products

let getProducts=(catname='') =>{
    let minPrice;
    let maxPrice=1;
    ProductsDiv.innerHTML=''
    if(catname ===''){
        fetch('https://dummyjson.com/products')
        .then((res)=>res.json())
        .then((finalRes)=>{
        let productsData=''
        minPrice=finalRes.products[0].price;

        finalRes.products.forEach((e,i) =>{
         if(e.price<minPrice){
            minPrice=e.price
         }
         if(e.price>maxPrice){
            maxPrice=e.price
         }
            productsData+=` <div class="col-lg-4">
            <div class="card left-card" >
            <img src="${e.thumbnail}" class="card-img-top" style="width=100%; height:230px;">
            <div class="card-body">
              <h5 class="card-title">${e.title}</h5>
              <p class="card-text">${e.description}</p>
              <h5 class="my-3 text-bg-color">price : ${e.price}</h5>
              <button type="button" class="btn btn-outline-danger " data-toggle="modal" data-target="#exampleModal" data-id="${e.id}">show Product</button>
            </div>
          </div>
          </div>`
        })
           ProductsDiv.innerHTML=productsData    

           priceRange.min=minPrice
           priceRange.max=maxPrice    
           priceRange.value=maxPrice   
           
           priceDisplay[0].innerHTML="Rs" + minPrice
           priceDisplay[1].innerHTML="Rs" + minPrice
           priceDisplay[2].innerHTML="Rs" + maxPrice
        })
    }
    else{
        fetch(`https://dummyjson.com/products/category/${catname}`)
        .then((res)=>res.json())
        .then((finalRes)=>{

        let productsData=''
       
        finalRes.products.forEach((e,i) =>{
            
            productsData+=` <div class="col-lg-4">
            <div class="card" >
            <img src="${e.thumbnail}" class="card-img-top" style="width=100%; height:230px;">
            <div class="card-body">
              <h5 class="card-title">${e.title}</h5>
              <p class="card-text">${e.description}</p>
              <button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal" data-id="${e.id}">show Product</button>
            </div>
          </div>
          </div>`
        })
        
           ProductsDiv.innerHTML=productsData  
           localStorage.setItem('cartItems' , JSON.stringify(finalRes))          
        })
    }
    
}
    

// to show pop up detail

function showmodal(user_id) {
    // console.log(showM)
modal.style.background="black"


fetch(`https://dummyjson.com/products/${user_id}`)
.then(res => res.json())
.then(finalResult => {
    modal.innerHTML=`<div class="modal-header">
    <h5 class="modal-title text-white" id="exampleModalLabel">${finalResult.title}</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body row my-4">

      <div class="col-lg-6">
          <img src="${finalResult.thumbnail}" class="img-fluid " >
          <div class="d-flex justify-content-between mt-3">
              <img src="${finalResult.images[0]}" width="70px" height="50px" >
              <img src="${finalResult.images[1]}" width="70px" height="50px">
              <img src="${finalResult.images[2]}" width="70px" height="50px">
              <img src="${finalResult.images[3]}" width="70px" height="50px">
          </div>
      </div>
      <div class="col-lg-6 my-4">
          <h3 class="text-white">${finalResult.title}</h3>
          <p class="my-3 text-white">${finalResult.description}</p>
          <h5 class="text-white my-3">Price : ${finalResult.price}</h5>
          <div class="d-flex  m-auto justify-content-between text-success">
              <div>Rating: ${finalResult.rating}</div>
              <div>In stock- ${finalResult.stock}</div>
          </div>
          <h5 class="my-2 text-white">Brand: ${finalResult.brand}</h5>
          <h5 class="text-white">Category: ${finalResult.category}</h5>
      </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary">Add To Cart</button>
  </div>`
})
}
getProducts()

// ProductShow.addEventListener("click" ,(event)=>{
//     showM = event.target.getAttribute("data-id")
//     // console.log(showM)
//     showmodal()
// })
ProductShow.addEventListener("click",(event)=>{
    user_id= event.target.getAttribute("data-id")
    showmodal(user_id)
 })


//  filter value
 priceRange.addEventListener("change",(e)=>{
    let filterPrice = e.target.value
    priceDisplay[1].innerHTML= "Rs" + e.target.value
    apiUrl='https://dummyjson.com/products'
    
    fetch(apiUrl)
    .then((res)=>res.json())
    .then((finalRes)=>{
    let productsData=''

   finalRes.products.forEach((el,i) =>{
    if(el.price<= filterPrice){
        productsData+=` <div class="col-lg-4">
        <div class="card" >
        <img src="${el.thumbnail}" class="card-img-top" style="width=100%; height:230px;">
        <div class="card-body">
          <h5 class="card-title">${el.title}</h5>
          <p class="card-text">${el.description}</p>
          <h5 class="my-3">price : ${el.price}</h5>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-id="${el.id}">show Product</button>
        </div>
      </div>
      </div>`
        }
    })
       ProductsDiv.innerHTML=productsData   

  })
})

// searching filter
searchItem.addEventListener("keyup", (item,i) =>{
  let searchTerm = searchItem.value; // Get the search term from the input field
  let productsData = '';
  fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
  .then(res => res.json())
  .then((finalResult) =>{
    
    finalResult.products.forEach((el,i) =>{
      
          productsData+=` <div class="col-lg-4">
          <div class="card" >
          <img src="${el.thumbnail}" class="card-img-top" style="width=100%; height:230px;">
          <div class="card-body">
            <h5 class="card-title">${el.title}</h5>
            <p class="card-text">${el.description}</p>
            <h5 class="my-3">price : ${el.price}</h5>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-id="${el.id}">show Product</button>
          </div>
        </div>
        </div>`
          })
          ProductsDiv.innerHTML=productsData  
      })
         .catch((error) => {
          console.error("Error fetching data:", error);
          ProductsDiv.innerHTML = "Error fetching data. Please try again later.";
        });
  });


  // carts item
function cartShow(){

  table_cart.innerHTML=''
  let table_data=""
  let Total_price=0

  carts.forEach((v,i)=>{
    Total_price+=Number(v.data_price)
    table_data+=`<tr>
    <td>${i+1}</td>
    <td>${v.data_title}</td>
    <td><img src="${v.data_img}" width="70px"></td>
    <td>${v.data_price}</td>
    <td data-delId="${i}" class="remove_item">item_remove</td>
  </tr>`
  })
  table_cart.innerHTML=table_data
  p_total.innerHTML=Total_price
}



modal.addEventListener("click",(e)=>{
  if(e.target.innerHTML=="Add To Cart"){
    fetch(`https://dummyjson.com/products/${user_id}`)
    .then(res => res.json())
    .then((finalres) => {
      let data_id=finalres.id
      let data_title=finalres.title
      let data_price=finalres.price
      let data_img=finalres.thumbnail
      carts.push({
        data_title,data_img,data_price
      })
      localStorage.setItem("cartItems",JSON.stringify(carts))
    })
    table_btn.classList.add("btn-success")
  }
})

table_btn.addEventListener(("click"),()=>{
  cartShow()
})
table_cart.addEventListener("click",(e)=>{
  if(e.target.innerText=="item_remove"){
    let delid=e.target.getAttribute("data-delId")
    carts.splice(delid,1)
    localStorage.setItem("cartItems",JSON.stringify(carts))
    cartShow()
  }
})
