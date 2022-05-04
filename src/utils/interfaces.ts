export interface IProduct {
  avatar: string;
  createdAt: string;
  id: string;
  marca: string;
  nome: string;
  preco: string;
  qt_estoque: number;
  qt_vendas: number;
}

export interface IAddress {
  city: string;
  state: string;
  publicPlace: string;
  district: string;
  complement: string;
}