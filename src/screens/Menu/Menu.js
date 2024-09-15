import { Fragment, useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import ItemRow from "../../components/ItemRow";
import { data as MenuData } from "../../data";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import db from "../../firebase/firebase.config";

const Menu = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const getData = async () => {
    let itemsArr = [];
    let categoriesArr = [];
    let dataArr = [];
    // get items
    const itemsRef = ref(db, "items");
    const itemsSnapshot = await get(itemsRef);

    if (itemsSnapshot.exists()) {
      let data = itemsSnapshot.val();
      itemsArr = Object.keys(data).map((id) => {
        return {
          ...data[id],
          id: id,
        };
      });
    }

    //get categories
    const dataRef = ref(db, "categories");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      let data = snapshot.val();
      categoriesArr = Object.keys(data).map((id) => {
        return {
          ...data[id],
          id: id,
        };
      });
    }

    // handle data structure to show it for the user
    categoriesArr.forEach((category, ind) => {
      let itemsCatArr = [];
      itemsArr.forEach((item, index) => {
        if (item.category_id === category.id) {
          itemsCatArr.push({
            id: index,
            name: item?.title,
            description: item?.description,
            price: item?.price,
          });
        }
      });

      dataArr.push({
        id: ind,
        title: category?.title,
        position: category.position,
        items: itemsCatArr,
      });
    });
    dataArr.sort((a, b) => a.position - b.position);
    setData(dataArr);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Fragment>
      <div className="w-full items-end justify-end flex">
        <button
          className="p-2 bg-slate-300 mb-5"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Login
        </button>
      </div>
      <h1 className="font-PlayWriteRegular text-4xl mb-9">Neptune by Sako</h1>
      <div className="flex flex-col items-start w-full">
        {data.map((section) => {
          return (
            <Fragment>
              <SectionTitle title={section?.title} />
              {section.items.map((item) => {
                return (
                  <ItemRow
                    name={item?.name}
                    description={item.description}
                    price={item.price}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Menu;
