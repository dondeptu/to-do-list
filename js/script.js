{
    let hideDoneTask = false;
    let tasks = [
        {
            content: "lekcja pianina",
            done: true,
        },
        {
            content: "spotkanie 16:30",
            done: false,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent }];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const checkAllTaskDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTask = () => {
        hideDoneTask = !hideDoneTask;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTask = () => {
        let htmlTasksList = "";

        for (const task of tasks) {
            htmlTasksList += `
                <li class="tasks__items ${task.done && hideDoneTask ? "tasks__items--hidden" : ""} js-task">
                    <button class="tasks__button js-done">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
                        ${task.content}
                    </span>
                    <button class="tasks__button tasks__button--remove js-remove">
                        🗑
                    </button>
                </li>
            `;
        }

        document.querySelector(".js-task").innerHTML = htmlTasksList;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (tasks.length === 0) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
            <button class="section__buttons js-toggleHideDone">
                ${hideDoneTask ? "Pokaż" : "Ukryj"}
                ukończone
            </button>
            <button class="section__buttons js-checkAllDone"
                ${tasks.every(({ done }) => done) ? "disabled" : ""}
            >
                Ukończ wszystkie
            </button>
            `;
    };

    const bindButtonsEvents = () => {
        const checkAllDoneButton = document.querySelector(".js-checkAllDone");

        if (checkAllDoneButton) {
            checkAllDoneButton.addEventListener("click", checkAllTaskDone);
        }

        const toggleHideDoneTaskButon = document.querySelector(".js-toggleHideDone");

        if (toggleHideDoneTaskButon) {
            toggleHideDoneTaskButon.addEventListener("click", toggleHideDoneTask);
        }
    };

    const render = () => {
        renderTask();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
        newTaskElement.focus();
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}