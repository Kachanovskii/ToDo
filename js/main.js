const form = document.querySelector('#new-task');
const input = document.querySelector('#addNewTask');
const tasksList = document.querySelector('#list-group');

form.addEventListener('submit', function(event){
    event.preventDefault(); //відміняє стандартне поводження

    let taskText = input.value; //виводить значення що ввів користувач;
    // "    текст    " = "текст"
    taskText = taskText.trim();
    
    //формуєм розмітку для нової задачі
    const taskHTML = `<li class="list-group-item d-flex justify-content-between"><span contenteditable="true" class="task-title">${taskText}</span>
    <div>
    <button type="button" data-action="ready" class="btn btn-light align-self-end">Виконано</button>
    <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Видалити</button>
    <div>
    </li>`;

    //добавляєм нову задачу на сторінку
    tasksList.insertAdjacentHTML('afterbegin', taskHTML);

    //очищаєм поле додавання нового завдання
    input.value = "";

    //фокус на вводі після додавання нвого завдання
    input.focus();

    //скриваєм або показуєм блок "список спарв пустий"
    toggleEmptyListItem();

    //показати нотифікації
    showNotification("new");
   
})

//відслідковуємо клік по всьому списку з завданнями
tasksList.addEventListener('click', function(event){
    //перевіряєм що клік відбувася по кнопці
    if(event.target.getAttribute('data-action')=='delete-task'){
        //знаходимио батьківській тег li і видаляєм його
        event.target.closest(".list-group-item").remove();
        toggleEmptyListItem();
        //показти нотифікацію
        showNotification("delete");
    }
    else if(event.target.getAttribute('data-action')=='ready'){
        //Знаходимо батьківський елемент <li>
        const parentElement = event.target.closest(".list-group-item");
        //добавляєм до тега span додатковий клас
        parentElement.querySelector(".task-title").classList.add("task-title-done");
        //Змінюєм значення в атрибута contenteditable
        parentElement.querySelector(".task-title").setAttribute("contenteditable", "false");
        //переміщаєм завдання в низ списка
        tasksList.insertAdjacentElement("beforeend", parentElement);
        //видаляєм кнопку "виконано"
        event.target.remove(); 
        //Запускаєм нотифікацію
        showNotification ("ready")
    }
})

function toggleEmptyListItem (){
    if(tasksList.children.length > 1){
        document.querySelector('#empty-list-item').style.display="none"; 
    }
    else{
        document.querySelector('#empty-list-item').style.display="block"; 
    }
}

function showNotification (type){
    
    let newElement =document.createElement("div");

    switch(type){
        case "new":
            newElement.className = "alert alert-warning";
            newElement.textContent = "Завдання добавлено!";
            break;
        case "delete":
            newElement.className = "alert alert-danger";
            newElement.textContent = "Завдання видалено!";
            break;
        case "ready":
            newElement.className = "alert alert-primary";
            newElement.textContent = "Завдання виконано!";
            break;
    }

    document.querySelector("#notify-holder").insertAdjacentElement('afterbegin', newElement);

    setTimeout(function(){
        newElement.style.opacity="1";
    },300);
    setTimeout(function(){
        newElement.style.opacity="0";
    },2300);
    setTimeout(function(){
        newElement.remove();
    },2600);
};

