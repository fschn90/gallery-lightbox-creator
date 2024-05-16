# gallery lightbox creator

javascript to automatically create gallery and lightbox.

|        gallery         |        lightbox        |
| :--------------------: | :--------------------: |
| ![](./Screenshot1.png) | ![](./Screenshot2.png) |

## install

1. add `Gallerybuilder.js` and `gallerybuilder.css` to your project.

2. install dependencies:

```bash
npm install # from package.json
```

3. add to your html:

```html
<!-- website.html -->
<script src="./node_modules/utf8/utf8.js"></script>
<script src="./node_modules/exif-js/exif.js"></script>
<script src="./gallerybuilder.js"></script>
<link rel="stylesheet" href="./gallerybuilder.css" />
```

## usage

```html
<!-- website.html -->
<script type="module">
  var instance1 = new galleryBuilder(
    "Gallery1", // reference to html container with id
    [
      "./foto-1.jpg",
      "./foto-2.jpg",
      "./foto-3.jpg",
      "./foto-4.jpg",
      "./foto-5.jpg",
    ],
  );

  instance1.buildGallery();
  instance1.buildLightbox();
  instance1.buildCaptions();

  var instance2 = new galleryBuilder(
    "Gallery2", // reference to html container with id
    [
      "./foto-1.jpg",
      "./foto-2.jpg",
      "./foto-3.jpg",
      "./foto-4.jpg",
      "./foto-5.jpg",
    ],
  );

  instance2.buildGallery();
  instance2.buildLightbox();
  instance2.buildCaptions();
</script>
<body>
  <h1>Gallery example</h1>
  <br />
  <h2>Fotos 1</h2>
  <div class="Gallery" id="Gallery1"></div>
  <h2>Fotos 2</h2>
  <div class="Gallery" id="Gallery2"></div>
</body>
```

## limitations

integration of exif-js into class method, hacky at best. but it works.

## credits

based on: https://www.w3schools.com/howto/howto_js_lightbox.asp
