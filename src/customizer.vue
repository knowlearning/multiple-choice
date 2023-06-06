<template>
  <div>
    Question: <input v-model="question" />
    <ul>
      <li
        v-for="_, i in choices"
        :key="i"
      >
        <input type="radio" :value="i" v-model="answer" />
        <input type="text" v-model="choices[i]" />
        <button @click="choices.splice(i, 1)">x</button>
      </li>
      <li>
        <input type="radio" disabled />
        <button @click="choices.push('')">+</button>
      </li>
    </ul>
    <button @click="save">Save</button>
    <hr>
    <div
      v-for="id, index in tasks"
      :key="id"
      :class="{ active: id === active }"
    >
      {{ id }}
      <button @click="previewTask(id)">view</button>
      <button @click="makeActive(id)">edit</button>
      <button @click="removeTask(index)">x</button>
    </div>
    <button
      v-if="edited"
      @click="createNew"
    >
      new
    </button>
  </div>
</template>


<script>
export default {
  data: () => ({
    playing: null,
    tasks: [],
    active: null,
    answer: null,
    question: "",
    choices: []
  }),
  computed: {
    edited() {
      return !(this.question === "" && this.choices.length === 0)
    }
  },
  methods: {
    async makeActive(id) {
      const task = await Agent.download(id).then(r => r.json())
      this.question = task.question
      this.answer = task.answer
      this.choices = task.choices
    },
    async save() {
      const { question, answer, choices } = this
      const data = JSON.stringify({ question, answer, choices }, null, 4)
      const type = 'application/json;syntax=asdf-test.multiple-choice'
      const name = 'mc-question-' + Date.now()
      const id = await Agent.upload(name, type, data)
      this.tasks.push(id) 
    },
    async createNew() {
      this.question = ""
      this.answer = null
      this.choices = []
    },
    previewTask(id) {
      window.location.href = `/${id}`
    },
    removeTask(index) {
      if (confirm('are you sure?')) this.tasks.splice(index, 1)
    }
  }
}
</script>

<style>
.active {
  background: yellow;
}
</style>