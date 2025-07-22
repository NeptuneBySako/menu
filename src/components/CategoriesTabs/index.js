import { useEffect, useState } from "react";
const CategoriesTabs = ({ categories, onClick, selectedSection }) => {
  const [selected, setSelected] = useState();
  useEffect(() => {
    if (categories) {
      setSelected(categories[0]?.id);
    }
  }, [categories]);
  return (
    <div className="flex items-center flex-nowrap w-screen overflow-scroll no-scrollbar">
      {categories.map((category) => {
        return (
          <button
            onClick={() => {
              setSelected(category?.id);
              onClick(category);
            }}
            className="w-auto text-nowrap p-2 rounded-xl mr-3 "
            style={{
              backgroundColor:
                selected === category?.id ? "#253409" : "#C4C4C4",
            }}
          >
            <p
              className="text-xl"
              style={{
                color: selected == category?.id ? "#fff" : "#000",
              }}
            >
              {category.title}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default CategoriesTabs;
