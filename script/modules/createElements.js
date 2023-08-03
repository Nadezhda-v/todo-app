const createModal = (type) => {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.id = type === 'confirmation' ? 'confirmModal' : 'authModal';
  modal.tabIndex = '-1';
  modal.setAttribute('aria-labelledby', `${type === 'confirmation' ?
    'confirmModal' : 'authModal'}Label`);
  modal.setAttribute('aria-hidden', 'true');
  if (type === 'confirmation') {
    modal.classList.add('fade');
  }

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog');
  if (type === 'confirmation') {
    modalDialog.classList.add('modal-dialog-centered', 'modal-sm');
  }

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');

  if (type === 'auth') {
    const modalTitle = document.createElement('h1');
    modalTitle.classList.add('modal-title', 'fs-5');
    modalTitle.id = 'staticBackdropLabel';
    modalTitle.textContent = 'Авторизация';

    const modalCloseButton = document.createElement('button');
    modalCloseButton.type = 'button';
    modalCloseButton.classList.add('btn-close');
    modalCloseButton.setAttribute('data-bs-dismiss', 'modal');
    modalCloseButton.setAttribute('aria-label', 'Закрыть');

    modalHeader.append(modalTitle, modalCloseButton);

    modalCloseButton.addEventListener('click', () => {
      modal.remove();
    });
  }

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  if (type === 'confirmation') {
    modalBody.classList.add('text-center');
    modalBody.textContent = 'Вы точно хотите удалить задачу?';
  }

  if (type === 'auth') {
    modalBody.insertAdjacentHTML('beforeend', `
      <p>Здравствуйте, пожалуйста представьтесь!</p>
      <input 
        class="auth-input form-control w-75" 
        name="name" 
        id="name" 
        type="text" 
        required
      >
    `);
  }

  const modalFooter = document.createElement('div');
  modalFooter.classList.add('modal-footer');

  let cancelButton; let confirmButton;

  if (type === 'confirmation') {
    modalFooter.classList.add('justify-content-center');
    cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.classList.add('btn', 'btn-secondary');
    cancelButton.textContent = 'Отмена';

    confirmButton = document.createElement('button');
    confirmButton.type = 'button';
    confirmButton.classList.add('btn', 'btn-danger');
    confirmButton.textContent = 'Удалить';

    modalFooter.append(cancelButton, confirmButton);
  }

  if (type === 'auth') {
    const buttonEnter = document.createElement('button');
    buttonEnter.type = 'button';
    buttonEnter.classList.add('btn', 'btn-primary', 'button-enter');
    buttonEnter.textContent = 'Войти';

    modalFooter.append(buttonEnter);
  }

  modalContent.append(modalHeader, modalBody, modalFooter);
  modalDialog.append(modalContent);
  modal.append(modalDialog);

  return {
    modal,
    cancelButton,
    confirmButton,
  };
};

const createContainer = () => {
  const container = document.querySelector('.app-container');
  container.classList.add(
    'vh-100',
    'w-100',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-column',
  );

  return container;
};

const creteTitle = () => {
  const title = document.createElement('h3');
  title.textContent = 'Todo App';

  const container = createContainer();
  container.append(title);

  return title;
};

const createButtonsGroup = (params) => {
  const buttons = params.map(({className, type, text}) => {
    const button = document.createElement('button');
    button.className = className;
    button.type = type;
    button.textContent = text;

    return button;
  });

  return buttons;
};

const createForm = () => {
  const form = document.createElement('form');
  form.classList.add(
    'd-flex',
    'align-items-center',
    'mb-4',
    'mt-2',
    'position-relative',
  );

  const label = document.createElement('label');
  label.classList.add('form-group', 'me-3', 'mb-0');

  const input = document.createElement('input');
  input.classList.add('form-control');
  input.type = 'text';
  input.placeholder = 'Создать задачу';
  input.name = 'task';

  form.append(label);
  label.append(input);

  return form;
};

const createTable = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const thead = document.createElement('thead');
  const tr = document.createElement('tr');

  const thNumber = document.createElement('th');
  thNumber.classList.add('col-sm-1');
  thNumber.textContent = '№';

  const thTask = document.createElement('th');
  thTask.classList.add('col-sm-4');
  thTask.textContent = 'Задача';

  const thSatus = document.createElement('th');
  thSatus.classList.add('col-md-2', 'col-sm-2');
  thSatus.textContent = 'Статус';

  const thActions = document.createElement('th');
  thActions.classList.add('col-md-5', 'col-sm-5');
  thActions.textContent = 'Действия';

  const tbody = document.createElement('tbody');

  tableWrapper.append(table);
  table.append(thead, tbody);
  thead.append(tr);
  tr.append(
    thNumber,
    thTask,
    thSatus,
    thActions,
  );

  table.tbody = tbody;

  return {
    tableWrapper,
    table,
  };
};

const createRow = ({id, text: taskText, completed}, index) => {
  const tr = document.createElement('tr');
  tr.classList.add('table-light', 'task-item');
  tr.dataset.taskId = id;

  const tdNumber = document.createElement('td');
  tdNumber.classList.add('task-index');
  tdNumber.textContent = index + 1;

  const tdTask = document.createElement('td');
  tdTask.classList.add('task');
  tdTask.textContent = taskText;

  const tdStatus = document.createElement('td');
  tdStatus.classList.add('task-status');
  tdStatus.textContent = completed ? 'Выполнена' : 'В процессе';

  const tdbuttons = document.createElement('td');

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('d-flex', 'justify-content-center');

  const buttonsGroup = createButtonsGroup([
    {
      className: 'btn btn-danger me-2 button-del',
      type: 'button',
      text: 'Удалить',
    },
    {
      className: 'btn btn-success w-100 button-end',
      type: 'button',
      text: completed ? 'Восстановить' : 'Завершить',
    },
  ]);

  buttonWrapper.append(...buttonsGroup);
  tdbuttons.append(buttonWrapper);
  tr.append(
    tdNumber,
    tdTask,
    tdStatus,
    tdbuttons,
  );

  if (completed) {
    tr.classList.remove('table-light');
    tr.classList.add('table-success');
    tdTask.classList.add('text-decoration-line-through');
  } else {
    tr.classList.remove('table-success');
    tr.classList.add('table-light');
    tdTask.classList.remove('text-decoration-line-through');
  }

  return tr;
};

const createBlockWithError = (text) => {
  const blockWithError = document.createElement('span');
  blockWithError.classList.add(
    'text-danger',
    'error-message-block',
    'position-absolute',
    'top-100',
  );
  blockWithError.style.fontSize = '0.8rem';
  blockWithError.textContent = text;

  return blockWithError;
};

// Создание блока с ошибкой при авторизации

const createErorrOnAuth = () => {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('alert', 'alert-danger', 'mt-3');
  errorMessage.textContent = `
    Неправильное имя пользователя. Пожалуйста, введите корректное имя
  `;

  return errorMessage;
};


export {
  createRow,
  createModal,
  creteTitle,
  createForm,
  createTable,
  createButtonsGroup,
  createBlockWithError,
  createErorrOnAuth,
};
