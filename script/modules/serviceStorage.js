// Получение задач из localStorage

const getTaskData = (key) => {
  const tasks = JSON.parse(localStorage.getItem(key));
  return tasks || [];
};

// Запись задач в localStorage

const setTaskData = (key, tasks) => {
  localStorage.setItem(key, JSON.stringify(tasks));
};

const addTaskData = (key, data) => {
  const tasks = getTaskData(key);
  tasks.push(data);
  setTaskData(key, tasks);
};

// Поиск индекса задачи по id

const findTaskIndexById = (inputUsername, taskId) => {
  const tasks = getTaskData(inputUsername);
  const dataIndex = tasks.findIndex(task => task.id === taskId);
  return {tasks, dataIndex};
};

// Удаление задач из localStorage

const removeTaskData = (inputUsername, taskId) => {
  const {tasks, dataIndex} = findTaskIndexById(inputUsername, taskId);
  if (dataIndex !== -1) {
    tasks.splice(dataIndex, 1);
    setTaskData(inputUsername, tasks);
  }
};

// Обновление у задачи complete в localStorage

const updateTaskData = (inputUsername, taskId) => {
  const {tasks, dataIndex} = findTaskIndexById(inputUsername, taskId);

  if (dataIndex !== -1) {
    tasks[dataIndex].completed = !tasks[dataIndex].completed;
    setTaskData(inputUsername, tasks);
  }
};

export {
  getTaskData,
  addTaskData,
  updateTaskData,
  removeTaskData,
};
