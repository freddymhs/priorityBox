import { initializeApp } from "firebase/app";
import { getDatabase, set } from "firebase/database";
import { ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpSkqfV50SjlthQDa4xY3ludNjIi7E7jE",
  authDomain: "prioribox-e6d9d.firebaseapp.com",
  projectId: "prioribox-e6d9d",
  storageBucket: "prioribox-e6d9d.appspot.com",
  messagingSenderId: "638157444296",
  appId: "1:638157444296:web:3bf139f3a2457b244f41fd",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

const list = {
  salud: {
    description: "mi salud",
    items: [
      {
        name: "nutricionista",
        priority: "alto",
        type: "deseo",
      },
      {
        name: "ir al oculista",
        priority: "bajo",
        type: "necesidad",
      },
      {
        name: "gym",
        priority: "mid",
        type: "deseo",
      },
    ],
  },
  mama: {
    description: "listado de cosas de mama",
    items: [
      {
        name: "comprar regalos",
        priority: "mid",
        type: "deseo",
      },
      {
        name: "oculista",
        priority: "alto",
        type: "deseo",
      },
    ],
  },
  casa: {
    description: "listado de cosas de casa",
    items: [
      {
        name: "fix cocina",
        priority: "mid",
        type: "necesidad",
      },
      {
        name: "fix casa boby",
        priority: "alto",
        type: "necesidad",
      },
    ],
  },
};
// set(ref(db, "/listas"), list);
// update(ref(db, "/listas/casa/items/0"), { name: "hola" });
// remove(ref(db, "/listas/casa/items/0"))
