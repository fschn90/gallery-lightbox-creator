class galleryBuilder {
    constructor(id, links) {
    this._id = id
    this._list = links;
    };

    build() {
        let gallery = document.getElementById(this._id);
        for (let x in this._list) {
            let figure = gallery.appendChild(document.createElement('figure'));
            let image = figure.appendChild(document.createElement('img'));
            figure.appendChild(document.createElement('figcaption'));
            image.setAttribute('src', this._list[x]);
            // image.setAttribute('id', image.src);
        };
    };




    modal() {

        // supplementing gallery with functionality to open modal
        const lightboxGallery = document.getElementById(this._id);
        const images = lightboxGallery.getElementsByTagName('img')
        for (var i = 0; i < images.length; i++) {
            images[i].setAttribute('onclick', 'openModal(); currentSlide(' + ( i + 1) + ')');
            images[i].setAttribute('class', 'hover-shadow');
        };

        // creating myModal (lighbox), 
        const modal = document.createElement("div")
        modal.setAttribute('id', 'myModal');
        modal.setAttribute('class', 'modal');
        let modalContent = modal.appendChild(document.createElement("div"));
        modalContent.setAttribute('class', 'modal-content')

        // adding Close, Prev and Next Button to myModal
        let closeButton = modal.appendChild(document.createElement("span"));
        closeButton.setAttribute('class', 'close cursor');
        closeButton.setAttribute('onclick', 'closeModal()');
        closeButton.innerHTML = '&times;';
        let prevButton = modal.appendChild(document.createElement('a'));
        prevButton.setAttribute('class', 'prev');
        prevButton.setAttribute('onclick', 'plusSlides(-1)');
        prevButton.innerHTML = '&#10094;';
        let nextButton = modal.appendChild(document.createElement('a'))
        nextButton.setAttribute('class', 'next');
        nextButton.setAttribute('onclick', 'plusSlides(1)');
        nextButton.innerHTML = '&#10095;';

        // adding images to myModal 
        for (var i = 0; i < images.length; i++) {
            let containerDiv = modalContent.appendChild(document.createElement("div"));
            containerDiv.setAttribute('class', 'mySlides');
            let countDiv = containerDiv.appendChild(document.createElement("div"));
            countDiv.setAttribute('class', 'numbertext');
            countDiv.innerHTML = (i+1) + ' / ' + images.length;
            let image = containerDiv.appendChild(document.createElement("img"));
            image.setAttribute('src', images[i].getAttribute('src'));
        }

        // adding modal to document
        document.querySelector("body").appendChild(modal);

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
    };


    // getExif() {
    //     const lightboxGallery = document.getElementById(this._id);
    //     const imags = lightboxGallery.getElementsByTagName('img')
    //     for (let x in imags) {
    //         EXIF.getData(imags[x], function() {
    //             var allMetaData = EXIF.getTag(this, "ImageDescription");
    //             var imgParent = imags[x].parentElement.lastElementChild 
    //             imgParent.innerHTML = JSON.stringify(allMetaData, null, "\t");
    
    
    //         });
    //     };    
    // };




};



function openModal() {
    document.getElementById("myModal").style.display = "block";
    document.querySelector('a.prev').style.visibility= 'visible';
};

function closeModal() {
    document.getElementById("myModal").style.display = "none";
};

function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

function showSlides(n) {
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1};
    if (n < 1) {slideIndex = slides.length};
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    };
    slides[slideIndex-1].style.display = "block";
};
