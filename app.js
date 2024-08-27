import Alpine from "alpinejs";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
  Alpine.data("taskList", () => ({
    tasks: [],
    currentTask: { id: null, title: "", description: "", completed: false },
    modalOpen: false,
    modalMode: "add", // 'add' o 'edit'
    deleteModalOpen: false,
    taskToDelete: null,
    searchTerm: '',
    toastMessage: '',
    toastType: '',
    showToast: false,

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
          this.showToast = true;
          this.toastMessage = 'Tarea guardada exitosamente.';
          this.toastType = 'success';
          setTimeout(() => {
            this.showToast = false;
          }, 3000);
        } else {
          console.error("Error saving task:", await response.text());
          this.modalOpen = false;
          this.showToast = true;
          this.toastMessage = 'Error al guardar la tarea.';
          this.toastType = 'danger';
          setTimeout(() => {
            this.showToast = false;
          }, 3000);
        }
      } catch (error) {
        console.error("Error saving task:", error);
        this.modalOpen = false;
        this.showToast = true;
        this.toastMessage = 'Error al guardar la tarea.';
        this.toastType = 'danger';
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      }
    },
//******************* */
    openModal(
      mode,
      task = { id: null, title: "", description: "", completed: false }
    ) {
      this.modalMode = mode;
      this.currentTask = { ...task };
      this.modalOpen = true;
    },

    openDeleteModal(id) {
      this.taskToDelete = id;
      this.deleteModalOpen = true;
    },

    async confirmDeletion() {
      if (this.taskToDelete === null) return;

      try {
        await fetch(`http://localhost:3000/tasks/${this.taskToDelete}`, {
          method: "DELETE",
        });
        this.fetchTasks();
        this.deleteModalOpen = false;
        this.showToast = true;
        this.toastMessage = 'Tarea eliminada exitosamente.';
        this.toastType = 'success';
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      } catch (error) {
        console.error("Error deleting task:", error);
        this.deleteModalOpen = false;
        this.showToast = true;
        this.toastMessage = 'Error al eliminar la tarea.';
        this.toastType = 'danger';
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
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
