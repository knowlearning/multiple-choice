<template>
    <div>
        <input v-model="question">
        <input v-model="answer">
          <div>
            <h2>Choices:</h2>
            <div v-for="(c, i) in choices">
                <input v-model="choices[i]" :key="i" @change="updateChoice">
                <button @click="removeChoice(i)">Remove</button>
            </div>
            <button @click="addChoice">
                New Choice
            </button>
        </div>
        <button @click="addQuestion">Add Question</button>
    </div>
</template>

<script>
export default {
    data: () => ({
        question: 'your question',
        choices: [],
        answer: 'your answer'
    }),
    methods: {
        updateChoice(e) {
            console.log(e, e.target.value)
            this.choices = [...this.choices]
        },
        removeChoice(i) {
            this.choices.splice(i, 1)
        },
        addChoice(i) {
            this.choices.push( 'new choice' )
        },
        addQuestion() {
            this.$emit('addQuestion', {
                question: this.question,
                answer: this.answer,
                choices: [ ...this.choices ]
            })
        }
    }
}
</script>