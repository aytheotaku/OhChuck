const btn = document.querySelector('.generate');
const joke = document.querySelector('.joke');
const select = document.querySelector('.dom-select');
const loader = document.querySelector('.myLoader');
const jokeSection = document.querySelector('.joke-section');
const errorSection = document.querySelector('.error');


// DECIDED TO USE AXIOS FOR MY HTTP REQUEST JUST TO GET A FEEL OF HOW IT WORKS.
// LOL PLUS I REALLY HATE THE EXTRA STEP OF PARSING TO JSON FIRST. I'M TOO LAZY FOR THAT PLIX DON'T STRESS ME

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

    try{
        let { data } = await axios.get(`https://api.chucknorris.io/jokes/random?category=${select.value}`);
        return data.value;
    }
    catch(error){
        console.log(error.message, 'Check your network my gee');
        hideLoader();
        createError();
       
    }
  
    // try {
    //     let joke = await fetch(`https://api.chucknorris.io/jokes/random?category=${select.value}`)
    //     let jsonJoke = await joke.json();
    //     return jsonJoke
    // } catch (error) {
    //     console.log(`Please Check your network `, error.message);
    //     hideLoader();
    //     createError()
    // }
}

async function implement(){
    try {
        hideJoke()
        showLoader()
        let { data } =  await axios.get(`https://api.chucknorris.io/jokes/random?category=${select.value}`);
        joke.innerText  = data.value;
        hideLoader();
        showJoke(); 
    } 
    catch (error) {
        console.log(error.message)
        hideLoader();
        createError();
    }
}




btn.addEventListener('click', implement);

