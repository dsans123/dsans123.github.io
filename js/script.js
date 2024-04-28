// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
   
    var button = document.getElementById('colourmode');
    var loreButton = document.getElementById('loreColourMode');
    var body = document.body;
    var img = document.getElementById('image');
    // Get the icon from the button or the loreButton
    var icon = button ? button.querySelector('i') : loreButton.querySelector('i');
    var nav = document.getElementById('pageNav');
  
    // Add transition to the body and the icon
    body.style.transition = 'background-color 0.2s ease-in-out';
    icon.style.transition = 'color 0.2s ease-in-out, background-color 0.1s ease-in-out';
  
    // Check user's preferred color scheme and toggle classes accordingly
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Add the darkmode class to the body
      body.classList.add('darkmode');
      // Change the image source if the image element exists
      if (img) {
        img.src = "img/logo.jpg";
      }
      // Change the icon to a sun
      icon.className = 'fas fa-sun';
      // Change the icon color to white and the background color to white
      icon.style.color = 'white';
      icon.style.backgroundColor = 'white';
      // Add the darkmode-nav class to the nav if it exists
      if (nav) {
        nav.classList.add('darkmode-nav');
      }
    } else {
      // Add the lightmode class to the body
      body.classList.add('lightmode');
      // Change the image source if the image element exists
      if (img) {
        img.src = "img/lightlogo.jpg";
      }
      // Change the icon to a moon
      icon.className = 'fas fa-moon';
      // Add the lightmode-nav class to the nav if it exists
      if (nav) {
        nav.classList.add('lightmode-nav');
      }
    }
  
    // Toggle color mode when button is clicked
    function toggleColorMode() {
      // Check if the body has the darkmode class
      if (body.classList.contains('darkmode')) {
        // Remove the darkmode class from the body
        body.classList.remove('darkmode');
        // Add the lightmode class to the body
        body.classList.add('lightmode');
        // Change the icon to a moon
        icon.className = 'fa fa-moon';
        // Reset the icon color and background color
        icon.style.color = 'white';
        icon.style.backgroundColor = 'black';
        if(loreButton){
            loreButton.style.backgroundColor = 'black';
        }
        else{
            button.style.backgroundColor = 'black';
        }
        // Check if the nav element exists
        if (nav) {
          // Remove the darkmode-nav class from the nav
          nav.classList.remove('darkmode-nav');
          // Add the lightmode-nav class to the nav
          nav.classList.add('lightmode-nav');
        }
      } else {
        // Remove the lightmode class from the body
        body.classList.remove('lightmode');
        // Add the darkmode class to the body
        body.classList.add('darkmode');
        // Change the icon to a sun
        icon.className = 'fas fa-sun';
        // Change the icon color to white and the background color to white
        icon.style.color = 'black';
        icon.style.backgroundColor = 'white';
        if(loreButton){
            loreButton.style.backgroundColor = 'white';
        }
        else{
            button.style.backgroundColor = 'white';
        }
        // Check if the nav element exists
        if (nav) {
          // Remove the lightmode-nav class from the nav
          nav.classList.remove('lightmode-nav');
          // Add the darkmode-nav class to the nav
          nav.classList.add('darkmode-nav');
        }
      }
      // Check if the loreButton is clicked and if so, do not change the image
      if (this.id !== 'loreColourMode' && img) {
        // Change the image source based on the color mode
        img.src = body.classList.contains('darkmode') ? "img/logo.jpg" : "img/lightlogo.jpg";
      }
    }
  
    // Add the click event listener to the button if it exists
    if (button) {
      button.addEventListener('click', toggleColorMode);
    }
    // Add the click event listener to the loreButton if it exists
    if (loreButton) {
      loreButton.addEventListener('click', toggleColorMode);
    }

  //variables required in order for the carousel to function properly
  var images = document.getElementById('carouselImages');

  var caption = document.getElementById('carouselCaption');

  var prev = document.getElementById('carouselPrev');

  var next = document.getElementById('carouselNext');


/* ------------------------------
  Fetch our gallery JSON object
------------------------------ */


  //fetches the json gallery and gets all the assets included
  fetch("assets/gallery.json")

  // Does something with what has been fetched
  .then(function(res) {

    // Gets a JSON representation of the respons then does
    res.json().then(function(json) {

      // goes throught each json object
      json.forEach(function(el, i) {

        // Create a new image element...
        var image = document.createElement('img');

        // sets the attributes for it to be parsed into HTML as the img element
        image.setAttribute('src', el.url);        
        image.setAttribute('alt', el.caption);   
        image.setAttribute('title', el.caption);  

        // Append this image to our carouselImages element
        images.appendChild(image);
      });
      
      
      //calls the setupCarousel function which takes th JSON array as a paramater
      setupCarousel(json);
    });
  });


  //funcion that is called at the end of out fetch statement
  // sets up the carousel
  function setupCarousel(json) {
    
  
    //variables declared in order for everything to work

    // Number of children in your carouselImages element i.e 9 images
    var imageCount = images.childElementCount;

    // reference to the current image shown in the center of the carousel 
    var currentImage = 1;

    //image width
    //500 works for my images
    var imageWidth = 500;
    
    
    /* ----------------------------------------
      Set some event listeners on our buttons
    ---------------------------------------- */

  
    //function that is called when the prev button is clicked
    prev.addEventListener('click', function(e) {


      //stops from jumping back to the top of the page
      e.preventDefault();


      // if it is not the first image
      if(currentImage != 1) {

      

        // Decrement the current image reference
        --currentImage;

        // Move the previous image into view using the left property by taking off the width
        images.style.left = imageWidth - (currentImage * imageWidth) + 'px';
      }
      
      // Update our caption
      caption.innerText = json[currentImage - 1].caption;

      //update text below
      document.getElementById('textBelow').innerText = json[currentImage-1].text;
    });

    //function that is called when the next buttton is clicked
    next.addEventListener('click', function(e) {


      //stops from jumping back to the top of the page
      e.preventDefault();

      //checks the image is not the last image
      if(currentImage != imageCount) {

        // Increment the current image reference
        ++currentImage;

        // Move the next image into view using the left property
        images.style.left = imageWidth - (currentImage * imageWidth) + 'px';
      }
      
      // Update our caption
      caption.innerText = json[currentImage - 1].caption;

        // Update the text below

      document.getElementById('textBelow').innerText = json[currentImage - 1].text;

    });
    
    // Update our caption
    caption.innerText = json[currentImage - 1].caption;

    // Update the text below
    document.getElementById('textBelow').innerText = json[currentImage - 1].text;

  }

  //fetches the json then does something
  //whichb is creategallery function
  fetch('assets/3x3.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    createGallery(data);
  });



  function createGallery(data) {
    var gallery = document.getElementById('gallery');
    
    //loops through the json data and creates all the elements required for the gallery
    for (let i = 0; i < data.length; i++) {
      var item = data[i];
      
      var div = document.createElement('div');
      
      var a = document.createElement('a');
      a.href = item.url;
      
      const img = document.createElement('img');
      img.src = item.url;
      img.alt = item.caption;
      
      const caption = document.createElement('p');
      caption.textContent = item.caption;
      
      a.appendChild(img);
      div.appendChild(a);
      div.appendChild(caption);
      
      gallery.appendChild(div);
    }
  }
  



});
    