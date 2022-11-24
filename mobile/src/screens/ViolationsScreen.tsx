import React, {useState} from 'react';
import {ScreenRootContainer} from '../components/ScreenRootContainer';
import {LiteViolationList} from './components/LiteViolationList';
import {FullViolationList} from './components/FullViolationList';
import {Segment, SegmentedControl} from '../components/SegmentedControl';

export const ViolationsScreen = () => {
  const [isFullViolationList, setIsFullViolationList] = useState(true);

  const onSegmentChange = (segment: Segment) => {
    setIsFullViolationList(segment === 'left');
  };

  const renderListHeader = () => (
    <SegmentedControl
      activeSegment={isFullViolationList ? 'left' : 'right'}
      onSegmentChange={onSegmentChange}
      segmentNames={{left: 'Potpuni prekršaji', right: 'Brzi prekršaji'}}
    />
  );

  return (
    <ScreenRootContainer title="Prekršaji" showLogo>
      {isFullViolationList ? (
        <FullViolationList renderListHeader={renderListHeader} />
      ) : (
        <LiteViolationList renderHeaderComponent={renderListHeader} />
      )}
    </ScreenRootContainer>
  );
};
