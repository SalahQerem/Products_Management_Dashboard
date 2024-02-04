import { IProduct } from "../../interfaces";
import { txtSlicer } from "../../utils/functions";
import Button from "../Shared/Button";
import CircleColor from "../Shared/CircleColor";
import Image from "../Shared/Image";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { description, imageURL, price, title, category, colors } = product;

  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

  return (
    <div className="max-w-xs md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
      <Image
        imageURL={imageURL}
        alt="Product image"
        className="rounded-md mb-2 h-52 w-full lg:object-cover"
      />
      <h3>{title}</h3>
      <p>{txtSlicer(description)}</p>
      <div className="flex items-center my-4 space-x-2">
        {renderProductColors}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-indigo-600 ">${price}</span>
        <Image
          imageURL={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full object-bottom"
        />
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-indigo-600 hover:bg-indigo-700">Edit</Button>
        <Button className="bg-red-600 hover:bg-red-700">Destroy</Button>
      </div>
    </div>
  );
};

export default ProductCard;
