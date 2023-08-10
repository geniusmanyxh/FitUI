<template>
  <div>
    <button @click="increment">{{ count }}</button>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  name: "SFCButton",
  props: {
    initialValue: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const count = ref(props.initialValue);

    const increment = () => {
      count.value++;
    };

    return {
      count,
      increment,
    };
  },
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
