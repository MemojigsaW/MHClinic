import shuffle from "../SignUp/shuffle_array";


const image1 = process.env.PUBLIC_URL + '/image/User/background_1.jpg'
const image2 = process.env.PUBLIC_URL + '/image/User/background_2.jpg'
const image3 = process.env.PUBLIC_URL + '/image/User/background_3.jpg'
const image4 = process.env.PUBLIC_URL + '/image/User/background_4.jpg'
const image5 = process.env.PUBLIC_URL + '/image/User/background_5.jpg'
const image6 = process.env.PUBLIC_URL + '/image/User/background_6.jpg'
const image7 = process.env.PUBLIC_URL + '/image/User/background_7.jpg'
const image8 = process.env.PUBLIC_URL + '/image/User/background_8.jpg'

// https://stackoverflow.com/a/9071606/13831448

let img_list = shuffle([image1, image2, image3, image4, image5, image6, image7, image8])

export default function randomBackgroundPics() {
    const index = Math.floor(Math.random() * img_list.length);
    return img_list[index];
}