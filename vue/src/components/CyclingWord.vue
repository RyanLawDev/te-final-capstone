<template>
    <div class="container">
    <div class="sentence-container">
    <span class="static-part">.Echo is&nbsp;</span>
    <span class="dynamic-word"> {{ currentWord }}</span>
    </div>
</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        words: ['music', 'concerts', 'bands', 'artists', 'community'], // Array of words
        currentIndex: 0, // Current index of the word to display
        interval: 3800, // Time in milliseconds for each word to change
      };
    },
    computed: {
      currentWord() {
        return this.words[this.currentIndex];
      },
    },
    mounted() {
      this.startWordChange();
    },
    methods: {
      startWordChange() {
        setInterval(() => {
          this.currentIndex = (this.currentIndex + 1) % this.words.length;
        }, this.interval);
      },
    },
  };
  </script>
  
  <style scoped>

  .sentence-container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 8vw;
  font-family: fantasy;
  text-align: left;
  width: 100%;
  box-sizing: border-box;

}

.static-part {
  flex: 0 0 auto;
}

.dynamic-word {
  flex: 1;
  color: #0B4251; /* Optional: Change color to highlight the changing word */
  /* You can also use `min-width` or `max-width` if needed */
}
.container {
    display: flex;
    justify-content: center;
    width: 100%;
}
  </style>
  