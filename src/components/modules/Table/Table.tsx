/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, forwardRef, useRef, useState } from 'react';
import {
  makeStyles,
  Checkbox,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  CircularProgress,
  Box
} from '@material-ui/core';
import MaUTable from '@material-ui/core/Table';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import TablePaginationActions from './TablePaginationActions';
import GlobalFilter from './GlobalFilter';

const useStylesCheckbox = makeStyles({
  root: {
    padding: 5
  }
});

const useStylesTdHead = makeStyles({
  root: {
    color: '#ffffff',
    padding: 0
  }
});
const useStylesTd = makeStyles({
  root: {
    padding: 0,
    textAlign: 'center'
    // '& '
  }
});

const useStyleSortLabel = makeStyles({
  root: {
    color: '#ffffff !important',
    '& .MuiTableSortLabel-icon': {
      color: '#ffffff !important'
    }
  }
});

interface iTable {
  columns,
  data,
  skipPageReset,
  resetPage,
  onclick,
  selectedId = null,
  multipleSelector = true,
  onPageChangeClick,
  rowsPerPageOptions = [],
  sortBy,
  isDescSortDirection = false,
  isSearch = false,
  isResetSelectedRow = true,
  style = {
  footer: {}
},
isLoading
}

const Table = ({
  columns,
  data,
  skipPageReset,
  resetPage,
  onclick,
  selectedId = null,
  multipleSelector = true,
  onPageChangeClick,
  rowsPerPageOptions = [],
  sortBy,
  isDescSortDirection = false,
  isSearch = false,
  isResetSelectedRow = true,
  style = {
    footer: {}
  },
  isLoading
}) => {
  const selectedRowIds = {};
  if (selectedId !== null) selectedRowIds[selectedId] = true;
  const classesTd = useStylesTd();
  const classesSortLabel = useStyleSortLabel();
  const classesTdHeader = useStylesTdHead();

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    toggleAllRowsSelected,
    state: { pageIndex, pageSize, globalFilter }
  } = useTable(
    {
      columns,
      data,
      autoResetPage: !skipPageReset,
      disableSortRemove: true,
      initialState: {
        sortBy: [
          {
            id: sortBy,
            desc: isDescSortDirection
          }
        ],
        selectedRowIds // id of array (start from 0)
      },
      ...resetPage
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    setPageSize(rowsPerPageOptions[0] || 10);
  }, []);
  const [searchValue, setSearchValue] = useState(globalFilter);

  const [pageNum, setPageNum] = useState(pageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] || 10);

  const handleChangePage = (event, newPage) => {
    if (typeof onPageChangeClick === 'function') onPageChangeClick();
    if (isResetSelectedRow) toggleAllRowsSelected(false);
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
    setRowsPerPage(Number(event.target.value));
  };

  const removeByIndexs = (array, indexs) => array.filter((_, i) => !indexs.includes(i));

  return (
    <TableContainer style={{ height: '100%', overflow: 'visible', position: 'relative' }}>
      {isLoading ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(159,161,159,0.5)',
            zIndex: '1000',
            position: 'absolute'
          }}
        >
          <CircularProgress
            className="preloader"
            style={{
              zIndex: '1000',
              left: '50%',
              top: '42%',
              position: 'relative'
            }}
          />
        </Box>
      ) : (
        ''
      )}
      {isSearch ? (
        <GlobalFilter
          value={searchValue}
          setValue={setSearchValue}
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={searchValue}
          data={data}
        />
      ) : (
        ''
      )}
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow style={{ backgroundColor: '#333234' }} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={classesTdHeader.root}
                    style={{
                      width: column.width,
                      cursor: column.id === 'selection' ? 'default' : 'pointer'
                    }}
                    align="center"
                  >
                    {column.Header}
                    {column.id !== 'selection' ? (
                      <TableSortLabel
                        className={classesSortLabel.root}
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                    ) : null}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.length === 0 ? (
            <TableRow
              key="default"
              style={{
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)',
                height: '38px',
                display: 'table-cell',
                verticalAlign: 'middle',
                textAlign: 'center'
              }}
            >
              "No such elements"
            </TableRow>
          ) : (
            page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  style={{
                    cursor: 'pointer',
                    backgroundColor: row.isSelected ? '#efefee' : '#fff',
                    height: '38px' // высота строки
                  }}
                  {...row.getRowProps()}
                  onClick={() => {
                    if (!multipleSelector) toggleAllRowsSelected(false);
                    if (typeof onclick === 'function') onclick(row);
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()} className={classesTd.root}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          )}
        </TableBody>
        <TableFooter style={{ ...style.footer }}>
          {/* //bottom: '15px' */}
          <TableRow>
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              colSpan={0}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={pageIndex}
              labelRowsPerPage="Rows per page:"
              labelDisplayedRows={({ from, to, count }) => {
                return `${from}-${to} "in" ${count}`;
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </TableContainer>
  );
};

export default Table;
