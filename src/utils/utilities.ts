import { useRef, useEffect, EffectCallback, DependencyList } from "react";

type MenuItem = {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
};

type SectionData = {
  name: string;
  data: MenuItem[];
};

export function getSectionListData(data: MenuItem[]): SectionData[] {
  let newArray: SectionData[] = [];

  data.map(item => {
    let object = newArray.find(
      v => v.name === item.category.charAt(0).toUpperCase() + item.category.slice(1)
    );

    const newItem: MenuItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category,
    };

    if (object) {
      newArray[newArray.indexOf(object)].data.push(newItem);
    } else {
      newArray.push({
        name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
        data: [newItem],
      });
    }
  });

  return newArray;
}

export function useUpdateEffect(effect: EffectCallback, dependencies: DependencyList = []): void {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}