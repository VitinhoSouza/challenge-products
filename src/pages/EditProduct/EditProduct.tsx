import FormProduct from "../../components/FormProduct.tsx/FormProduct";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useProduct } from "../../hooks/useProducts";
// import { IProduct } from "../../utils/interfaces";

import "./EditProduct.scss";

export default function EditProduct() {
  const { product } = useProduct();

  /* function convertFormatProduct(product:IProduct){
    let newProduct = {
      "id":product.id,
      "avatar": product.avatar,
      "marca": product.marca,
      "nome": product.nome,
      "preco": product.preco,
      "qt_estoque": product.qt_estoque.toString();
      "qt_vendas": string;
    }

  } */

  return (
    <div className="pageEditProduct">
      <SideMenu />

      <div className="pageEditProduct-container">
        <Header />
        <div className="pageEditProduct-content">
          <div className="formEditProdcut-container">
            <FormProduct productProps={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
