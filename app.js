const btn = document.querySelector('.generate');
const joke = document.querySelector('.joke');
const select = document.querySelector('.dom-select');
const loader = document.querySelector('.myLoader');
const jokeSection = document.querySelector('.joke-section');
const errorSection = document.querySelector('.error');

let showLoader = () => {
    loader.classList.add('show');
}

let hideLoader = () => {
    loader.classList.remove('show')
}

let showJoke = () => {
    jokeSection.classList.add('show');
}

let hideJoke = () => {
    jokeSection.classList.remove('show');
}

let createError = () => {
    let p = document.createElement('p')
    p.appendChild(document.createTextNode(`Please check your network`));
    p.style.marginTop = "10px";
    p.style.color = "red";
    errorSection.appendChild(p);
    setTimeout(()=>{p.remove()}, 1000);
}

let getJoke = async () => {
    try {
        let joke = await fetch(`https://api.chucknorris.io/jokes/random?category=${select.value}`)
        let jsonJoke = await joke.json();
        return jsonJoke
    } catch (error) {
        console.log(`Please Check your network `, error.message);
        hideLoader();
        createError()
    }
}

async function implement(){
    hideJoke();
    showLoader();
    let norrisJoke = await getJoke();
    joke.innerText = norrisJoke.value;
    hideLoader();
    showJoke();
}


btn.addEventListener('click', implement);

