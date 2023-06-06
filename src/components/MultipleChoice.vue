<template>
  <div>
    <h2>{{ question }}</h2>
    <ul>
      <li v-for="(choice, i) in choices" :key="i">
        <label>
          <input
            type="radio"
            :value="choice"
            v-model="selectedChoice"
            :name="`choice-${i}`"
          />
          {{ choice }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      required: true,
    },
    choices: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedChoice: null,
    };
  },
  watch: {
    selectedChoice(newVal) {
      this.$emit('choiceSelected', {
        questionId: this.questionId,
        choice: newVal,
      });
    },
  },
};
</script>