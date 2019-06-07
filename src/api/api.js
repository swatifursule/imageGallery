import axios from "axios";
import uuid from 'uuid';
const BASE_URL = `http://localhost:3020/images`


export function fetchImages(tag) {
    const url = `${BASE_URL}?format=json&tags=${tag}`
    console.log('The url for the request is: ',url)

    return axios({
        method: "get",
        url
    });
}

export function handleFlickrResponseItem({
                                      title,
                                      link,
                                      author,
                                      tags,
                                      media:{
                                          m:thumbnail
                                      }
                                  }) {
    const startIndex = author.indexOf("(") + 1
    const endIndex = author.indexOf(")");
    author = author.substr(startIndex,endIndex)
    tags = tags.split(" ")
    return {
        title,
        link,
        thumbnail,
        tags,
        author
    }
}

export function handleFlickrResponse({data}) {
    return data.items.map(handleFlickrResponseItem)
}

export function addKeyToThumbnails(items) {
    return items.map(item => {
        item.key = uuid.v1();
        item.tags = addKeyToTags(item)
        return item;
    })
}

export function addKeyToTags(item) {
    return item.tags.map(tag => ({
        value:tag,
        key:uuid.v1()
    }))
}