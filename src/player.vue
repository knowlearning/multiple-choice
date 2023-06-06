<template>
  <h2>{{ question }}</h2>
  <ul>
    <li v-for="(c, i) in choices" :key="i">
      <label>
        <input
          type="radio"
          :value="i"
          v-model="choice"
        />
        {{ c }}
      </label>
    </li>
  </ul>
</template>


<script>
export default {
  props: {
    question: String,
    answer: Number,
    choices: Array
  },
  data: () => ({
    choice: null,
    correct: false
  }),
  watch: {
    choice() {
      this.correct = this.choice === this.answer
    }
  }
}
</script>

<style>
.active {
  background: yellow;
}
</style>