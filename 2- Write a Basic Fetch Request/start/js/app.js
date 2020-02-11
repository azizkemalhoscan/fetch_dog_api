const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
function fetchData(url){
  return fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .catch(error => console.log("look likes there is a poblem", error))
}

Promise.all([
  fetchData('https://dog.ceo/api/breeds/list'),
  fetchData('https://dog.ceo/api/breeds/image/random')
  ])
.then(data => {
  const breedList = data[0].message;
  const imagelist = data[1].message;
  generateOptions(breedList);
  generateimage(imagelist);
})
// ------------------------------------------
// Do not need below fetch codes since we have a Promise.all() method above
// It handles both of them together simultaniously


// fetchData('https://dog.ceo/api/breeds/list')
//   // .then(response => response.json())
//   .then(data => generateOptions(data.message))


// fetchData('https://dog.ceo/api/breeds/image/random')
//   // .then(response => response.json())
//   .then(data => generateimage(data.message))


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------


function checkStatus(response){
  // You do not need to equalize this to true since it is a value either true or false/
  if(response.ok){
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function generateOptions(data){
  console.log(data);
  const options = data.map(item =>
    `<option value='${item}'>${item}</option>`
  ).join('');
  select.innerHTML = options;
}

function generateimage(data){
  const html = `
  <img src='${data}' alt>
  <p>Click to view images of ${select.value}s</p>
  `
  card.innerHTML = html;
}

function fetchBreedimage(){
  const breed = select.value;
  const img = card.querySelector('img');
  const p = card.querySelector('p');
    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(data => {
        img.src = data.message;
        img.alt = breed;
        p.textContent = `Click here for more photos of ${breed}s`;

    })
}
console.log(select.value);
// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreedimage)
card.addEventListener('click', fetchBreedimage)
form.addEventListener('submit', postData)


// ------------------------------------------
//  POST DATA
// ------------------------------------------

// Fake api post Checked by investigating json response back on the console.

function postData(e){
  e.preventDefault();
  const name = document.getElementById('name').value;
  const comment = document.getElementById('comment').value;
  fetch('https://jsonplaceholder.typicode.com/comments',{
    method: 'POST' ,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: name , comment: comment})
  })
    .then(checkStatus)
    .then(response => response.json())
    .then(data => console.log(data))
}


