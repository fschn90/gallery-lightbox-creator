
//newly setting attributes
let conter = 0
const lightboxGallery = document.getElementsByClassName('Gallery')
for (var i = 0; i < lightboxGallery.length; i++) {
  for (var j = 0; j < lightboxGallery[i].childElementCount; j++) {
    conter++
    lightboxGallery[i].children[j].setAttribute('onclick', 'openModal();currentSlide(' + conter + ')')
    lightboxGallery[i].children[j].setAttribute('class', 'hover-shadow')
  }
}

//creating myModal (lighbox)
const child = document.createElement("div")
child.setAttribute('id', 'myModal');
child.setAttribute('class', 'modal');

//addomg Close Button and div element to modal
let childSpan = child.appendChild(document.createElement("span"));
childSpan.setAttribute('class', 'close cursor');
childSpan.setAttribute('onclick', 'closeModal()');
childSpan.innerHTML = '&times;'
let childChild = child.appendChild(document.createElement("div"));
childChild.setAttribute('class', 'modal-content')

//adding Prev Button to myModal
let childPrev = child.appendChild(document.createElement('a'))
childPrev.setAttribute('class', 'prev')
childPrev.setAttribute('onclick', 'plusSlides(-1)')
childPrev.innerHTML = '&#10094;'

//adding Next button to myModal
let childNext = child.appendChild(document.createElement('a'))
childNext.setAttribute('class', 'next')
childNext.setAttribute('onclick', 'plusSlides(1)')
childNext.innerHTML = '&#10095;'

let conter2 = 0
//adding the all images from the gallery to myModal 
// for (var i = 0; i < lightboxGallery.childElementCount; i++) {
for (var i = 0; i < lightboxGallery.length; i++) {
  for (var j = 0; j < lightboxGallery[i].childElementCount; j++) {
    conter2 ++
    let threeChild = childChild.appendChild(document.createElement("div"));
    threeChild.setAttribute('class', 'mySlides');
    let threeChildDiv = threeChild.appendChild(document.createElement("div"));
    threeChildDiv.setAttribute('class', 'numbertext');
    threeChildDiv.innerHTML = conter2 + ' / ' + conter;
    let threeChildImg = threeChild.appendChild(document.createElement("img"));
    threeChildImg.setAttribute('src', lightboxGallery[i].children[j].getAttribute('src'));
    // threeChildImg.setAttribute('style', 'width:100%');
  }
}
  
document.querySelector("body").appendChild(child);







function openModal() {
    document.getElementById("myModal").style.display = "block";
    document.querySelector('a.prev').style.visibility= 'visible'
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("demo");
//   var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
  slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
//   captionText.innerHTML = dots[slideIndex-1].alt;
} 



// adding keyboard functunality to myModal
document.addEventListener('keydown', (event) => {
        const key = event.key;
        //console.log(key)
        if (key == 'ArrowLeft') {
            plusSlides(-1);
        }
        else if (key == 'ArrowRight') {
            plusSlides(1);
        }
        else if (key == 'Escape') {
            closeModal()
        }

    });