const inputSearch = document.querySelector('.input__search')
const searchBtn = document.querySelector('.header__searching-btn')
let images = document.querySelectorAll('.main__image img')
const inputValue = inputSearch.value

window.onload = (event) =>{
    getData()
}

const reqUrl = 'https://api.unsplash.com/search/photos?client_id=r-Tu2RtR9_xFbVGl9XLmQ3UdftZ3YEtiyt3zs48JwcU&query=chicken'

const getData = async () => {
    const res = await fetch(reqUrl);
    const data = await res.json();
    console.log(data)
    const results = data.results
    results.forEach((el, index) =>{
        images[index].src = el.urls.regular;
        if(el.description === null || el.description === ""){
            images[index].alt = 'Image'
        } else{
            images[index].alt = el.description;
        }
    })
  }

