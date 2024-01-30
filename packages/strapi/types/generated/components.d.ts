import type { Schema, Attribute } from '@strapi/strapi';

export interface RecipesIngredients extends Schema.Component {
  collectionName: 'components_recipes_ingredients';
  info: {
    displayName: 'Ingredients';
    icon: 'bulletList';
  };
  attributes: {
    name: Attribute.String;
    quantity: Attribute.String;
  };
}

export interface RecipesInstructions extends Schema.Component {
  collectionName: 'components_recipes_instructions';
  info: {
    displayName: 'Instructions';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    text: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'recipes.ingredients': RecipesIngredients;
      'recipes.instructions': RecipesInstructions;
    }
  }
}
