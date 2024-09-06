import { Fragment } from "react";
import "./App.css";
import { data } from "../src/data";
import SectionTitle from '../src/components/SectionTitle';
import ItemRow from "../src/components/ItemRow";

function App() {
  return (
    <div className="App p-5">
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
    </div>
  );
}

export default App;
