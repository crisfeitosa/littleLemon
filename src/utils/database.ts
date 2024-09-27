import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('little-lemon');

type MenuItem = {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
};

export async function createTable(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          "create table if not exists menuItems (id integer primary key not null, name text, price text, description text, image text, category text);"
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems(): Promise<MenuItem[]> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "select * from menuItems", 
        [], 
        (_, { rows }) => {
          resolve(rows._array as MenuItem[]);  // Ensure it's cast to MenuItem[]
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export function saveMenuItems(menuItems: MenuItem[]): void {
  db.transaction(tx => {
    tx.executeSql(
      `insert into menuItems (id, name, price, description, image, category) values ${menuItems.map(
        item =>
        `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`
      ).join(", ")}`
    );
  });
}

export async function filterByQueryAndCategories(
  query: string, 
  activeCategories: string[]
): Promise<MenuItem[]> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from menuItems where name like ? and category in ('${activeCategories.join("','")}')`,
        [`%${query}%`],
        (_, { rows }) => {
          resolve(rows._array as MenuItem[]);  // Ensure it's cast to MenuItem[]
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}
