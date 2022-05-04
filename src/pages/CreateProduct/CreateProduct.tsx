import FormProduct from "../../components/FormProduct.tsx/FormProduct";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";

import "./CreateProduct.scss";

export default function CreateProduct() {
  return (
    <div className="pageCreateProduct">
      <SideMenu />

      <div className="pageCreateProduct-container">
        <Header />
        <div className="pageCreateProduct-content">
          <div className="formCreateProdcut-container">
            <FormProduct />
          </div>
        </div>
      </div>
    </div>
  );
}
