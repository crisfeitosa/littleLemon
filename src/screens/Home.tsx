import { useState, useEffect, useCallback, useMemo } from 'react';
import { FlatList, SectionList } from 'react-native';
import debounce from 'lodash.debounce';
import { Searchbar } from 'react-native-paper';
import { Text, VStack } from '@gluestack-ui/themed';
import { DishCard } from '@components/DishCard';
import { MenuCategory } from '@components/MenuCategory';
import { ScreenHeader } from '@components/ScreenHeader';
import { HeroSection } from '@components/HeroSection';
import { createTable, filterByQueryAndCategories, getMenuItems, saveMenuItems } from '../utils/database';
import { Loading } from '@components/Loading';
import { getSectionListData, useUpdateEffect } from '@utils/utilities';

type Item = {
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
};

type MenuItem = Item & {
  id: number;
};

type SectionData = {
  name: string;
  data: MenuItem[];
};

const dataURL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const sections = ['starters', 'mains', 'desserts']

export function Home() {
  const [data, setData] = useState<SectionData[]>([]); 
  const [searchbarInput, setSearchbarInput] = useState<string>('');
  const [request, setRequest] = useState<string>('');
  const [filterSelections, setFilterSelections] = useState<boolean[]>(
    sections.map(() => false)
  );

  const fetchData = async (): Promise<MenuItem[]> => {
    try {
      const reply = await fetch(dataURL);
      const json = await reply.json();
      const menu: MenuItem[] = json.menu.map((item: Item , index: number) => ({
        id: index + 1,
        name: item.name,
        price: item.price.toString(),
        description: item.description,
        image: item.image,
        category: item.category,
      }));
      return menu;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      let menuItems: MenuItem[] = [];
      try {
        await createTable();
        menuItems = await getMenuItems();
        if (!menuItems.length) {
          menuItems = await fetchData();
          saveMenuItems(menuItems);
        }
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const selectedCategories = sections.filter((s, i) => {
        return filterSelections.every((item) => item === false) || filterSelections[i];
      });
      try {
        const menuItems: MenuItem[] = await filterByQueryAndCategories(
          request,
          selectedCategories
        );
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [filterSelections, request]);

  const lookup = useCallback((r: string) => {
    setRequest(r);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const searchFunction = (text: string) => {
    setSearchbarInput(text);
    debouncedLookup(text);
  };

  const filtersChange = (index: number) => {
    const newArray = [...filterSelections];
    newArray[index] = !newArray[index]; 
    setFilterSelections(newArray);
  };

  return (
    <VStack flex={1} pt="$8">
      <ScreenHeader withAvatar />
      <VStack flex={1}>
        <HeroSection
          value={searchbarInput}
          onChange={searchFunction}
        />

        <VStack gap="$4" my="$3">
          <Text color="$highblack" px="$6" fontSize="$xl" fontFamily="$bodyBold" fontWeight="$extrabold">
            ORDER FOR DELIVERY!
          </Text>
                
          <FlatList
            data={sections}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <MenuCategory
                name={item.charAt(0).toUpperCase() + item.slice(1)}
                isActive={filterSelections[index]}  
                onPress={() => filtersChange(index)}  
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            style={{ maxHeight: 44, minHeight: 44 }}
          />
        </VStack>

        <VStack px="$6" flex={1} mt="$2">
          <SectionList
            sections={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <DishCard
                title={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            )}
            renderSectionHeader={({ section: { name }}) => (
              <Text color="$primary" py="$2" fontSize="$2xl" fontFamily="$bodyBold" fontWeight="$extrabold">
                {name}
              </Text>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      </VStack>
    </VStack>
  )
}