import { createContext, ReactNode, useContext, useState } from "react";
import { IProduct } from "../utils/interfaces";

interface IProductProviderProps {
  children: ReactNode;
}

interface IProductContextData {
  product: IProduct;
  // eslint-disable-next-line no-unused-vars
  setProduct: (newProduct: IProduct) => void;
}

const ProductContext = createContext<IProductContextData>(
  {} as IProductContextData
);

export function ProductProvider({ children }: IProductProviderProps) {
  const [product, setProduct] = useState({} as IProduct);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  return context;
}
