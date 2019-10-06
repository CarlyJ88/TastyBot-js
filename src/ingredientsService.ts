interface Ingredients{
  name: string;
  quantity: number;
  unit: string;
}

export default function listIngredients() : Ingredients[]{
  return [{name: 'beetroot', quantity: 34455, unit: 'g'}, {name: 'sweet potato', quantity: 500, unit: 'g'}, {name: 'peppers', quantity: 100, unit: 'g'}]
}