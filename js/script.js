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
  console.log(articleSelector)

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.getElementById(articleSelector)
  console.log(targetArticle)

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active')
  
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* [DONE]remove contents of titleList */
 const titleList = document.querySelector(optTitleListSelector);

  /*[DONE] for each article */
 const articles = document.querySelectorAll(optArticleSelector);

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
        e.addEventListener("click", titleClickHandler)
 })
}

generateTitleLinks();

