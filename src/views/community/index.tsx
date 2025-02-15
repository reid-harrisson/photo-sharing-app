import React, { useState, useMemo } from 'react';
import { ImageTable, Container, Group } from './styles';
import { ImageCard, PhotoModal, PaginationBar } from 'components';
import { getData, getFriends, PageSize } from 'consts';

export const CommunityView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState({
    show: false,
    index: 0,
  });
  const temp = getData();
  const [data, setData] = useState(temp);

  const profiles = getFriends();
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

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
      {showEditModal.show && (
        <PhotoModal
          photoInfo={data[showEditModal.index]}
          profileInfo={profiles[showEditModal.index]}
          handleCancel={() =>
            setShowEditModal({ show: false, index: showEditModal.index })
          }
        />
      )}
      <Container>
        <ImageTable>
          {currentData.map((option, index) => (
            <ImageCard
              key={index}
              photo={option.photo}
              show={true}
              like={option.like}
              onClick={() => handleModal(index)}
              onClickLike={() => handleLike(index)}
              onClickDislike={() => handleDislike(index)}
            />
          ))}
        </ImageTable>
        <Group>
          <PaginationBar
            totalCount={data.length}
            currentPage={currentPage}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Group>
      </Container>
    </>
  );
};
