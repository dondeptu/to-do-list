{
    const tasks = [
        {
            content: "zrobić obiad",
            done: false,
        },
        {
            content: "kupić chleb",
            done: true,
        },
    ];

    const render = () => {
        let htmlStrings = "";

        for (const task of tasks) {
            htmlStrings += `
                <li>
                    <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
                        ${task.content}
                    </span>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlStrings;
    };

    const addNeTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        }

        addNeTask(newTaskContent);
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}