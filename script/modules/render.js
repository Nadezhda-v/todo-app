import {
  createRow,
  createModal,
  creteTitle,
  createForm,
  createTable,
  createButtonsGroup,
} from './createElements.js';

import {
  blockButtonSubmit,
} from './eventHandlers.js';

// Рендер задач

const renderTasks = (list, tasks) => {
  const allTasks = tasks.map(createRow);
  list.append(...allTasks);
};

// Рендер окна авторизации

const renderModal = (app) => {
  const authModal = createModal('auth').modal;
  authModal.style.display = 'block';

  app.append(authModal);
  return authModal;
};

// Рендер окна подтверждения при удалениии задач

const renderConfirmModal = () => {
  const {
    modal, cancelButton, confirmButton,
  } = createModal('confirmation');
  modal.classList.add('show');

  document.body.prepend(modal);

  return {
    modal,
    cancelButton,
    confirmButton,
  };
};

const renderTodo = (app) => {
  const title = creteTitle();
  const form = createForm();
  const {tableWrapper, table} = createTable();
  const buttonsGroupForm = createButtonsGroup([
    {
      className: 'btn btn-primary me-3',
      type: 'submit',
      text: 'Сохранить',
    },
    {
      className: 'btn btn-warning',
      type: 'reset',
      text: 'Очистить',
    },
  ]);

  const buttonSubmit = buttonsGroupForm[0];
  blockButtonSubmit(buttonSubmit);

  form.append(...buttonsGroupForm);
  app.append(title, form, tableWrapper);

  return {
    list: table.tbody,
    form,
    buttonSubmit,
    buttonReset: buttonsGroupForm[1],
  };
};

export {
  renderTasks,
  renderModal,
  renderConfirmModal,
  renderTodo,
};
