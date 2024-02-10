const main = document.querySelector('#main-scope');
const buttonList = document.querySelector('#criar-tarefa');
const input = document.querySelector('#texto-tarefa');
const dblClickText = document.querySelector('#funcionamento');
const sectionPosition = dblClickText.parentNode;
const savedListStorage = JSON.parse(localStorage.getItem('savedListStorage')) || [];

const orderList = document.createElement('ol');
orderList.id = 'lista-tarefas';
main.appendChild(orderList);

buttonList.addEventListener('click', () => {
  const valueText = input.value;
  if (valueText === '') {
    window.alert('Digite uma tarefa!');
  } else {
    const list = document.createElement('li');
    list.className = 'list';
    list.innerText = valueText;
    orderList.appendChild(list);
    input.value = '';
  }
});

document.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    buttonList.click();
  }
});

// Requisito 7 e 8

// Tentando por borbulhamento

orderList.addEventListener('click', (event) => {
  const li = event.target;
  if (li.tagName === 'LI') {
    const selectClass = document.querySelectorAll('.selected');
    selectClass.forEach((classe) => {
      classe.classList.remove('selected');
      classe.style.backgroundColor = main.style.backgroundColor;
    });
  }
  li.classList.add('selected');
  // li.style.backgroundColor = 'gray';
});

// Requisito 9

orderList.addEventListener('dblclick', (event) => {
  const li = event.target;
  li.classList.toggle('completed');
  if (li.classList.contains('completed')) {
    li.style.textDecoration = 'line-through solid black';
  } else {
    li.style.textDecoration = 'none';
  }
});

const delButton = document.createElement('button');
delButton.id = 'apaga-tudo';
delButton.innerText = 'Apaga a lista';
delButton.style.display = 'inline-block';
sectionPosition.appendChild(delButton);

// Requisito 10

delButton.addEventListener('click', () => {
  orderList.innerText = '';
  localStorage.clear('savedListStorage');
});

// Requisito 11

const removeButton = document.createElement('button');
removeButton.id = 'remover-finalizados';
removeButton.innerText = 'Finalizados';
sectionPosition.appendChild(removeButton);

removeButton.addEventListener('click', () => {
  const li = document.querySelectorAll('li');
  li.forEach((list) => {
    if (list.classList.contains('completed')) {
      orderList.removeChild(list);
    }
  });
});

// Requisito 12

const saveButton = document.createElement('button');
saveButton.id = 'salvar-tarefas';
saveButton.innerText = 'Salve a lista';
sectionPosition.appendChild(saveButton);

saveButton.addEventListener('click', () => {
  const li = document.querySelectorAll('li');
  li.forEach((list) => {
    const listText = { text: list.innerHTML, class: list.className };
    savedListStorage.push(listText);
  });
  localStorage.setItem('savedListStorage', JSON.stringify(savedListStorage));
});

const recoverTexts = () => {
  savedListStorage.forEach((listText) => {
    const recoveredText = document.createElement('li');
    recoveredText.innerHTML = listText.text;
    recoveredText.className = listText.class;
    orderList.appendChild(recoveredText);
  });
};

window.onload = recoverTexts;

// Requisito 13

const upButton = document.createElement('button');
upButton.id = 'mover-cima';
upButton.innerText = 'Suba a tarefa';
sectionPosition.appendChild(upButton);

upButton.addEventListener('click', () => {
  const selectedTask = document.querySelector('.selected');
  if (selectedTask) {
    const previousTask = selectedTask.previousElementSibling;
    if (previousTask) {
      orderList.insertBefore(selectedTask, previousTask);
    }
  }
});
const downButton = document.createElement('button');
downButton.id = 'mover-baixo';
downButton.innerText = 'Desça a tarefa';
sectionPosition.appendChild(downButton);

downButton.addEventListener('click', () => {
  const selectedTask = document.querySelector('.selected');
  if (selectedTask) {
    const nextTask = selectedTask.nextElementSibling;
    if (nextTask) {
      orderList.insertBefore(nextTask, selectedTask);
    }
  }
});

// Requisito 14

const removeSelectButton = document.createElement('button');
removeSelectButton.id = 'remover-selecionado';
removeSelectButton.innerText = 'Retire a tarefa selecionada';
sectionPosition.appendChild(removeSelectButton);

removeSelectButton.addEventListener('click', () => {
  const li = document.querySelectorAll('li');
  li.forEach((list) => {
    if (list.classList.contains('selected')) {
      orderList.removeChild(list);
    }
    localStorage.removeItem(savedListStorage);
  });
});
