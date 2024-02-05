'use strict';

 
const
  //Active article
  optActivePost = '.posts .active',
  //Article
  optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  //Links <a> tags
  optAllActiveLinks = 'a.active',
  //All Posts (title)
  optTitleListSelector = '.titles',
  //Author
  optAuthorUL = '.post-author',
  optAuthorsListSelector = '.list.authors',
  //Tags
  optTagLinks = '.post-tags .list li a', 
  optTagsListSelector = '.list.tags',
  //Counter class
  optCloudClassPrefix = 'tag-size-';


function titleClickHandler(event){
  event.preventDefault();
  let clickedElement = this;

  /* [DONE] removes class 'active' from all article (LI) links  */
  const activeLinks = document.querySelectorAll(optAllActiveLinks);
  for(let i = 0; activeLinks.length > i; i++) {
    activeLinks[i].classList.remove('active');
  }

  /* [DONE]add class 'active' to the clicked link (LI) */
  clickedElement.classList.add('active');

  /*  [DONE] remove class 'active' from selected ARTICLE */
  const activeArticle = document.querySelectorAll(optActivePost); 
  for (let i = 0; activeArticle.length > i; i++) {
    activeArticle[i].classList.remove('active');
  }

  /*[DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.getElementById(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active'); 
}

const calculateTagsParams = (tags) => {  //Responsbile for calculating the Max & Mix num of Tags 
  let storage = [];
  for (let tag in tags) {
    storage.push(tags[tag]);
  }
   
  const tagsParams = {
    min: Math.min(...storage),
    max: Math.max(...storage)
  };
  return tagsParams;  // Returns the  calc value to calculateTagsParams() ------>------- 🟪
};


//A funtion responsbile for calculating correct class number based on incoming tag count 🎲
const calculateTagClass = (count, params) => { //----------------🟧
  const normalisedCount = count - params.min; 
  const normaliseMax = params.max - params.min; 

  const precentage = normalisedCount / normaliseMax; 

  const classNumber = Math.floor(precentage * 4 + 1); 
  return classNumber;  // returns back the class number to the calculateTagClass() function               
};


const generateTags = () => {

  // Genereates tags in middle & right columns

  /*Create a new varable Alltags with empty object */
  let allTags = {};

  /*[DONE] Grabs ARTICLE */
  const articles = document.querySelectorAll(optArticleSelector);

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
      let linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;

      /* check if the link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
      /* Creates a property, and adds it to allTags object*/
        allTags[tag] = 1;
      } else {
        allTags[tag]++; 
      }
      html += linkHTML;
    }
     
    tagWrapper.innerHTML = html;
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* Sends the 'allTags' obeckt to external function for calculating mix / max*/ 
  const tagsParams = calculateTagsParams(allTags); //-------------------🟪
  console.log('tafsParams:', tagsParams);

  /*Create va for all links HTML */
  let allTagsHTML = ``;

  /*Stat loop: for each tag in allTags */
  for(let tag in allTags) {  
    console.log(tag);
    /*Passing as argument tag count + min/max*/
    const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams); //----------------🟧
    allTagsHTML += `<li><a class="${optCloudClassPrefix}${tagLinkHTML}" href="#tag-${tag}">${tag} <span>(${allTags[tag]})</span></a></li>`;
  }
  /*add html from allTagsHTML to tagList*/ 
  tagList.innerHTML = allTagsHTML;
  console.log(tagList);


};
generateTags();


function tagClickHandler(event) {
  event.preventDefault();       

  const clickedElement = this;                        /*new const & give it the value of "this" */
  const href = clickedElement.getAttribute('href');   /*Extracting href from selected tag */
  const tag = href.replace('#tag-', '');              /*Extracting tag name from href value */

  const tagActive = document.querySelectorAll(optAllActiveLinks); /*Grabbing tag links with "active" class*/
  Array.from(tagActive).forEach((tag) => {
    tag.classList.remove('active');
  });
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allHrefTags = document.querySelectorAll('a[href="' + href + '"]');
  Array.from(allHrefTags).forEach((tag) => {
    tag.classList.add('active');
  });

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]'); //<--------🔻

}

function addClickListenersToTags(){
  /* Event listner activates titleClickHandler*/
  const dom_title = document.querySelectorAll(optTagLinks);
  Array.from(dom_title).forEach((e) => {
    e.addEventListener('click', tagClickHandler);
  });
}
addClickListenersToTags();



// -------------------------------------------Authors 

//1.Generate author names under article title & 

const generateAuthors = () => {
  const articles = document.querySelectorAll(optArticleSelector);
  const authorsDOM = document.querySelector(optAuthorsListSelector);
  console.log(authorsDOM);
  let allAuthors = {};  /*Here only uniqe author names / links are stored*/

  Array.from(articles).forEach((article) => {  //Cycling by each article
    //[1.
    const tagWrapper = article.querySelector(optAuthorUL); /* find tags wrapper (changes DOM location every cycle) */
    const authorTag = article.getAttribute('data-author');  /* Authors tags */
    tagWrapper.innerHTML = `<li><a href="#${authorTag}-">${authorTag}</a></li>`; /*Creates new html each cycle + pushes to HTML DOM */ 
    //]2.
    if (!allAuthors.hasOwnProperty(authorTag)){
    /* Checks if tag property exists (natrually it won't during the first check, so we automatially give it 1 point) */
      allAuthors[authorTag] = 1;
    } else {
      allAuthors[authorTag]++;
    }
  });

  let emptyHtml = ``;
  /*Cycling throught each property inside 'allAthors' object */
  for (let property in allAuthors) {
  /* based on original (not duplicated) author names, creates a link a pushes into HMTL */
    let authorHTML = `<li><a href="#tag-${property}"><span class="author-name">${property} (${allAuthors[property]})</span></a></li>`;
    emptyHtml += authorHTML;
  }
  authorsDOM.innerHTML += emptyHtml;
};
generateAuthors();


//2. Grabbing Author's tag name to use it with Attribute selector
function authorClickHandler() {
  let clickedAuthor = this;
  const tag =   clickedAuthor.children[0].innerText;
  generateTitleLinks('[data-author="' + tag + '"]');  //<-------------🔻
}

const addClickListenersToAuthors = () => {
  const authorTag = document.querySelectorAll(optAuthorUL);
  Array.from(authorTag).forEach((author) => {
    author.addEventListener('click', authorClickHandler);
  });
};

addClickListenersToAuthors();



// Generates titleLinks in left side columns based on icoming data from:
// authorClickHandler()🔻
// tagClickHandler()🔻

function generateTitleLinks(customSelector = ''){

  /* [DONE] GRABS UL  */
  const titleList = document.querySelector(optTitleListSelector);

  /*[DONE] Grabs ARTICLE */
  const articles = document.querySelectorAll(optArticleSelector + customSelector); /* '.post[data-tags~="tagName"]'
   console.log(articles)

 /* Cycle by each ARTICLE */
  let html = ``;
  for (let i = 0; articles.length > i; i++) {
    const article = articles[i];
 
    /* [DONE]get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE]find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE]create HTML of the link */
    const linkHTML = `<li><a href="${articleId}"><span>${articleTitle}</span></a></li>`;

    /* [DONE]Adding <HTML> to html variable */
    html += linkHTML;
  }

  /* Event listner activates titleClickHandler*/
  titleList.innerHTML = html;
  const dom_title = document.querySelectorAll('.titles a');

  Array.from(dom_title).forEach((e) => {
    e.addEventListener('click', titleClickHandler);
  });
}

generateTitleLinks();

