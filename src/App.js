import { useState } from "react";
import "./App.css";

const Cell = ({ filled, onClick, isDisabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={filled ? "cell cell-activated" : "cell"}
    ></button>
  );
};

function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false)
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const deactivateCells = () =>{
    setIsDeactivating(true)
    const timer = setInterval(()=>{

      setOrder((originOrder)=>{
        const newOrder = originOrder.slice()
        newOrder.pop()

        if(newOrder.length === 0){
          clearInterval(timer);
          setIsDeactivating(false)
        }

        return newOrder
      })
    }, 300)
  }

  const activatedCells = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);

    // deactivated
    if(newOrder.length === config.flat().filter(Boolean).length){
      deactivateCells()
    }
  };
  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[0].length}, 1fr)` }}
      >
        {config.flat().map((value, index) => {
          return value ? (
            <Cell
              key={index}
              filled={order.includes(index)}
              isDisabled = {order.includes(index) || isDeactivating}
              onClick={() => activatedCells(index)}
            />
          ) : (
            <span />
          );
        })}
      </div>
    </div>
  );
}

export default App;
