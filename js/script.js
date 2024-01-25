'use strict';


function titleClickHandler(event){
    event.preventDefault();
    let clickedElement = this; 

 /* [DONE] remove class 'active' from all article links  */

 const activeLinks = document.querySelectorAll('.titles a.active');
  for(let i = 0; activeLinks.length > i; i++) {
    activeLinks[i].classList.remove('active');
  }

  /* [DONE]add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /*  [DONE] remove class 'active' from all articles */
  const activeArticle = document.querySelectorAll('.posts .active'); 
    for (let i = 0; activeArticle.length > i; i++) {
    activeArticle[i].classList.remove('active');
    }

  /*[DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href")

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector)

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active')
  
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
 const titleList = document.querySelector(optTitleListSelector)
 console.log(titleList.innerHTML = '')

  /* for each article */

    /* get the article id */

    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */

}

generateTitleLinks();

const dom_title = document.querySelectorAll('.titles a');

Array.from(dom_title).forEach((e) => {
    e.addEventListener("click", titleClickHandler)
})

