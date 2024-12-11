const todoAll = document.querySelector('#todoList');
const addInpt = document.querySelector('.input-group');
const filterBtn = document.querySelectorAll('.filter-btn');

filterBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active')
        btn.classList.add('active')
        myfilter(btn)
    })
});


function myfilter(btn)
{
    if(btn.innerHTML == 'All')
    {
        getItems('all')
    }
    else if(btn.innerHTML == 'Completed')
    {
        getItems('complete')
    }
    else if(btn.innerHTML == 'Active')
    {
        getItems('active')
    }
}

async function getItems(filter = '')
{
    let data = await axios.get('http://127.0.0.1:8000/ApiView/GetData/')
    if (filter === 'all')
    {
        displayItem(data.data)
    }
    else if(filter === 'complete')
    {
        let filterData = data.data.filter(e => e.completed)
        displayItem(filterData)
    }
    else if(filter === 'active')
    {
        let filterData = data.data.filter(e => e.completed == false)
        displayItem(filterData)
    }
    else
    {
        displayItem(data.data)
    }
}
getItems()

function displayItem(data)
{
    todoAll.innerHTML = ''
    data.forEach(element => {
        todoAll.innerHTML += `
        <li data-completed="${element.completed}" class="todo-item ${element.completed == true? "checked":''}">
        <div class="wraperall">
        <div data-id="${element.id}" class="todo-checkbox ${element.completed == true? "checked":''}"></div>
        <div class="titleWrap">
        <span class="todo-text ">${element.title}</span>
        <p class="todo-text">${element.description}</p>
        </div>
        </div>
        <button data-id="${element.id}" class="delete-btn">×</button>
        </li>
        `
    });

    
}

todoAll.addEventListener('click', async (e) => {
    let clickedBtn = e.target
    if (clickedBtn.classList.contains('todo-checkbox')) {
        let itemId = clickedBtn.getAttribute('data-id')
        clickedBtn.classList.toggle('checked')
        clickedBtn.parentElement.parentElement.classList.toggle('checked')
        await axios.put(`http://127.0.0.1:8000/ApiView/cheack/${itemId}`)
    }
});



todoAll.addEventListener('click', async (e) => {
    let clickedBtn = e.target
    if (clickedBtn.classList.contains('delete-btn')) {
        let itemId = clickedBtn.getAttribute('data-id')
        clickedBtn.parentElement.remove()
        await axios.delete(`http://127.0.0.1:8000/ApiView/delete/${itemId}`)
    }
});


addInpt.addEventListener('submit', (e)=> {
    e.preventDefault()
    
    let title = e.target[0].value
    let description = e.target[1].value
    
    let task = {
        title: title,
        description: description,
        completed: false,
    }
    
    addItem(task)
    
    e.target[0].value = ''
    e.target[1].value = ''
})


async function addItem(task)
{
    await axios.post('http://127.0.0.1:8000/ApiView/SendData/', task)
    getItems()  
}