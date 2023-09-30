const inputSearch = document.querySelector('.input__search')
const searchBtn = document.querySelector('.header__searching-btn')
let images = document.querySelectorAll('.main__image img')
const column1 = document.getElementById('col-1')
const column2 = document.getElementById('col-2')
const column3 = document.getElementById('col-3')
const inputValue = inputSearch.value

const apiKey = 'r-Tu2RtR9_xFbVGl9XLmQ3UdftZ3YEtiyt3zs48JwcU'
const reqUrl = 'https://api.unsplash.com/photos/?client_id='+apiKey+'&per_page=28&page=1'
let searchUrl = 'https://api.unsplash.com/search/photos/?client_id='+apiKey+'&per_page=30&page=1&query='

window.onload = (event) =>{
    getData()
}

let imageArray = []

const getData = async () => {
    const res = await fetch(reqUrl);
    const data = await res.json();
    // console.log(data)   
    data.forEach(el =>{
    imageArray.push(el.urls.regular)
        // if(el.description === null || el.description === ""){
        //     images[index].alt = 'Image'
        // } else{
        //     images[index].alt = el.description;
        // }
    })
    showImage()

}

function showImage(){
    const errorImages = document.querySelector('.zero__images')
    errorImages.innerHTML = ''
    if(imageArray.length === 0){
        return errorImages.innerHTML = '<h3> Unable to find searching value</h3>'
    }
     
    column1.innerHTML = ''
    column2.innerHTML = ''
    column3.innerHTML = ''

    imageArray.forEach((el, index)=>{
       
        let image = document.createElement('img')
        image.src = el
        image.className = 'distance'
        image.setAttribute("width", "100%")

        if ((index + 1) %3 == 0) {
         column1.appendChild(image)   
        }
        if ((index + 2) %3 == 0) {
            column2.appendChild(image)   
        }
        if ((index + 3) %3 == 0) {
        column3.appendChild(image)   
        }
    })
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (inputSearch.value !== '') {
      getSearchData(inputSearch.value);
      inputSearch.value = ''
    }
  });

const getSearchData = async (key) => {
    imageArray = []
    const res = await fetch(searchUrl+key);
    const data = await res.json();
    console.log(data)
    data.results.forEach(el =>{ 
        imageArray.push(el.urls.regular)
    })
    showImage()
}
