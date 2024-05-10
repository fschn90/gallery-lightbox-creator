class galleryBuilder {
    constructor(galleryId, links) {
    this._galleryId = galleryId
    this._list = links;
    };

    build() {
        let gallery = document.getElementById(this._galleryId);
        gallery.setAttribute('class', 'Gallery')
        for (let x in this._list) {
            let figure = gallery.appendChild(document.createElement('figure'));
            let image = figure.appendChild(document.createElement('img'));
            figure.appendChild(document.createElement('figcaption'));
            image.setAttribute('src', this._list[x]);
        };
    };


    modal() {
        // supplementing gallery with functionality to open modal
        var lightboxGallery = document.getElementById(this._galleryId);
        var images = lightboxGallery.getElementsByTagName('img')
        for (var i = 0; i < images.length; i++) {
            images[i].setAttribute('onclick', 'openModal(' + this._galleryId + 'MODAL' + '); currentSlide(' + this._galleryId + 'MODAL' + ', ' + ( i + 1) + ')');
            // images[i].setAttribute('onclick', 'openModal(); currentSlide(' + ( i + 1) + ')');
            images[i].setAttribute('class', 'hover-shadow');
        };

        document.getElementsby
        // creating myModal (lighbox), 
        var modal = document.createElement("div")
        modal.setAttribute('id', this._galleryId + 'MODAL')
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
        prevButton.setAttribute('onclick', 'plusSlides(' + this._galleryId + 'MODAL' + ',-1)');
        // prevButton.setAttribute('onclick', 'plusSlides(-1)');
        prevButton.innerHTML = '&#10094;';
        let nextButton = modal.appendChild(document.createElement('a'))
        nextButton.setAttribute('class', 'next');
        nextButton.setAttribute('onclick', 'plusSlides(' + this._galleryId + 'MODAL' + ',1)');
        // nextButton.setAttribute('onclick', 'plusSlides(1)');
        nextButton.innerHTML = '&#10095;';

        // adding images to myModal 
        for (var i = 0; i < images.length; i++) {
            let containerDiv = modalContent.appendChild(document.createElement("div"));
            containerDiv.setAttribute('class', 'mySlides');
            let countDiv = containerDiv.appendChild(document.createElement("div"));
            countDiv.setAttribute('class', 'numbertext');
            countDiv.innerHTML = (i+1) + ' / ' + images.length;
            let figure = countDiv.appendChild(document.createElement('figure'));
            let image = figure.appendChild(document.createElement("img"));
            image.setAttribute('src', images[i].getAttribute('src'));
            figure.appendChild(document.createElement('figcaption'));

        };

        // adding modal to document
        document.querySelector("body").appendChild(modal);

        // adding keyboard functunality to myModal

        // TODO make keys work, somehow the functions need to know which modal they r supposed to be in

        document.addEventListener('keydown', (event) => {
            var key = event.key;
            if (key == 'ArrowLeft') {
                plusSlides(-1);
            }
            else if (key == 'ArrowRight') {
                plusSlides(1);
            }
            else if (key == 'Escape') {
                closeModal();
            };
        });
    };


    getExif() {
        
        // TODO make work with multiple modals

        // adds captions to gallery
        var container = document.getElementById(this._galleryId);
        var imags = container.getElementsByTagName('img');
        for (let x in imags) {
            EXIF.getData(imags[x], function() {
                var caption = EXIF.getTag(this, "ImageDescription");
                var datetime = EXIF.getTag(this, "DateTime");
                var imgParent = imags[x].parentElement.lastElementChild;
                var string = utf8.decode(caption + ' (' + datetime.substring(0,4) + ')')
                imgParent.innerHTML = string;
            });
        };
        
        // add captions to modal
        var modal = document.getElementById(this._galleryId + 'MODAL');
        var imagsM = modal.getElementsByTagName('img');
        for (let x in imagsM) {
            EXIF.getData(imagsM[x], function() {
                var caption = EXIF.getTag(this, "ImageDescription");
                var datetime = EXIF.getTag(this, "DateTime");
                var imgParent = imagsM[x].parentElement.lastElementChild ;
                datetime = datetime.substring(0,10).replace(/:/g, '.');
                var string = utf8.decode(caption + ' (' + datetime + ')');
                imgParent.innerHTML = string;
            });
        };

    };

};



// supplementary functions neccessary for modal

function openModal(modalElement) {
    // document.getElementById(n).style.display = "block";
    modalElement.style.display = "block";
    document.querySelector('a.prev').style.visibility= 'visible';
};

function closeModal() {
    var modalElement = document.getElementsByClassName('modal');
    for (var x = 0;x < modalElement.length; x++) {
        modalElement[x].style.display = 'none'
    };
    // document.getElementById("myModal").style.display = "none";
};

function plusSlides(modalElement, n) {
    showSlides(modalElement, slideIndex += n);
  }
  
  function currentSlide(modalElement, n) {
    showSlides(modalElement, slideIndex = n);
  }

function showSlides(modalElement, n) {
    var slides = modalElement.getElementsByClassName("mySlides");
    // var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1};
    if (n < 1) {slideIndex = slides.length};
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    };
    slides[slideIndex-1].style.display = "block";
};

