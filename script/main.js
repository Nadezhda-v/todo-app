import {
  renderTasks,
  renderModal,
  renderTodo,
} from './modules/render.js';

import {
  authControl,
  formControl,
  handleTaskInput,
  taskControl,
} from './modules/eventHandlers.js';

import {
  getTaskData,
} from './modules/serviceStorage.js';

{
  const init = (selectorApp) => {
    const app = document.querySelector(selectorApp);
    const authModal = renderModal(app);

    const showAppContent = (inputUsername) => {
      authModal.remove();
      const {
        list,
        form,
        buttonSubmit,
        buttonReset,
      } = renderTodo(app);

      const tasks = getTaskData(inputUsername);
      renderTasks(list, tasks);

      formControl(form, list, buttonSubmit, buttonReset, inputUsername);
      handleTaskInput(form.task, buttonSubmit);
      taskControl(list, inputUsername);
    };

    authControl(authModal, showAppContent);
  };

  window.todoInit = init;
}
