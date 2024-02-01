import "./App.css";
import ProductCard from "./components/productCard/ProductCard";
import { productList } from "./data";

function App() {
  const renderProducs = productList.map((product) => (
    <ProductCard product={product} />
  ));
  return (
    <div className="container">
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProducs}
      </div>
    </div>
  );
}

export default App;
