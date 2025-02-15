import React, { useState, useMemo } from 'react';
import { Flex, FlexItem, Typography, Search, Wrap } from './styles';
import {
  RoundButton,
  ImageCard,
  Modal,
  EditModal,
  Selector,
  PaginationBar,
} from 'components';
import { COLORSTYLE, getData, PageSize } from 'consts';

export const PhotosView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState({
    show: false,
    index: 0,
  });
  const temp = getData();
  const [data, setData] = useState(temp);

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  const handleClick = () => {
    setShowUploadModal(true);
  };
  const handleLike = (index: number) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      like: newData[index].like + 1,
    };
    setData(newData);
  };
  const handleDislike = (index: number) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      like: newData[index].like - 1,
    };
    setData(newData);
  };
  const handleModal = (index: number) => {
    setShowEditModal({
      show: true,
      index: index + (currentPage - 1) * PageSize,
    });
  };
  return (
    <>
      {showUploadModal && (
        <Modal handleCancel={() => setShowUploadModal(false)} />
      )}
      {showEditModal.show && (
        <EditModal
          photoInfo={data[showEditModal.index]}
          handleCancel={() =>
            setShowEditModal({ show: false, index: showEditModal.index })
          }
        />
      )}
      <Flex>
        <FlexItem>
          <Selector label="Sort by:" options={['Date', 'Uploader']} />
        </FlexItem>
        <FlexItem>
          <Typography>Search:</Typography>
          <Search placeholder="Search..." />
        </FlexItem>
        <FlexItem>
          <PaginationBar
            totalCount={data.length}
            currentPage={currentPage}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </FlexItem>
        <RoundButton style={COLORSTYLE.DOGWOOD_ROSE} onClick={handleClick}>
          Upload New Photo
        </RoundButton>
      </Flex>
      <Wrap>
        {currentData.map((option, index) => (
          <ImageCard
            key={index}
            photo={option.photo}
            show={false}
            like={option.like}
            onClick={() => handleModal(index)}
            onClickLike={() => handleLike(index)}
            onClickDislike={() => handleDislike(index)}
          />
        ))}
      </Wrap>
    </>
  );
};
