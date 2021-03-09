import React, { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import CreateShift from './CreateShift';
import Schedule from './Schedule';

function ScheduleManager({ isAdmin }) {
  const match = useRouteMatch();
  const [selectVigil, setSelectVigil] = useState({
    id: '', address: '', dates: [], endTime: '', startTime: '', notes: '',
  });

  return (
    <Switch>
      <Route path={`${match.url}/create-shift`}>
        <CreateShift />
      </Route>
      <Route path={`${match.url}/edit-shift`}>
        <CreateShift curEvent={selectVigil} />
      </Route>
      <Route path={`${match.url}`}>
        <Schedule {...{ isAdmin, selectVigil, setSelectVigil }} />
      </Route>
    </Switch>
  );
}

ScheduleManager.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default ScheduleManager;
