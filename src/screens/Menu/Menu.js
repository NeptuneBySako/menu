import { Fragment, useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import ItemRow from "../../components/ItemRow";
import { data as MenuData } from "../../data";
import { useNavigate } from "react-router-dom";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import db from "../../firebase/firebase.config";
import SectionsTabs from "../../components/SectionsTabs";

const Menu = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    getSections();
  }, []);

  const getSections = async () => {
    const dataRef = ref(db, "sections");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      let data = snapshot.val();
      let arr = Object.keys(data).map((id) => {
        return {
          ...data[id],
          id: id,
        };
      });
      getCategories(arr[0].id);
      console.log(arr, "arr");
      setSections(arr);
    }
  };

  const getCategories = async (id) => {
    setSelectedCategory(id);
    console.log(id, "id");
    //get categories
    const dataRef = ref(db, "categories");
    const categoriesQuery = query(
      dataRef,
      orderByChild("section"),
      equalTo(id)
    );

    const snapshot = await get(categoriesQuery);
    let categoriesArr = [];
    if (snapshot.exists()) {
      let data = snapshot.val();
      categoriesArr = Object.keys(data).map((id) => {
        return {
          ...data[id],
          id: id,
        };
      });
    }
    getItems(categoriesArr[0]?.id);
    setCategories(categoriesArr);
  };

  const getItems = async (id) => {
    console.log(id, "id");
    let itemsArr = [];
    const itemsRef = ref(db, "items");
    const itemsQuery = query(
      itemsRef,
      orderByChild("category_id"),
      equalTo(id)
    );

    const snapshot = await get(itemsQuery);
    if (snapshot.exists()) {
      let data = snapshot.val();
      itemsArr = Object.keys(data).map((id) => {
        return {
          ...data[id],
          id: id,
        };
      });
    }

    setItems(itemsArr);
  };

  useEffect(() => {}, [sections, categories, items, selectedCategory]);
  return (
    <Fragment>
      <div className="w-full items-end justify-end flex">
        <button
          className="hidden lg:block p-2 bg-slate-300 mb-5"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Login
        </button>
      </div>
      <h1 className="font-PlayWriteRegular text-4xl mb-9">Neptune by Sako</h1>
      <div className="flex flex-col items-start w-full">
        <SectionsTabs
          categories={sections}
          onClick={(section) => {
            getCategories(section?.id);
            console.log(section, "section");
          }}
        />
        <SectionsTabs
          categories={categories}
          onClick={(cat) => {
            getItems(cat?.id);
            console.log(cat, "cat");
          }}
          selectedCat={selectedCategory}
        />
        {items.map((item) => {
          return (
            <ItemRow
              name={item?.title}
              description={item.description}
              price={item.price}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default Menu;
