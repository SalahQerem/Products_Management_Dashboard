interface productSchema {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
}

interface errorsSchema{
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string;
}

export const productValidation = (product: productSchema) => {
  const { title, description, imageURL, price, colors } = product;

  const validURL = /^(ftp|http|https):\/\/[^ "]+$/.test(imageURL);

  const errors: errorsSchema = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  };

  if (!title.trim() || title.length < 10 || title.length > 80) {
    errors.title = "Title must be between 10 and 80 characters!";
  }

  if (
    !description.trim() ||
    description.length < 10 ||
    description.length > 900
  ) {
    errors.description = "Description must be between 10 and 900 characters!";
  }

  if (!imageURL.trim() || !validURL) {
    errors.imageURL = "Valid image URL is required!";
  }

  if (!price.trim() || isNaN(Number(price))) {
    errors.price = "Valid price is required!";
  }

  if (colors.length == 0) {
    errors.colors = "Add one color at least!";
  }

  return errors;
};
