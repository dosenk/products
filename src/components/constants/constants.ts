import { IMenu } from '../../models/IMenu';

export const menu: IMenu[] = [
  {
    name: 'products',
    link: '/products'
  }
];

export const navBtn: IMenu[] = [
  {
    name: 'add',
    link: '/products/add',
    disabled: false
  },
  {
    name: 'edit',
    link: '/products/edit',
    disabled: true
  },
  {
    name: 'delete',
    link: '/products/delete',
    disabled: true
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
    name: 'image',
    type: 'file'
  },
  {
    name: 'category',
    type: 'text'
  },
  {
    name: 'description',
    type: 'text',
    multiline: 4
  }
];

export const tableColumns = [
  {
    accessor: 'category',
    Header: 'category',
    sortType: 'basic',
    width: 100
  },
  {
    accessor: 'price',
    Header: 'price',
    sortType: 'basic',
    width: 100
  },
  {
    accessor: 'title',
    Header: 'title',
    sortType: 'basic',
    width: 200
  },
  {
    accessor: 'description',
    Header: 'description',
    sortType: 'basic',
    width: 600
  }
];
