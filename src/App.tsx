import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import Button from "./components/Shared/Button";
import Modal from "./components/Shared/Modal";
import ProductCard from "./components/productCard/ProductCard";
import { categories, colors, formInputsList, productList } from "./data";
import Input from "./components/Shared/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMsg from "./components/Shared/ErrorMsg";
import CircleColor from "./components/Shared/CircleColor";
import SelectMenu from "./components/Shared/SelectMenu";

const App = () => {
  const defualtProduct = {
    title: "",
    price: "",
    description: "",
    imageURL: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  const defaultErrors = {
    title: "",
    price: "",
    description: "",
    imageURL: "",
    colors: "",
  };

  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defualtProduct);
  const [errors, setErrors] = useState(defaultErrors);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [currentID, setCurrentID] = useState<number>(9);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const cancelHandler = () => {
    setProduct(defualtProduct);
    setErrors(defaultErrors);
    closeModal();
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const currentErrors = productValidation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
      colors: tempColors,
    });

    const hasErrorMsg =
      Object.values(currentErrors).some((value) => value == "") &&
      Object.values(currentErrors).every((value) => value == "");

    if (!hasErrorMsg) {
      setErrors(currentErrors);
      return;
    }

    setProducts((prev) => [
      {
        id: String(currentID),
        ...product,
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setCurrentID((prev) => prev + 1);

    setProduct(defualtProduct);
    setTempColors([]);
    closeModal();
  };

  const renderProducts = products.map((product) => (
    <ProductCard product={product} key={product.id} />
  ));

  const renderFromInputs = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[1px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        id={input.id}
        type={input.type}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMsg msg={errors[input.name]} />
    </div>
  ));

  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item != color));
          return;
        }
        setErrors({... errors, colors :""});
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));
  return (
    <div className="container">
      <Button onClick={openModal} className="bg-indigo-600 hover:bg-indigo-700">
        Add
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProducts}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add new Product">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFromInputs}
          <SelectMenu
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex space-x-1">{renderProductColors}</div>
          <div className="flex space-x-2">
            {tempColors.map((color) => (
              <span
                className="p-1 mb-1 text-sm rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <ErrorMsg msg={errors.colors}/>
          <div className="flex space-x-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Submit
            </Button>
            <Button
              className="bg-gray-600 hover:bg-gray-700"
              onClick={cancelHandler}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default App;
