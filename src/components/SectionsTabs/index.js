import { useEffect, useState } from "react";
const SectionsTabs = ({ sections, onClick, selectedCat }) => {
  const [selected, setSelected] = useState();
  useEffect(() => {
    if (sections) {
      setSelected(sections[0]?.id);
    }
  }, [sections]);
  return (
    <div className="flex items-center flex-nowrap w-full overflow-scroll mb-5 no-scrollbar">
      {sections.map((category) => {
        return (
          <button
            onClick={() => {
              setSelected(category?.id);
              onClick(category);
            }}
            className="w-auto text-nowrap p-2 rounded-xl mr-3"
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

export default SectionsTabs;
