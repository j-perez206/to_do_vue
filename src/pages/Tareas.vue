<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// Definición de estructura de tarea
export interface Tarea {
  id: number
  descripcion: string
  completed: boolean
}
// Clave para almacenar las tareas en localStorage
const STORAGE_KEY = 'tareas'

const arrayTarea = ref<Tarea[]>([])
const nuevaDescripcion = ref('')
let nextId = 1

// Crea la tarea si la descripción no está vacía
const addPost = () => {
  const texto = nuevaDescripcion.value.trim()
  if (!texto) return

  arrayTarea.value.push({
    id: nextId++,
    descripcion: texto,
    completed: false,
  })
  nuevaDescripcion.value = ''
}
// ID de la tarea que se está editando actualmente (o null si ninguna)
const editingId = ref<number | null>(null)
// Descripción temporal mientras se edita una tarea
const editingDescripcion = ref('')

const startEdit = (item: Tarea): void => {
  editingId.value = item.id
  editingDescripcion.value = item.descripcion
}

const saveEdit = (id: number): void => {
  const texto = editingDescripcion.value.trim()
  if (!texto) return

  const tarea = arrayTarea.value.find((t) => t.id === id)
  if (!tarea) return

  tarea.descripcion = texto
  editingId.value = null
  editingDescripcion.value = ''
}

const deletePost = (id: number) => {
  arrayTarea.value = arrayTarea.value.filter((t) => t.id !== id)
}
// Carga las tareas guardadas en localStorage (si existen)
onMounted(() => {
  const tareasGuardadas = localStorage.getItem(STORAGE_KEY)
  if (tareasGuardadas) {
    arrayTarea.value = JSON.parse(tareasGuardadas)
    nextId = arrayTarea.value.length > 0 ? Math.max(...arrayTarea.value.map((t) => t.id)) + 1 : 1
  }
})
// Observa los cambios en arrayTarea y los guarda en localStorage automáticamente
watch(
  arrayTarea,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true },
)
</script>

<template>
  <div class="container text-center mt-5">
    <h1>ToDo Vue</h1>
    <div id="guardarTarea">
      <h2>Añadir tarea</h2>
      <textarea v-model="nuevaDescripcion"> </textarea>
    </div>
    <br />

    <div class="btn-group">
      <button @click="addPost" class="btn btn-success">Crear</button>
    </div>
  </div>
  <br />
  <div class="container">
    <h2 class="mt-3">Lista de tareas</h2>
    <ul class="list-group mt-2">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="item in arrayTarea"
        :key="item.id"
      >
        <!-- Izquierda -->
        <div class="flex-grow-1 me-3">
          <template v-if="editingId === item.id">
            <input v-model="editingDescripcion" class="form-control" type="text" />
          </template>
          <template v-else>
            <span :class="{ completed: item.completed }">
              {{ item.descripcion }}
            </span>
          </template>
        </div>

        <!-- Derecha -->
        <div class="d-flex align-items-center gap-2">
          <template v-if="editingId === item.id">
            <button @click="saveEdit(item.id)" class="btn btn-success">Guardar</button>
          </template>
          <template v-else>
            <label class="btn btn-primary btn-sm" :for="`check-${item.id}`">
              {{ item.completed ? 'Desmarcar' : 'Completar' }}
            </label>
            <input
              class="btn-check"
              type="checkbox"
              :id="`check-${item.id}`"
              v-model="item.completed"
            />
            <button @click="startEdit(item)" class="btn btn-secondary btn-sm">Editar</button>
            <button @click="deletePost(item.id)" class="btn btn-danger btn-sm">Eliminar</button>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
h1 {
  color: peru;
}
.completed {
  text-decoration: line-through;
  color: grey;
}
</style>
