export const state = () => ({
  questions: questions,
  currentQuestionIndex: 0,
});

export const mutations = {
  nextQuestion(state) {
    if (state.currentQuestionIndex === state.questions.length - 1) {
      state.currentQuestionIndex = 0;
    } else {
      state.currentQuestionIndex++;
    }
  },
  previousQuestion(state) {
    if (state.currentQuestionIndex === 0) {
      state.currentQuestionIndex = state.questions.length - 1;
    } else {
      state.currentQuestionIndex--;
    }
  },
  setCurrentIndex(state, index) {
    state.currentQuestionIndex = index;
  },
  setCurrentAnswer(state, answer) {
    state.questions[state.currentQuestionIndex].answer = answer;
  },
  setFromCache(state, cache) {
    state.questions = cache;
  },
};

export const actions = {
  saveAnswers({ state, commit }, payload) {
    this.$localForage.setItem("questions", state.questions);
    commit("setCurrentAnswer", payload);
  },
  resetQuiz({ state }) {
    this.$localForage.removeItem("questions");
  },
};

const questions = [
  {
    label: "What was your favorite concert you attended?",
    type: "text",
    answer: null,
  },
  {
    label: "What made it your favorite?",
    type: "select",
    options: [
      "The music was amazing!",
      "I met the band!",
      "It was a memorable night with friends",
      "All of the above",
    ],
    answer: null,
  },
  {
    label: "Was the concert your idea or a friends?",
    type: "radio",
    options: ["Mine!", "A friends."],
    answer: null,
  },
  {
    label: "When did the concert take place?",
    type: "datepicker",
    answer: null,
  },
  {
    label:
      "Think back to your favorite song from that band. Does it take you back to any specific moment in time?",
    type: "radio",
    options: ["Yes", "No"],
    answer: null,
  },
  {
    label: "When does it take you back to?",
    type: "text",
    answer: null,
  },
  {
    label: "Does this band still put out music today? Or go on tour?",
    type: "radio",
    options: [
      "Are you kidding? I just saw them again!",
      "Occassionally tours, no new music.",
      "Some singles here and there, no tours.",
      "Broke up years ago.",
    ],
    answer: null,
  },
  {
    label: "What's your favorite album from this band?",
    type: "text",
    answer: null,
  },
  {
    label: "Where were you when you discovered this band?",
    type: "text",
    answer: null,
  },
  {
    label:
      "What's your email? I'm signing you up for their tour dates newsletter!",
    type: "email",
    answer: null,
  },
];
