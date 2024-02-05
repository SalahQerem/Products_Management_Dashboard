import { ICategory, IProduct } from "../../interfaces";
import { numberWithCommas, txtSlicer } from "../../utils/functions";
import Button from "../Shared/Button";
import CircleColor from "../Shared/CircleColor";
import Image from "../Shared/Image";

interface IProps {
  product: IProduct;
  index: number;
  setProductToEdit: (product: IProduct) => void;
  openModalEditModal: () => void;
  setTempColors: (colors: string[]) => void;
  setSelectedCategory: (category: ICategory) => void;
  setProductToEditIndex: (index: number) => void;
  openConfirmModal: () => void;
}

const ProductCard = ({
  product,
  index,
  setProductToEdit,
  openModalEditModal,
  setTempColors,
  setSelectedCategory,
  setProductToEditIndex,
  openConfirmModal,
}: IProps) => {
  const { description, imageURL, price, title, category, colors } = product;

  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

  const editProduct = () => {
    setProductToEdit(product);
    setTempColors(colors);
    setSelectedCategory(product.category);
    setProductToEditIndex(index);
    openModalEditModal();
  };

  const removeProduct = () => {
    setProductToEdit(product);
    openConfirmModal();
  };

  return (
    <div className="max-w-xs md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
      <Image
        imageURL={imageURL}
        alt="Product image"
        className="rounded-md h-52 w-full lg:object-cover"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 break-words">
        {txtSlicer(description)}
      </p>
      <div className="flex items-center my-4 space-x-1">
        {!colors.length ? <p className="min-h-[20px] font-semibold">No available colors!</p> : renderProductColors}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-indigo-600 font-semibold text-lg">
          ${numberWithCommas(price)}
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">{category.name}</span>
          <Image
            imageURL={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full object-bottom"
          />
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Button
          className="bg-indigo-700 hover:bg-indigo-800"
          onClick={editProduct}
        >
          Edit
        </Button>
        <Button
          className="bg-[#c2344d] hover:bg-red-800"
          onClick={removeProduct}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
