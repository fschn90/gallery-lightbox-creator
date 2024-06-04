class galleryBuilder {
  constructor(galleryId, links) {
    this._galleryId = galleryId;
    this._list = links;
  }

  buildGallery() {
    let gallery = document.getElementById(this._galleryId);
    gallery.setAttribute("class", "Gallery");
    for (let x in this._list) {
      let figure = gallery.appendChild(document.createElement("figure"));
      let image = figure.appendChild(document.createElement("img"));
      figure.appendChild(document.createElement("figcaption"));
      image.setAttribute("src", this._list[x]);
    }
  }

  buildLightbox() {
    // supplementing gallery with functionality to open modal
    var lightboxGallery = document.getElementById(this._galleryId);
    var images = lightboxGallery.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
      images[i].setAttribute(
        "onclick",
        "openModal(" +
          this._galleryId +
          "MODAL" +
          "); currentSlide(" +
          this._galleryId +
          "MODAL" +
          ", " +
          (i + 1) +
          ")",
      );
      images[i].setAttribute("class", "hover-shadow");
    }

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

    // adding images to modal
    for (var i = 0; i < images.length; i++) {
      let containerDiv = modalContent.appendChild(
        document.createElement("div"),
      );
      containerDiv.setAttribute("class", "mySlides");
      let countDiv = containerDiv.appendChild(document.createElement("div"));
      countDiv.setAttribute("class", "numbertext");
      countDiv.innerHTML = i + 1 + " / " + images.length;
      let figure = countDiv.appendChild(document.createElement("figure"));
      let image = figure.appendChild(document.createElement("img"));
      image.setAttribute("src", images[i].getAttribute("src"));
      figure.appendChild(document.createElement("figcaption"));
    }

    // adding modal to document
    document.querySelector("body").appendChild(modal);
  }

  buildCaptions( dateGallery = true, dateModal = false) {
    
    this.dateGallery = dateGallery
    this.dateModal = dateModal

    if (this.dateGallery && this.dateModal) {
      this.query = `var container = ${this._galleryId}.getElementsByTagName('img');
      for (var x =0;x < container.length; x++) {
          EXIF.getData(container[x], function() {
              var caption = EXIF.getTag(this, "ImageDescription");
              var datetime = EXIF.getTag(this, "DateTime");
              var imgParent = this.parentElement.lastElementChild;
              var string = utf8.decode(caption + ' (' + datetime.substring(0,4) + ')');
              imgParent.innerHTML = string;
          });
      };
      var container = ${this._galleryId + "MODAL"}.getElementsByTagName('img');
      for (var x =0;x < container.length; x++) {
          EXIF.getData(container[x], function() {
              var caption = EXIF.getTag(this, "ImageDescription");
              var datetime = EXIF.getTag(this, "DateTime");
              var imgParent = this.parentElement.lastElementChild;
              datetime = datetime.substring(0,10).replace(/:/g, '.');
              var string = utf8.decode(caption + ' (' + datetime.substring(0,4) + ')');
              imgParent.innerHTML = string;
          });
      };`
    } else {
      this.query = `var container = ${this._galleryId}.getElementsByTagName('img');
      for (var x =0;x < container.length; x++) {
          EXIF.getData(container[x], function() {
              var caption = EXIF.getTag(this, "ImageDescription");
              // var datetime = EXIF.getTag(this, "DateTime");
              var imgParent = this.parentElement.lastElementChild;
              // var string = utf8.decode(caption + ' (' + datetime.substring(0,4) + ')');
              var string = utf8.decode(caption);
              imgParent.innerHTML = string;
          });
      };
      var container = ${this._galleryId + "MODAL"}.getElementsByTagName('img');
      for (var x =0;x < container.length; x++) {
          EXIF.getData(container[x], function() {
              var caption = EXIF.getTag(this, "ImageDescription");
              // var datetime = EXIF.getTag(this, "DateTime");
              var imgParent = this.parentElement.lastElementChild;
              //datetime = datetime.substring(0,10).replace(/:/g, '.');
              // var string = utf8.decode(caption + ' (' + datetime.substring(0,4) + ')');
              var string = utf8.decode(caption);
              imgParent.innerHTML = string;
          });
      };`
    }

    

    var getExif = new Function(
      "name",
      this.query
    );
    
    var temp=function(){ return 1;};
    if (window.onload) {
      temp = window.onload;
    } else {
      window.onload = getExif;
    }
    window.onload = function() {getExif(); temp();};
    // window.onload = getExif;
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
