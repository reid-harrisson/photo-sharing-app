import { usePagination } from 'hooks';
import React from 'react';
import { PaginationContainer, PaginationItem } from './styles';

type PaginationBarProps = {
  onPageChange: (e: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
};

export const PaginationBar: React.FC<PaginationBarProps> = ({
  onPageChange,
  totalCount,
  currentPage,
  pageSize,
}) => {
  const { paginationRange, totalPageCount } = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });

  const onNext = () => {
    onPageChange(Math.min(currentPage + 1, totalPageCount));
  };

  const onPrevious = () => {
    onPageChange(Math.max(currentPage - 1));
  };

  if (paginationRange.length < 2) {
    return null;
  }

  return (
    <PaginationContainer>
      <PaginationItem
        onClick={onPrevious}
        className={currentPage === 1 ? 'disabled' : ''}
      >
        <div className="arrow left" />
      </PaginationItem>

      {paginationRange.map((pageData) => (
        <PaginationItem
          onClick={() => onPageChange(pageData.index)}
          className={currentPage === pageData.index ? 'selected' : ''}
        >
          {pageData.label}
        </PaginationItem>
      ))}

      <PaginationItem
        onClick={onNext}
        className={currentPage === totalPageCount ? 'disabled' : ''}
      >
        <div className="arrow right" />
      </PaginationItem>
    </PaginationContainer>
  );
};
