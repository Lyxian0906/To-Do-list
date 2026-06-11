document.addEventListener("DOMContentLoaded", () => {
const input = document.getElementById("taskInput");
const subInput = document.getElementById("subtaskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const category = document.getElementById("category");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// guardar
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// render
function render() {
  list.innerHTML = "";

  tasks.forEach((task, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <strong>${task.text}</strong>
        <span class="category">(${task.cat})</span>

        <div class="subtasks">
          ${task.subtasks.map((st, j) => `
            <label class="subtask ${st.done ? "done" : ""}">
              <input type="checkbox" ${st.done ? "checked" : ""}>
              ${st.text}
            </label>
          `).join("")}
        </div>
      </div>

      <div class="actions">
        <button class="addSub">➕</button>
        <button class="edit">✏️</button>
        <button class="delete">✖</button>
      </div>
    `;

    // toggle tarea principal
    li.addEventListener("click", (e) => {
      if (e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON") {
        task.done = !task.done;
        save();
        render();
      }
    });

    // toggles subtareas
    li.querySelectorAll("input").forEach((cb, j) => {
      cb.addEventListener("change", () => {
        task.subtasks[j].done = cb.checked;
        save();
      });
    });

    // añadir subtarea
    li.querySelector(".addSub").onclick = () => {
      const text = prompt("Nueva nota:");
      if (!text) return;

      task.subtasks.push({ text, done: false });
      save();
      render();
    };

    // editar tarea
    li.querySelector(".edit").onclick = () => {
      const newText = prompt("Editar tarea:", task.text);
      if (newText) {
        task.text = newText;
        save();
        render();
      }
    };

    // borrar
    li.querySelector(".delete").onclick = () => {
      tasks.splice(i, 1);
      save();
      render();
    };

    list.appendChild(li);
  });
}

// añadir tarea
const bgMusic3 = document.getElementById("bgMusic3");

bgMusic3.volume = 0.4;

addBtn.addEventListener("click", () => {

    // 1. SONIDO
    bgMusic3.currentTime = 0; // reinicia el sonido
    bgMusic3.play();

    // 2. TU LÓGICA DE AÑADIR TAREA
    const text = input.value.trim();
    if (!text) return;

    const sub = subInput.value.trim();

    tasks.push({
        text,
        cat: category.value,
        done: false,
        subtasks: sub ? [{ text: sub, done: false }] : []
    });

    input.value = "";
    subInput.value = "";

    save();
    render();
});

const themeBtn = document.getElementById("themeBtn");

// Cargar tema guardado
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️";
    }else{
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙";
    }

});

const logo = document.getElementById("logo");

const bgMusic = document.getElementById("bgMusic");
const bgMusic2 = document.getElementById("bgMusic2");

bgMusic.volume = 0.2;
bgMusic2.volume = 0.15;

let music1Playing = false;
let music2Playing = false;
let music3Playing = false;

/* =========================
   MUSICA 1 (LOGO)
========================= */
logo.addEventListener("click", () => {

    if (!music1Playing) {
        bgMusic.play();
        music1Playing = true;
    } else {
        bgMusic.pause();
        music1Playing = false;
    }

});

/* =========================
   MUSICA 2 (BOTON)
========================= */
const musicBtn2 = document.getElementById("musicBtn2");

musicBtn2.addEventListener("click", () => {

    if (!music2Playing) {
        bgMusic2.play();
        music2Playing = true;
        musicBtn2.textContent = "⏸️ Música fondo";
    } else {
        bgMusic2.pause();
        music2Playing = false;
        musicBtn2.textContent = "🎵 Música fondo";
    }

});


render();

});