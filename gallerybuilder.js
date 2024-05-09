export class galleryBuilder {
    constructor(id, links) {
    this._id = id
    this._list = links
    }

    build() {
        let gallery = document.getElementById(this._id)
        for (let x in this._list) {
            let figure = gallery.appendChild(document.createElement('figure'))
            let image = figure.appendChild(document.createElement('img'))
            figure.appendChild(document.createElement('figcaption'))
            image.setAttribute('src', x)
        }
    }

}