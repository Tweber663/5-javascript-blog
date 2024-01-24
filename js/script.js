'use strict';



function titleClickHandler(event){
console.log(event.target)
 /* remove class 'active' from all article links  */

  /* add class 'active' to the clicked link */

  /*remove class 'active' from all articles*/ 

  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */
}

const dom_title = document.querySelectorAll('.titles a');

Array.from(dom_title).forEach((e) => {
    e.addEventListener("click", titleClickHandler)
})

