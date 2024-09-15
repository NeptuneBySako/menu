import { useEffect, useState } from "react";
import { ref, set, push, get, remove } from "firebase/database";
import db from "../../firebase/firebase.config";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

const Categories = () => {
  const [name, setName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [position, setPosition] = useState();
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const dataRef = ref(db, "categories");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      let data = snapshot.val();
      let arr = Object.keys(data).map((id) => {
        return {
          ...data[id],
          id: id,
        };
      });

      console.log(arr, "arr");
      setCategories(arr);
    }
  };

  const saveData = async () => {
    if (!isUpdate) {
      try {
        const newDocRef = push(ref(db, "categories"));
        await set(newDocRef, {
          title: name,
          position: position,
        });
        console.log("Success");
        alert("New category created");
        getCategories();
        setName("");
        setPosition("");
      } catch (err) {
        console.log("Error:", err);
        alert("Error: " + err.message);
      }
    } else {
      try {
        const dataRef = ref(db, "categories/" + selectedData.id);
        await set(dataRef, {
          title: name,
          position: position,
        });
        console.log("Success");
        alert("Category updated successfully");
        getCategories();
        setIsUpdate(false);
        setSelectedData();
        setName("");
        setPosition("");
      } catch (err) {
        console.log("Error:", err);
        alert("Error: " + err.message);
      }
    }
  };

  const deleteCategory = async (id) => {
    try {
      const dataRef = ref(db, "categories/" + id);
      await remove(dataRef);
      console.log("Success");
      alert("Category deleted successfully");
      getCategories();
    } catch (err) {
      console.log("Error:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-start border-b border-b-black w-full p-2">
        <h2>{isUpdate ? "Update Category" : "Add New Category"}</h2>
        <div className="flex items-center justify-start">
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            placeholder="Category title"
            className="mt-3 mb-3 border p-2 mr-3"
          />
          <input
            type="number"
            onChange={(e) => {
              setPosition(e.target.value);
            }}
            value={position}
            placeholder="Position in menu"
            className="mt-3 mb-3 border p-2 mr-3"
          />
          <button
            className="flex items-center justify-center bg-slate-200 w-full pt-2 pb-2 pl-4 pr-4"
            onClick={() => {
              saveData();
            }}
          >
            {isUpdate ? "Update" : "Add"}
          </button>
        </div>
      </div>
      <div className="w-full p-2">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Position In Menu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{capitalizeFirstLetter(item.title)}</td>
                  <td>{item.position}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <button
                        className="mr-5"
                        onClick={() => {
                          setIsUpdate(true);
                          setSelectedData(item);
                          setName(item?.title);
                          setPosition(item?.position);
                        }}
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => {
                          deleteCategory(item?.id);
                        }}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
