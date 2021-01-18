function pageRender() { document.addEventListener('DOMContentLoaded', function(e) {
    fetch('http://localhost:3000/monsters/?_limit=50')
    .then(response => response.json())
    .then(data => createMonsterDivs(data))
})
}
pageRender()

const header = document.querySelector('#head')
const lefty = document.querySelector('#back')
const righty = document.querySelector('#forward')

const createMonsterForm = document.createElement('form')
createMonsterForm.innerHTML = `
    <h3>Create a Monster!</h3>
    <input type="text" name="name" value="" placeholder="Enter monster name" class="input-text"/>
    <input type="text" name="age" value="" placeholder="Enter monster age" class="input-text"/>
    <input type="text" name="description" value="" placeholder="Enter monster description" class="input-text"/>
    <input type="submit" name="submit" value="Create New Monster" class="submit"/>
    `

head.append(createMonsterForm)
const monsterContainer = document.querySelector('#monster-container')

function createMonsterDivs(monsterArray) {
    monsterArray.forEach(monster => {
      monsterContainer.innerHTML += `
      <div class="card" data-id=${monster.id}>
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>${monster.description} </p>
      </div>
    ` 
    });
  }

  createMonsterForm.addEventListener('submit', function(e) {
    e.preventDefault()

    monsterName = e.target.name.value
    monsterAge = e.target.age.value
    monsterDescription = e.target.description.value

    const data = { 
        name: monsterName,
        age: monsterAge,
        description: monsterDescription
    };
        //console.log(data)

    fetch('http://localhost:3000/monsters', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    renderNewMonster(data)
      e.target.reset()
  })


lefty.addEventListener('click', function(e) {
    lefty.textContent = 'Thanks for clicking Lefty! Have a nice day!'
})

righty.addEventListener('click', function(e) {
    righty.textContent = 'Thanks for clicking Righty! Have a nice day!'
})

function renderNewMonster(monster) {
   
      let newMonster = document.createElement('div')
      newMonster.classList.add('card')
      newMonster.dataset.id = monster.id
      
      newMonster.innerHTML += `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>${monster.description} </p>
    ` 
    monsterContainer.append(newMonster)
  }










