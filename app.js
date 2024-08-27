import Alpine from "alpinejs";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
  Alpine.data("taskList", () => ({
    tasks: [],
    currentTask: { id: null, title: "", description: "", completed: false },
    modalOpen: false,
    modalMode: "add", // 'add' o 'edit'
    searchTerm: '',

    async fetchTasks() {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        const result = await response.json();
        this.tasks = result.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },

    async saveTask() {
      try {
        const url =
          this.modalMode === "edit"
            ? `http://localhost:3000/tasks/${this.currentTask.id}`
            : "http://localhost:3000/tasks";

        const method = this.modalMode === "edit" ? "PATCH" : "POST";
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.currentTask),
        });

        if (response.ok) {
          this.modalOpen = false;
          this.currentTask = {
            id: null,
            title: "",
            description: "",
            completed: false,
          };
          this.fetchTasks();
        } else {
          console.error("Error saving task:", await response.text());
        }
      } catch (error) {
        console.error("Error saving task:", error);
      }
    },

    openModal(
      mode,
      task = { id: null, title: "", description: "", completed: false }
    ) {
      this.modalMode = mode;
      this.currentTask = { ...task };
      this.modalOpen = true;
    },

    async deleteTask(id) {
      try {
        await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "DELETE",
        });
        this.fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },

    get filteredTasks() {
      return this.tasks.filter(task => {
        const completedText = task.completed ? 'completada' : 'incompleta';
        return (
          task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          completedText.includes(this.searchTerm.toLowerCase()) ||
          task.id.toString().includes(this.searchTerm.toLowerCase())
        );
      });
    },

  }));
});

Alpine.start();
