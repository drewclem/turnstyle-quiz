<template>
  <div class="mb-12">
    <form
      id="quiz"
      :class="`relative ${
        isDarkMode ? 'border border-white' : 'bg-white drop-shadow-lg'
      } p-6 lg:p-12 `"
    >
      <div class="absolute left-0 right-0 top-0 w-full flex">
        <div
          v-for="(question, index) in questions"
          :key="index"
          :class="`${
            index <= currentQuestionIndex ? 'bg-green-500' : 'bg-gray-300'
          } h-1 flex-grow`"
        ></div>
      </div>

      <div v-if="!reviewAnswers">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-2xl xl:text-4xl">Quiz</h2>

          <button
            @click="clearQuiz"
            class="underline opacity-50 hover:opacity-100"
            type="button"
          >
            Reset Quiz
          </button>
        </div>

        <div class="flex flex-col h-36">
          <label class="grid lg:grid-cols-2 gap-6 lg:gap-12">
            <h3 class="text-xl mb-6">
              {{ currentQuestion.label }}
            </h3>

            <BaseInput
              class="w-full"
              v-if="
                currentQuestion.type === 'text' ||
                currentQuestion.type === 'email'
              "
              :type="currentQuestion.type"
              v-model="answers[currentQuestionIndex + 1]"
              :value="currentQuestion.answer"
            />

            <BaseSelect
              class="w-full"
              v-if="currentQuestion.type === 'select'"
              :options="currentQuestion.options"
              v-model="answers[currentQuestionIndex + 1]"
            />

            <BaseRadioGroup
              v-if="currentQuestion.type === 'radio'"
              v-model="answers[currentQuestionIndex + 1]"
              :value="currentQuestionIndex"
            >
              <BaseRadio
                v-for="(option, index) in currentQuestion.options"
                :key="index"
                :value="option"
              >
                {{ option }}
              </BaseRadio>
            </BaseRadioGroup>

            <date-picker
              class="w-full"
              v-model="answers[currentQuestionIndex + 1]"
              v-if="currentQuestion.type === 'datepicker'"
            />
          </label>
        </div>

        <div class="flex justify-between mt-6">
          <button
            v-if="
              currentQuestionIndex > 0 &&
              currentQuestionIndex < questions.length - 1
            "
            class="btn"
            type="button"
            @click="prevQuestion"
          >
            Previous Question
          </button>
          <button
            v-if="currentQuestionIndex < questions.length - 1"
            class="btn ml-auto"
            type="button"
            @click="saveAnswer"
          >
            Next Question
          </button>

          <button
            class="btn ml-auto"
            v-if="currentQuestionIndex === questions.length - 1"
            type="button"
            @click="reviewAnswers = true"
          >
            Review answers
          </button>
        </div>

        <div class="flex space-x-2 justify-center mt-4">
          <button
            v-for="(question, index) in questions"
            :key="index"
            :class="`${isDarkMode ? 'dark-mode' : 'light-mode'} ${
              currentQuestionIndex === index
                ? 'opacity-100'
                : 'opacity-25 hover:opacity-50'
            } h-2 w-2 rounded-full`"
            @click="setCurrentIndex(index)"
            type="button"
          >
            <span class="sr-only">Go to question number {{ index + 1 }}</span>
          </button>
        </div>
      </div>

      <div v-else>
        <div class="flex justify-between items-center">
          <div>
            <div class="flex justify-between items-center mb-12">
              <h2 class="text-2xl xl:text-4xl">Review your answers</h2>
              <div>
                <button
                  class="btn"
                  @click="reviewAnswers = false"
                  type="button"
                >
                  Edit answers
                </button>
              </div>
            </div>

            <ul>
              <li
                class="grid lg:grid-cols-2 gap-6 mb-6"
                v-for="(question, index) in questions"
                :key="index"
              >
                <p class="w-3/4 opacity-75">{{ question.label }}</p>
                <p class="font-bold">{{ question.answer }}</p>
              </li>
            </ul>
          </div>
        </div>

        <button class="btn mt-6" type="submit" @click.prevent="submitForm">
          Submit Answers
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      answers: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
        10: null,
      },
      reviewAnswers: false,
    };
  },
  computed: {
    ...mapState("global", ["isDarkMode"]),
    ...mapState("quiz", ["questions", "currentQuestionIndex"]),
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },
  created() {
    this.checkCache();
  },
  methods: {
    ...mapMutations({
      nextQuestion: "quiz/nextQuestion",
      prevQuestion: "quiz/previousQuestion",
      setCurrentIndex: "quiz/setCurrentIndex",
      setFromCache: "quiz/setFromCache",
    }),
    ...mapActions("quiz", ["saveAnswers", "resetQuiz"]),
    async saveAnswer() {
      await this.saveAnswers(this.answers[this.currentQuestionIndex + 1]);
      await this.$nextTick();
      await this.nextQuestion();

      this.activeInput = null;
    },
    async checkCache() {
      const questions = await this.$localForage.getItem("questions");

      if (questions !== null) this.setFromCache(questions);

      questions.forEach((question, index) => {
        this.answers[index + 1] = question.answer;
      });
    },
    clearQuiz() {
      this.resetQuiz();
    },
    submitAnswers() {
      // Ideally we'd run validation before any submissions
      // Then here is likely where an API or database call would take place
    },
  },
};
</script>

<style lang="postcss" scoped>
.light-mode {
  @apply bg-primary-500;
}

.dark-mode {
  @apply bg-white;
}

.mx-datepicker {
  width: 100% !important;
}
</style>
