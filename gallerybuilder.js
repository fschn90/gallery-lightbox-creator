class galleryBuilder {
  constructor(galleryId, links, thumbnails = false) {
    this._galleryId = galleryId;
    this._list = links;
    this._thumbnails = thumbnails
  }

  build() {
    let gallery = document.getElementById(this._galleryId);
    gallery.setAttribute("class", "Gallery");

    // creating modal
    var modal = document.createElement("div");
    modal.setAttribute("id", this._galleryId + "MODAL");
    modal.setAttribute("class", "modal");
    let modalContent = modal.appendChild(document.createElement("div"));
    modalContent.setAttribute("class", "modal-content");

    // adding Close, Prev and Next Button to modal
    let closeButton = modal.appendChild(document.createElement("span"));
    closeButton.setAttribute("class", "close cursor");
    closeButton.setAttribute("onclick", "closeModal()");
    closeButton.innerHTML = "&times;";
    let prevButton = modal.appendChild(document.createElement("a"));
    prevButton.setAttribute("class", "prev");
    prevButton.setAttribute(
      "onclick",
      "plusSlides(" + this._galleryId + "MODAL" + ",-1)",
    );
    prevButton.innerHTML = "&#10094;";
    let nextButton = modal.appendChild(document.createElement("a"));
    nextButton.setAttribute("class", "next");
    nextButton.setAttribute(
      "onclick",
      "plusSlides(" + this._galleryId + "MODAL" + ",1)",
    );
    nextButton.innerHTML = "&#10095;";
    
    // building main gallery
    for (let x in this._list) {
      let figure = gallery.appendChild(document.createElement("figure"));
      let image = figure.appendChild(document.createElement("img"));
      figure.appendChild(document.createElement("figcaption"));
      image.setAttribute(
        "onclick",
        "openModal(" +
          this._galleryId +
          "MODAL" +
          "); currentSlide(" +
          this._galleryId +
          "MODAL" +
          ", " +
          (Number(x) + 1) +
          ")",
      );
      image.setAttribute("class", "hover-shadow");


      // adding images to gallery and considering uppercase file name endings
      if (this._thumbnails) {
          var path = this._list[x]
          let subpath = path.substring(-1)
        if (subpath == subpath.toLowerCase()) {
          image.setAttribute("src", "./images/thumbnails/" + path.substring(9));
        } else {
          path = path.substring(9)
          image.setAttribute("src", "./images/thumbnails/" + path.replace('JPG', 'jpg'));
        }
      } else {
        image.setAttribute("src", this._list[x])
      }

      let containerDiv = modalContent.appendChild(
        document.createElement("div"),
      );


      // adding images to modal
      containerDiv.setAttribute("class", "mySlides");
      let countDiv = containerDiv.appendChild(document.createElement("div"));
      countDiv.setAttribute("class", "numbertext");
      countDiv.innerHTML = Number(x) + 1 + " / " + this._list.length;
      let figureModal = countDiv.appendChild(document.createElement("figure"));
      let imageModal = figureModal.appendChild(document.createElement("img"));
      imageModal.setAttribute("src", this._list[x])
      figureModal.appendChild(document.createElement("figcaption"));

    }

    // adding modal to document
    document.querySelector("body").appendChild(modal);
  }

  captions( {dateGallery = true, dateModal = true}) {
    if (dateGallery && dateModal) {
        this.helperGallery = "";
        this.helperModal = "";
    } else if ( dateGallery == true && dateModal == false) {
      this.helperGallery = "";    
      this.helperModal = "datetime = '';";
    } else if ( dateGallery == false && dateModal == true) {
      this.helperGallery = "datetime = '';";    
      this.helperModal = "";
    } else if ( dateGallery == false && dateModal == false) {
      this.helperGallery = "datetime = '';";   
      this.helperModal = "datetime = '';";
    }

    var getExif = new Function(
      "name",
      `var container = ${this._galleryId}.getElementsByTagName('img');
      for (var x =0;x < container.length; x++) {
          EXIF.getData(container[x], function() {
              var caption = EXIF.getTag(this, "ImageDescription");
              datetime = EXIF.getTag(this, "DateTime");
              datetime = ' (' + datetime.substring(0,4) + ')';
              ${this.helperGallery}
              var string = utf8.decode(caption + datetime);
              var imgParent = this.parentElement.lastElementChild;
              imgParent.innerHTML = string;
          });
      };
      var container = ${this._galleryId + "MODAL"}.getElementsByTagName('img');
      for (var x =0;x < container.length; x++) {
          EXIF.getData(container[x], function() {
              var caption = EXIF.getTag(this, "ImageDescription");
              datetime = EXIF.getTag(this, "DateTime");
              datetime = ' (' + datetime.substring(0,10).replace(/:/g, '.') + ')';
              ${this.helperModal}
              var imgParent = this.parentElement.lastElementChild;
              var string = utf8.decode(caption + datetime);
              imgParent.innerHTML = string;
          });
      };`
    );
    
    var temp=function(){ return 1;};
    if (window.onload) {
      temp = window.onload;
    } else {
      window.onload = getExif;
    }
    window.onload = function() {getExif(); temp();};
  }
}

// supplementary functions neccessary for modal
function openModal(modalElement) {
  document.addEventListener(
    "keydown",
    (keys = (event) => {
      var key = event.key;
      if (key == "ArrowLeft") {
        plusSlides(modalElement, -1);
      } else if (key == "ArrowRight") {
        plusSlides(modalElement, 1);
      } else if (key == "Escape") {
        closeModal();
      }
    }),
  );
  modalElement.style.display = "block";
  document.querySelector("a.prev").style.visibility = "visible";
}

function closeModal() {
  var modalElement = document.getElementsByClassName("modal");
  for (var x = 0; x < modalElement.length; x++) {
    modalElement[x].style.display = "none";
  }
  document.removeEventListener("keydown", keys);
}

function plusSlides(modalElement, n) {
  showSlides(modalElement, (slideIndex += n));
}

function currentSlide(modalElement, n) {
  showSlides(modalElement, (slideIndex = n));
}

function showSlides(modalElement, n) {
  var slides = modalElement.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}