'use strict';


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleUL = '.post-tags .list';


function titleClickHandler(event){
    event.preventDefault();
    let clickedElement = this; 

  /* [DONE] removes class 'active' from all article (LI) links  */
 const activeLinks = document.querySelectorAll('.titles a.active');
  for(let i = 0; activeLinks.length > i; i++) {
    activeLinks[i].classList.remove('active');
  }

  /* [DONE]add class 'active' to the clicked link (LI) */
  clickedElement.classList.add('active');

  /*  [DONE] remove class 'active' from selected ARTICLE */
  const activeArticle = document.querySelectorAll('.posts .active'); 
    for (let i = 0; activeArticle.length > i; i++) {
    activeArticle[i].classList.remove('active');
    }

  /*[DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href")

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.getElementById(articleSelector)

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active')
  
  generateTags()
}

const generateTags = () => {

  /*[DONE] Grabs ARTICLE */
  const articles = document.querySelectorAll('.post');

   /* START LOOP: for every article: */
   for (let article of articles) {
    
     /* find tags wrapper (DOM) */
     const tagWrapper = article.querySelector('.list');

     /* make html variable with empty string */
     let html = ``;
    
      /* get tags from data-tags attribute */
     const articleTags = article.getAttribute('data-tags');
  
     /* split tags into array */
     const articleTagsArray = articleTags.split(' ');

     for (let tag of articleTagsArray) {
     /* generate HTML of the link + add generated code to html variable */
     let generatedCode = `<li><a href="#${tag}">${tag}</a></li>`;
      html += generatedCode;
     }
     
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
     
   }

}


 const addClickListenersToTags = () => {
  const tagLinks = document.querySelectorAll('.optArticleUL');
  console.log(tagLinks)
 }



function generateTitleLinks(){

  /* [DONE] GRABS UL  */
 const titleList = document.querySelector(optTitleListSelector);

  /*[DONE] Grabs ARTICLE */
 const articles = document.querySelectorAll(optArticleSelector);

 /* Cycle by each ARTICLE */
 let html = ``;
 for (let i = 0; articles.length > i; i++) {
    const article = articles[i];
 
    /* [DONE]get the article id */
    const articleId = article.getAttribute('id')

    /* [DONE]find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE]create HTML of the link */
    const linkHTML = `<li><a href="${articleId}"><span>${articleTitle}</span></a></li>`;

    /* [DONE]Adding <HTML> to html variable */
    html += linkHTML;
 }

    /* Event listner activates titleClickHandler*/
    titleList.innerHTML = html
    const dom_title = document.querySelectorAll('.titles a');

    Array.from(dom_title).forEach((e) => {
        e.addEventListener("click", titleClickHandler);
 })
}

generateTitleLinks();

