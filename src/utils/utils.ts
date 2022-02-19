import { IProduct } from '../models/IProduct';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const sliceTitle = (title: string): string => {
  const maxWordsCount = 3;
  const words = title.split(' ');
  const { length } = words;
  if (length > maxWordsCount) return words.slice(0, maxWordsCount).join(' ');
  return title;
};

export const sliceDescription = (description: string): string => {
  const maxLength = 100;
  const { length } = description;
  if (length > maxLength) return `${description.substring(0, maxLength)}...`;
  return description;
};

export const sliceProduct = (
  products: IProduct[] | undefined,
  page: number,
  rowsPerPage: number
): IProduct[] => {
  if (products?.length) return products.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  return [];
};
