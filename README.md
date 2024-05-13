# simple gallery and lightbox creater
javascript to automatically create gallery and lightbox.

gallery            |  lightbox
:-------------------------:|:-------------------------:
![](./Screenshot1.png)  |  ![](./Screenshot2.png)

## install
install dependencies:

```bash
npm install # from package.json
```

then add these to your html:
```html
<link rel="stylesheet" href="../lightbox.css" />
<script src="node_modules/utf8/utf8.js"></script>
<script src="node_modules/exif-js/exif.js"></script>
<script src="gallerybuilder.js"></script>
```

## usage 
```html
<script type="module">
    var instance1 = new galleryBuilder(
        'Gallery1', // reference to html container with id
        [
            "./foto-1.jpg",
            "./foto-2.jpg",
            "./foto-3.jpg",
            "./foto-4.jpg",
            "./foto-5.jpg"
        ]
    );
    
    instance1.buildGallery();
    instance1.buildModal();
    
    var instance2 = new galleryBuilder(
            'Gallery2', // reference to html container with id
            [
            "./foto-1.jpg",
            "./foto-2.jpg",
            "./foto-3.jpg",
            "./foto-4.jpg",
            "./foto-5.jpg"
            ]
        );
        
    instance2.buildGallery();
    instance2.buildModal();
    
    window.onload= getExif; // adding captions to all images images
</script>
<body>
    <h1>Gallery example</h1>
        <br>
    <h2>Fotos 1 </h2>
        <div class="Gallery" id="Gallery1"></div>
    <h2>Fotos 2</h2>
        <div class="Gallery" id="Gallery2"></div>
</body>
```

## limitations
adding caption only possible for images of all galleries. currently not possible to add captions for only 1 (out of eg 2) galleries.

## credits
based on: https://www.w3schools.com/howto/howto_js_lightbox.asp
