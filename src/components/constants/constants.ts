import { IMenu } from '../../models/IMenu';

export const menu: IMenu[] = [
  {
    name: 'products',
    link: '/products'
  },
  {
    name: 'add product',
    link: '/products/add'
  }
];

export const productFormInputs = [
  {
    name: 'title',
    type: 'text'
  },
  {
    name: 'price',
    type: 'text'
  },
  {
    name: 'description',
    type: 'text'
  },
  {
    name: 'image',
    type: 'file'
  },
  {
    name: 'category',
    type: 'text'
  }
];
