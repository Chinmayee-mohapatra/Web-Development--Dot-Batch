const countValue = document.querySelector('#counter'); 
//  here the element is taken as constant and not the value it contains.
//  we are getting the value from html page by using the element_id.

// can also use getElementById:
// const countValue = document.getElemntById('counter'); 

const increment = () => {
    let val = parseInt(countValue.innerText);
    // getting the text value in the html page using innerText and converting it to integer value.
    val = val+1;
    // incrementing the value by 1.
    countValue.innerText = val;
    // storing back the value to html page.
}

// without using arrow function:

// function increment(){
//     let val = parseInt(countValue.innerText);
//     val = val+1;
//     countValue.innerText = val;
// }


// same logic for decrement is applied below.

const decrement = () => {
    let val = parseInt(countValue.innerText);
    val = val-1;
    countValue.innerText = val;
}