import { Fragment, useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import ItemRow from "../../components/ItemRow";
import { data as MenuData } from "../../data";
import { useNavigate } from "react-router-dom";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import * as database from "../../firebase/firebase.config";
import SectionsTabs from "../../components/SectionsTabs";
import CategoriesTabs from "../../components/CategoriesTabs";

import Logo from "../../assets/images/new_logo.jpeg";

const Menu = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getSections();
    getImage();
  }, []);

  const getImage = async () => {
    const dataRef = ref(database?.default?.db, "images/");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      let data = snapshot.val();

      setImageUrl(data?.main_image?.imageUrl);
    }
  };

  const getSections = async () => {
    const dataRef = ref(database?.default?.db, "sections");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      let data = snapshot.val();
      let arr = Object.keys(data).map((id) => {
        return {
          ...data[id],
          id: id,
        };
      });
      arr.sort((a, b) => a.position - b.position);
      getCategories(arr[0].id);
      setSections(arr);
    }
  };

  const getCategories = async (id) => {
    setSelectedSection(id);
    //get categories
    const dataRef = ref(database?.default?.db, "categories");
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
    categoriesArr.sort((a, b) => a.position - b.position);
    getItems(categoriesArr[0]?.id);
    setCategories(categoriesArr);
  };

  const getItems = async (id) => {
    let itemsArr = [];
    const itemsRef = ref(database?.default?.db, "items");
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

    setItems(itemsArr.sort((a, b) => a.position - b.position));
  };

  useEffect(() => {
    // console.log(selectedSection, "selectedSection");
  }, [sections, categories, items, selectedSection]);

  return (
    <Fragment>
      <div className="flex flex-col items-start w-screen  bg-center h-80 relative bg-[#253409]">
        <div
          className="flex flex-col items-start w-[100%] bg-contain bg-center p-3 h-80 relative bg-['#253409']"
          style={{
            backgroundImage: `url(${Logo})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <button
            className="hidden lg:block p-2 bg-slate-300 mb-5 rounded-xl  h-fit items-center "
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Login
          </button>
        </div>
      </div>
      <div className="p-3">
        <SectionsTabs
          sections={sections}
          onClick={(section) => {
            getCategories(section?.id);
          }}
        />
        <CategoriesTabs
          categories={categories}
          onClick={(cat) => {
            getItems(cat?.id);
          }}
          selectedSection={selectedSection}
        />
      </div>
      <div className="p-3">
        <div className="flex flex-col items-start w-full mt-2 border-2 rounded-lg border-[#253409] pt-2">
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
      </div>
    </Fragment>
  );
};

export default Menu;
