import Fuse from "fuse.js";
import { recipesMock } from "~/mocks/recipes.mock";

export const useSearchStore = defineStore("search", () => {
  const query = ref("");
  const queryTags = ref<string[]>([]);

  const { find } = useStrapi4();

  const {
    data: recipes,
    pending,
    error,
  } = useAsyncData("recipes", () => find("recipes", { populate: "*" }));
  // TODO: Replace any with your Recipe type and change elements
  const elements = reactive<Array<any>>(recipes.value?.data || []);
  const keys = ["title", "tags", "ingredients.name"];

  const setElements = (newElements: any) => {
    elements.push(...newElements);
  };

  const fuse = computed(
    () =>
      new Fuse(Array.from(elements), {
        keys,
        threshold: 0.2,
      })
  );

  const results = computed(() => {
    if (!query.value) return Array.from(elements);
    return [...fuse.value.search(query.value).map((r) => r.item)];
  });

  const sortedElementsByTags = computed(() => {
    if (!queryTags.value.length) return results.value;
    return results.value.filter((recipes) => {
      return recipes.tags.some((tag) => queryTags.value.includes(tag.slug));
    });
  });

  return {
    query,
    results,
    setElements,
    pending,
    sortedElementsByTags,
    queryTags,
  };
});
