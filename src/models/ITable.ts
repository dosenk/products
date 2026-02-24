import { IProduct } from './IProduct';

export interface IColumn {
  Header: string;
  accessor: string;
  sortType: string;
  width: number;
}

export interface ITable {
  columns: IColumn[] | undefined;
  data: IProduct[];
  skipPageReset?: boolean | undefined;
  resetPage?: any;
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
  selectedId?: number | null;
  multipleSelector: boolean | undefined;
  onPageChangeClick?: any;
  rowsPerPageOptions?: number[];
  sortBy: string | undefined;
  isDescSortDirection?: boolean | undefined;
  isSearch: boolean | undefined;
  isResetSelectedRow?: boolean | undefined;
  style?: any;
  isLoading: boolean | undefined;
}
