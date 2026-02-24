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
    disabled: true,
    action: 'handleDelete'
  }
];

export const productFormInputs = [
  {
    name: 'title',
    type: 'text',
    pattern: '^.{5,}$'
  },
  {
    name: 'price',
    type: 'text',
    pattern: '^\\d{1,}$'
  },
  {
    name: 'image',
    type: 'text',
    pattern: '^.{5,}$'
  },
  {
    name: 'category',
    type: 'text',
    pattern: '^.{1,}$'
  },
  {
    name: 'description',
    type: 'text',
    multiline: 4,
    pattern: '^.{5,}$'
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
