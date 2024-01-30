<script lang="ts" setup>
import { useAsyncData } from "../../.nuxt/imports";
const { find } = useStrapi();
const search = useSearchStore();

const {
  data: tags,
  pendingTags,
  errorTags,
} = useAsyncData("tags", () => find("tags", { populate: "*" }));

function addTag(tag: string) {
  if (!search.queryTags.includes(tag)) search.queryTags.push(tag);
  else search.queryTags = search.queryTags.filter((item) => item !== tag);
}
</script>

<template>
  <div class="p-0" v-if="!search.pending && search.sortedElementsByTags">
    <div class="min-h-[60vh] flex items-center justify-start px-[12vw]">
      <div class="">
        <h1
          class="text-5xl font-extrabold leading-none bg-gradient-to-l from-green-200 via-green-400 to-green-500 bg-clip-text text-transparent"
        >
          Découvrez les nouvelles recettes qui vous donneront envie de cuisiner
        </h1>
        <p class="mb-12">
          Ici finis la corvée de la recherche de recettes, nous vous proposons
          des recettes simples en provenance des quatres coins du monde
        </p>
        <a
          href="#recipes-container"
          class="px-8 py-3 text-white rounded-xl no-underline bg-green-500"
          >Découvrir nos recettes</a
        >
      </div>
    </div>
    <section class="px-[12vw] pb-20" id="recipes-container">
      <div>
        <h2>Nos recettes populaires</h2>
        <input
          v-model="search.query"
          placeholder="Chercher une recette"
          type="text"
          class="w-full p-4 border-0 shadow-2xl rounded-xl"
        />
        <!-- <pre>{{ search.results }}</pre> -->
        <div class="flex items-center justify-start gap-4 px-0 my-8">
          <button
            v-for="tag in tags.data"
            @click="addTag(tag.slug)"
            :class="
              search.queryTags.includes(tag.slug)
                ? 'px-6 py-2 text-white rounded-xl no-underline bg-black border-0 cursor-pointer'
                : 'px-6 py-2 text-white rounded-xl no-underline bg-green-500 border-0 cursor-pointer'
            "
          >
            {{ tag.name }}
          </button>
        </div>
      </div>
      <ul
        class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[20px] list-none px-0 place-items-center"
      >
        <li v-for="recipe in search.sortedElementsByTags" class="relative">
          <NuxtLink
            :to="`/recipes/${recipe.slug}`"
            class="no-underline text-lg font-bold text-center w-full flex items-center justify-center text-black flex-col"
          >
            <NuxtImg
              :src="recipe.cover.url"
              class="w-full aspect-square object-cover mb-4"
            />
            <ul
              class="px-0 flex items-center jusitfy-start gap-4 list-none absolute top-2 left-2 text-[12px]"
            >
              <li
                v-for="tag in recipe.tags"
                class="px-4 py-0 text-white rounded-xl no-underline bg-green-500 w-auto"
              >
                {{ tag.name }}
              </li>
            </ul>
            {{ recipe.title }}
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>
