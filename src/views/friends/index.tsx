import React, { useState } from 'react';

import { Container, TabItem } from './styles';

import { MyFriendsView } from './friends';
import { AddNewFriendsView } from './create';
import { FriendRequestsView } from './requests';
import { PendingRequestsView } from './pending';

export const FriendsView: React.FC = () => {
  const [tabPage, setTabPage] = useState<number>(1);

  return (
    <>
      <Container>
        <TabItem onClick={() => setTabPage(1)}>Friends</TabItem>
        <TabItem onClick={() => setTabPage(2)}>Add New Friends</TabItem>
        <TabItem onClick={() => setTabPage(3)}>Friend Requests</TabItem>
        <TabItem onClick={() => setTabPage(4)}>Pending Requests</TabItem>
      </Container>

      {tabPage === 1 && <MyFriendsView />}
      {tabPage === 2 && <AddNewFriendsView />}
      {tabPage === 3 && <FriendRequestsView />}
      {tabPage === 4 && <PendingRequestsView />}
    </>
  );
};
