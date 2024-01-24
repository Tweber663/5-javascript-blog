'use strict';



function titleClickHandler(event){


 /* remove class 'active' from all article links  */

 const activeLinks = document.querySelectorAll('.titles a.active');
  for(let i = 0; activeLinks.length > i; i++) {
    activeLinks[i].classList.remove('active');
  }

  /* add class 'active' to the clicked link */
const activeArticle = document.querySelectorAll('.posts .active'); 
for (let i = 0; activeArticle.length > i; i++) {
 activeArticle[i].classList.remove('active');
}

  /* remove class 'active' from all articles */

  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */

  
}

const dom_title = document.querySelectorAll('.titles a');

Array.from(dom_title).forEach((e) => {
    e.addEventListener("click", titleClickHandler)
})

