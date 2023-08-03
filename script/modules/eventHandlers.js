import {
  getTaskData,
  addTaskData,
  updateTaskData,
  removeTaskData,
} from './serviceStorage.js';

import {
  createBlockWithError,
  createErorrOnAuth,
  createRow,
} from './createElements.js';

import {
  renderConfirmModal,
} from './render.js';

// Валидация введенного имени при авторизации

const isValidUsername = (username) => {
  if (!username) {
    return false;
  }

  if (username.length < 3 || username.length > 20) {
    return false;
  }

  const lettersOnlyRegex = /^[A-Za-zА-Яа-я]+$/;
  return lettersOnlyRegex.test(username);
};

const authControl = (authModal, showAppContent) => {
  const buttonEnter = authModal.querySelector('.button-enter');
  const errorMessage = createErorrOnAuth();

  buttonEnter.addEventListener('click', () => {
    const inputUsername = document.querySelector('#name').value;

    if (errorMessage) {
      errorMessage.remove();
    }

    if (isValidUsername(inputUsername)) {
      showAppContent(inputUsername);
    } else {
      authModal.querySelector('.modal-body').append(errorMessage);
    }
  });
};

/* Блокировка и разблокировка кнопки "Сохранить"
  в зависимости от введенного значения в поле формы */

const handleTaskInput = (formInput, buttonSubmit) => {
  formInput.addEventListener('input', () => {
    buttonSubmit.disabled = formInput.value === '';
  });
};

// Добавление новой задачи на страницу

const addTaskPage = (newTask, list) => {
  const index = list.querySelectorAll('tr').length;
  const row = createRow(newTask, index);

  list.append(row);
};

const createTask = (form, newTaskInput, list, inputUsername) => {
  const tasks = getTaskData(inputUsername);
  const taskRepeat = tasks.some(task => task.text === newTaskInput);
  const errorMessageBlock = form.querySelector('.error-message-block');

  if (taskRepeat) {
    const blockWithError = createBlockWithError(
      'Задача с таким названием уже существует',
    );
    form.append(blockWithError);
  }

  if (newTaskInput && !taskRepeat) {
    const newTask = {
      id: Math.random().toString().substring(2, 10),
      text: newTaskInput,
      completed: false,
    };

    addTaskPage(newTask, list);
    addTaskData(inputUsername, newTask);
  }

  if (errorMessageBlock) {
    errorMessageBlock.remove();
  }
};

// Блокировка кнопки отправки формы

const blockButtonSubmit = (buttonSubmit) => {
  buttonSubmit.disabled = true;
};

// Добавление задачи и сброс формы

const handleFormSubmit = (e, form, list, buttonSubmit, inputUsername) => {
  e.preventDefault();
  const formInput = form.task;
  const newTaskInput = formInput.value;

  createTask(form, newTaskInput, list, inputUsername);
  blockButtonSubmit(buttonSubmit);
  form.reset();
};

const formControl = (
    form,
    list,
    buttonSubmit,
    buttonReset,
    inputUsername,
) => {
  form.addEventListener('submit', e => {
    handleFormSubmit(e, form, list, buttonSubmit, inputUsername);
  });

  form.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      handleFormSubmit(e, form, list, buttonSubmit, inputUsername);
    }
  });

  buttonReset.addEventListener('click', () => {
    form.reset();
    blockButtonSubmit(buttonSubmit);
  });
};

// Закрытие модального окна

const closeModal = (modal) => {
  modal.classList.toggle('show');
};

const handleCancelButton = (cancelButton, modal) => {
  cancelButton.addEventListener('click', () => {
    closeModal(modal);
  });
};

// Обновление нумерации списка задач при удалении

const updateIndexTask = (list) => {
  const allTasks = list.querySelectorAll('tr');
  allTasks.forEach((task, index) => {
    const taskIndex = task.querySelector('.task-index');
    taskIndex.textContent = index + 1;
  });
};

// Удаление задачи

const handleConfirmButton = (
    confirmButton,
    task,
    list,
    inputUsername,
    taskId,
    modal,
) => {
  confirmButton.addEventListener('click', () => {
    task.remove();
    updateIndexTask(list);
    removeTaskData(inputUsername, taskId);
    closeModal(modal);
  });
};

const taskControl = (list, inputUsername) => {
  list.addEventListener('click', e => {
    const target = e.target;
    const closestDeleteButton = target.closest('.button-del');
    const closestEndButton = target.closest('.button-end');

    if (closestDeleteButton) {
      const task = closestDeleteButton.closest('.task-item');
      const taskId = task.dataset.taskId;
      const {
        modal, cancelButton, confirmButton,
      } = renderConfirmModal();
      handleCancelButton(cancelButton, modal);
      handleConfirmButton(
        confirmButton,
        task,
        list,
        inputUsername,
        taskId,
        modal,
      );
    }

    if (closestEndButton) {
      const task = closestEndButton.closest('.task-item');
      const taskId = task.dataset.taskId;
      const taskStatus = task.querySelector('.task-status');
      const taskText = task.querySelector('.task');
      const buttonEnd = task.querySelector('.button-end');
      const isCompleted = task.classList.contains('table-success');

      updateTaskData(inputUsername, taskId);

      if (!isCompleted) {
        task.classList.remove('table-light');
        task.classList.add('table-success');
        taskStatus.textContent = 'Выполнена';
        taskText.classList.add('text-decoration-line-through');
        buttonEnd.textContent = 'Восстановить';
      } else {
        task.classList.remove('table-success');
        task.classList.add('table-light');
        taskStatus.textContent = 'В процессе';
        taskText.classList.remove('text-decoration-line-through');
        buttonEnd.textContent = 'Завершить';
      }
    }
  });
};

export {
  authControl,
  formControl,
  handleTaskInput,
  taskControl,
  blockButtonSubmit,
};
