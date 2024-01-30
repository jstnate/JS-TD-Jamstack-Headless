<script lang="ts" setup>
const { findOne } = useStrapi4();
const route = useRoute();

const {
  data: recipe,
  pending,
  error,
} = useAsyncData("recipe", () => findOne(`recipes/${route.params.slug}`));
console.log(recipe);
</script>

<template>
  <template v-if="pending">
    <div></div>
  </template>
  <template v-else>
    <div class="mx-0 w-full">
      <div class="flex flex-col items-center gap-y-4">
        <div
          class="flex items-center justify-center relative w-full min-h-[60vh]"
        >
          <h1
            class="w-full h-[60vh] bg-green-500/20 z-10 text-center m-0 flex items-center justify-center text-white uppercase text-5xl tracking-wider"
          >
            {{ recipe.data.title }}
          </h1>
          <NuxtLink
            to="/"
            class="px-6 py-4 text-white rounded-xl no-underline bg-green-500 border-0 cursor-pointer absolute bottom-40 left-[50%] translate-x-[-50%] z-20 w-fit"
          >
            Accueil
          </NuxtLink>
          <NuxtImg
            :src="recipe.data.cover.url"
            class="w-full h-full flex aspect-video object-cover absolute top-0 left-0 z-0"
          />
        </div>
        <div class="px-20">
          <div>
            <h2 class="text-green-500">Ingredients</h2>
            <ul>
              <li
                v-for="ingredient in recipe.data.ingredients"
                class="leading-8"
              >
                <span>{{ ingredient.quantity }}</span>
                de
                <span>{{ ingredient.name }}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 class="text-green-500">Etapes</h2>
            <ol>
              <li
                v-for="instruction in recipe.data.instructions"
                class="leading-8"
              >
                {{ instruction.text }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
