

/*-----navigation menu----- */
(() =>{
       const hamburgerBtn = document.querySelector(".hamburger-btn"),
       navMenu =  document.querySelector(".nav-menu"),
       closeNavBtn = navMenu.querySelector(".close-nav-menu");

       hamburgerBtn.addEventListener("click",showNavMenu);
       closeNavBtn.addEventListener("click",hideNavMenu);

       function showNavMenu(){
          navMenu.classList.add("open");
              
       }
       function hideNavMenu(){
              navMenu.classList.remove("open");
              fadeOutEffect();
                  
       }
       function fadeOutEffect(){
              document.querySelector(".fade-out-effect").classList.add("active");
              setTimeout(() =>{
                     document.querySelector(".fade-out-effect").classList.remove("active");  
              },300)
       }
         //attach an event handler to document
       document.addEventListener("click", (event) =>{
          if(event.target.classList.contains('link-item')){
              /*marke sure event.target.hash has a value before overidding default behaviour */
              if(event.target.hash !==""){
                     //prevent default anchor click behaviour
                     event.preventDefault();
                     const hash = event.target.hash;
                     // deactivate existing active 'section'
                     document.querySelector(".section.active").classList.add("hide");
                     document.querySelector(".section.active").classList.remove("active");
                     //activate new 'section'
                     document.querySelector(hash).classList.add("active");
                     document.querySelector(hash).classList.remove("hide");
                    /* deactivate existing active navigation menu 'link-item'*/
                    navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
                    navMenu.querySelector(".active").classList.remove("active","inner-shadow");
                    /*if clicked 'link-item is contained within the navagation menu */
                    if(navMenu.classList.contains("open")){
                         //activate new navigation menu 'link-item'
                          event.target.classList.add("active","inner-shadow");
                          event.target.classList.remove("outer-shadow","hover-in-shadow");
                          //hide navigation menu
                      hideNavMenu();           
                  }
                  else{
                     let navItem = navMenu.querySelectorAll(".link-item");
                     navItem.forEach((item) =>{
                            if(hash === item.hash){
                                   // activate new navigation menu 'link-item
                                  item.classList.add("active","inner-shadow");
                                  item.classList.remove("outer-shadow","hover-in-shadow");
                            }
                     })
                     fadeOutEffect();
                  }
                  // add hash (#) to url
                  window.location.hash=hash;

              }
          }
          
       })
})();



/*-----about section tabs-----*/
(() =>{
     
       const aboutSection = document.querySelector(".about-section"),
       tabsContainer = document.querySelector(".about-tabs")
      
       tabsContainer.addEventListener("click", (event) =>{
              /* if event.target contains 'tab-item' class and not contains 'active' class */
          if(event.target.classList.contains("tab-item") &&
          !event.target.classList.contains("active")){
              const target = event.target.getAttribute("data-target");
              // deactive existing active 'tab-item'
              tabsContainer.querySelector(".active").classList.remove("outer-shadow"
                 ,"active");
                 // activate new 'tab-item'
                 event.target.classList.add("active","outer-shadow");
                  // deactive existing active 'tab-content'
                  aboutSection.querySelector(".tab-content.active").classList.remove
                  ("active");
                    // activate new 'tab-content'
                    aboutSection.querySelector(target).classList.add("active");
          }
       })
})();


 function bodyScrollingToggle(){
       document.body.classList.toggle("stop-scrolling");
 }
      


/*-----hide all section except active----- */

 (() =>{
        const Sections = document.querySelectorAll(".section");
        Sections.forEach((section) =>{
               if(!section.classList.contains("active")){
                      section.classList.add("hide");
               }
        })
 })();



/*-----work filter and popup-----*/

(() =>{
  
       const filterContainer = document.querySelector(".work-filter"),
       workItemsContainer = document.querySelector(".work-items"),
       workItems = document.querySelectorAll(".work-item"),
       popup = document.querySelector(".work-popup"),
       prevBtn = popup.querySelector(".pp-prev"),
       nextBtn = popup.querySelector(".pp-next"),
       closeBtn = popup.querySelector(".pp-close");
       let itemIndex, slideIndex, screenshots;

       /*-----filter work items----- */
       filterContainer.addEventListener("click", (enent)=>{
          if(event.target.classList.contains("filter-item") &&
          !event.target.classList.contains("active")){
            //deactivate existing active 'filter-item'
            filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
            //active new 'filter item'
            event.target.classList.add("active","outer-shadow");
            const target = event.target.getAttribute("data-target");
            workItems.forEach((item) =>{
              if(target === item.getAttribute("data-category") || target === 'all'){
                     item.classList.remove("hide");
                     item.classList.add("show");
              }
              else{
                     item.classList.remove("show");
                     item.classList.add("hide");
              }
            })
          }
       })

       workItemsContainer.addEventListener("click", (event) =>{
             if(event.target.closest(".work-item-inner")){
              const workItem = event.target.closest(".work-item-inner").parentElement;
              // get the workItem index
              itemIndex = Array.from(workItem.parentElement.children).indexOf(workItem);
               screenshots = workItems[itemIndex].querySelector(".work-item-img img").getAttribute("data-screenshots");
               //convert screensshorts into array
               screenshots = screenshots.split(",");
               if(screenshots.length === 1){
                     prevBtn.style.display="none";
                     nextBtn.style.display="none";
               }
               else{
                     prevBtn.style.display="block";
                     nextBtn.style.display="block";
               }
               slideIndex = 0;
               popupToggle();
               popupSlideshow();

             }
       })
        
       closeBtn.addEventListener("click", () =>{
              popupToggle(); 

       })

            
       function popupToggle() {
              popup.classList.toggle("open");
              bodyScrollingToggle();
       }

       function popupSlideshow(){
              const imgSrc = screenshots[slideIndex];
              const popupImg = popup.querySelector(".pp-img");
              /*-----activate loader until poupImg loaded-----*/
              popup.querySelector(".pp-loader").classList.add("active");
              popupImg.src=imgSrc;
              popupImg.onload = () =>{
                // deactivate loader after the popupImg loaded
                popup.querySelector(".pp-loader").classList.remove("active");
              }
              popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + 
              screenshots.length;
       }
       // next slide
           nextBtn.addEventListener("click", () =>{
              if(slideIndex === screenshots.length-1){
                     slideIndex = 0;
              }
              else{
                     slideIndex++;
              }
              popupSlideshow();
              console.log("slideIndex:" + slideIndex);
       })

       // prev slide
          prevBtn.addEventListener("click", () =>{
              if(slideIndex === 0){
                     slideIndex = screenshots.length-1
              }
              else{
                     slideIndex--;
              }
              popupSlideshow();
              console.log("slideIndex:" + slideIndex);

       })       
       

})();