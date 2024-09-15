import { useEffect, useState } from "react";
const SectionsTabs = ({ categories, onClick, selectedCat }) => {
  const [selected, setSelected] = useState();
  useEffect(() => {
    console.log(selectedCat, "selectedCat");
    if (selectedCat) {
      setSelected(selectedCat);
    } else if (categories) {
      setSelected(categories[0]?.id);
    }
  }, []);
  return (
    <div className="flex items-center flex-nowrap w-full overflow-scroll mb-5">
      {categories.map((category) => {
        return (
          <button
            onClick={() => {
              setSelected(category?.id);
              onClick(category);
            }}
            className="w-auto text-nowrap p-2"
            style={{
              backgroundColor:
                selected === category?.id ? "#C4C4C4" : "transparent",
            }}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
};

export default SectionsTabs;
