let productName=document.getElementById('productName')
let productPrice=document.getElementById('productPrice')
let productCategory=document.getElementById('productCategory')
let productDesc=document.getElementById('productDesc')
let add=document.getElementById('add')
let update=document.getElementById('update')
let btn=document.querySelector('.btn')
let search=document.querySelector('.search')

let update1=0;
let arrOfProduct=[]

if (localStorage.getItem("arrOfProduct")!=null){
    arrOfProduct=JSON.parse(localStorage.getItem("arrOfProduct"))
    display(arrOfProduct)
}



add.addEventListener('click',function(){
    if(productName.value==""||productPrice.value==""||productCategory.value==""||productDesc.value==""){
        alert("Please All fields are required")
     }
     else if( validate(productName,nameRegex)==true){
 
         let Product={
             productPrice:productPrice.value,
             productName:productName.value,
             productCategory:productCategory.value,
              productDesc:productDesc.value
     }
     arrOfProduct.push(Product);
     localStorage.setItem("arrOfProduct",JSON.stringify(arrOfProduct))
     clear()
     display(arrOfProduct)
 }
})
function clear(){
    productName.value=""
    productDesc.value=""
    productPrice.value=""
    productCategory.value=""
}
function display(arr){
    console.log(arr);
    let box=``
    for(i=0 ; i<arr.length ; i++){
         box+=`
         <tr class=" text-center">
         <td>${i}</td>
         <td>${arr[i].productName}</td>
         <td>${arr[i].productPrice}</td>
         <td>${arr[i].productCategory}</td>
         <td>${arr[i].productDesc}</td>
         <td><button onclick="setProductForUpdate(${i})" class="btn btn-outline-info"> <i class="fa-solid fa-file-pen uAn"></i>Update</button></td>
         <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can dAn"></i>Delete</button></td>
         </tr>         
         `
    }
    let tBody=document.getElementById('tBody').innerHTML=box;
}

function deleteProduct(ProductIndex){
arrOfProduct.splice(ProductIndex,1)
localStorage.setItem("arrOfProduct",JSON.stringify(arrOfProduct))
display(arrOfProduct)
}

function setProductForUpdate(updateIndex){
    add.classList.replace("d-block","d-none")
    update.classList.replace("d-none","d-block")
    update1=updateIndex;
productName.value=arrOfProduct[updateIndex].productName;
    productPrice.value=arrOfProduct[updateIndex].productPrice;
productCategory.value=arrOfProduct[updateIndex].productCategory;
   productDesc.value=arrOfProduct[updateIndex].productDesc;
}
update.addEventListener('click',function(){
    let Product={
        productName:productName.value,
        productPrice:productPrice.value,
        productCategory:productCategory.value,
        productDesc:productDesc.value
    }
    arrOfProduct.splice(update1,1,Product);
    localStorage.setItem("arrOfProduct",JSON.stringify(arrOfProduct))
    add.classList.replace("d-none","d-block")
    update.classList.replace("d-block","d-none")
    display(arrOfProduct)

})


function searchProduct(term){
    var matchedProducts=[];
    for(var i=0;i<arrOfProduct.length;i++){
        if(arrOfProduct[i].productName.toLowerCase().includes(term.toLowerCase())==true){
             matchedProducts.push(arrOfProduct[i])
            console.log(i);
    
        }
    }
    display(matchedProducts)
    console.log("matchedProducts = ",matchedProducts);
}


var nameRegex = /^[A-Z][a-z]{3,}$/;

function validate(element, regex) {
    if (regex.test(element.value)) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      
      return true;
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      return false;
    }
  }

