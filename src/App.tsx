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
import toast, { Toaster } from "react-hot-toast";

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
  const [productToEdit, setProductToEdit] = useState<IProduct>(defualtProduct);
  const [productToEditIndex, setProductToEditIndex] = useState<number>(0);
  const [errors, setErrors] = useState(defaultErrors);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [currentID, setCurrentID] = useState<number>(9);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const closeAddModal = () => {
    setIsOpenAddModal(false);
  };

  const openAddModal = () => {
    setIsOpenAddModal(true);
  };

  const closeEditModal = () => {
    setIsOpenEditModal(false);
  };

  const openEditModal = () => {
    setIsOpenEditModal(true);
  };

  const closeConfirmModal = () => {
    setIsOpenConfirmModal(false);
  };

  const openConfirmModal = () => {
    setIsOpenConfirmModal(true);
  };

  const onChangeAddHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const onChangeEditHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const cancelAddHandler = () => {
    setProduct(defualtProduct);
    setErrors(defaultErrors);
    setTempColors([]);
    closeAddModal();
  };

  const cancelEditHandler = () => {
    setProductToEdit(defualtProduct);
    setErrors(defaultErrors);
    setTempColors([]);
    closeEditModal();
  };

  const submitAddHandler = (evt: FormEvent<HTMLFormElement>) => {
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
    closeAddModal();
    toast("Product has been added successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  const submitEditHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const currentErrors = productValidation({
      title: productToEdit.title,
      description: productToEdit.description,
      imageURL: productToEdit.imageURL,
      price: productToEdit.price,
      colors: tempColors,
    });

    const hasErrorMsg =
      Object.values(currentErrors).some((value) => value == "") &&
      Object.values(currentErrors).every((value) => value == "");

    if (!hasErrorMsg) {
      setErrors(currentErrors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIndex] = {
      ...productToEdit,
      colors: tempColors,
      category: selectedCategory,
    };
    setProducts(updatedProducts);

    setProductToEdit(defualtProduct);
    setTempColors([]);
    closeEditModal();
    toast("Product has been updated successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  const removeProductHandler = () => {
    const filtered = products.filter((product) => product.id != productToEdit.id);
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };

  const cancelRemoveHandler = () => {
    setProductToEdit(defualtProduct);
    closeConfirmModal();
  }

  const renderProducts = products.map((product, index) => (
    <ProductCard
      product={product}
      key={product.id}
      index={index}
      setProductToEditIndex={setProductToEditIndex}
      setProductToEdit={setProductToEdit}
      openModalEditModal={openEditModal}
      setTempColors={setTempColors}
      setSelectedCategory={setSelectedCategory}
      openConfirmModal={openConfirmModal}
    />
  ));

  const renderAddFormInputs = formInputsList.map((input) => (
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
        onChange={onChangeAddHandler}
      />
      <ErrorMsg msg={errors[input.name]} />
    </div>
  ));

  const renderEditFormInputs = formInputsList.map((input) => (
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
        value={productToEdit[input.name]}
        onChange={onChangeEditHandler}
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
        setErrors({ ...errors, colors: "" });
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));
  return (
    <div className="container">
      <Button
        onClick={openAddModal}
        className="block mx-auto px-10 mt-10 font-semibold bg-indigo-600 hover:bg-indigo-700"
        width="w-fit"
      >
        Add New Product
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProducts}
      </div>
      <Modal
        isOpen={isOpenAddModal}
        closeModal={closeAddModal}
        title="Add new Product"
      >
        <form className="space-y-3" onSubmit={submitAddHandler}>
          {renderAddFormInputs}
          <SelectMenu
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex space-x-1 items-center flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex space-x-1 items-center flex-wrap">
            {tempColors.map((color) => (
              <span
                className="p-1 mb-1 text-sm rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <ErrorMsg msg={errors.colors} />
          <div className="flex space-x-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Submit
            </Button>
            <Button
              className="bg-gray-600 hover:bg-gray-700"
              onClick={cancelAddHandler}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title="Edit Product"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderEditFormInputs}
          <SelectMenu
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex space-x-1 items-center flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex space-x-1 items-center flex-wrap">
            {tempColors.map((color) => (
              <span
                className="p-1 mb-1 text-sm rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <ErrorMsg msg={errors.colors} />
          <div className="flex space-x-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Submit
            </Button>
            <Button
              className="bg-gray-600 hover:bg-gray-700"
              onClick={cancelEditHandler}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."> 
        <div className="flex items-center space-x-2">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>Yes, remove</Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={cancelRemoveHandler}>Cancel</Button>
        </div>
      </Modal>
      <Toaster />
    </div>
  );
};

export default App;
