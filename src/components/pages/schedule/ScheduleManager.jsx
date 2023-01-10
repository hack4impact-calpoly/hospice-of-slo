import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CreateShift from "./createVigil/CreateVigil";
import Schedule from "./Schedule";

function ScheduleManager() {
  const match = useRouteMatch();
  const [selectVigil, setSelectVigil] = useState({
    id: "",
    address: "",
    endTime: new Date(),
    startTime: new Date(),
    notes: "",
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
        <Schedule setSelectVigil={setSelectVigil} />
      </Route>
    </Switch>
  );
}

export default ScheduleManager;
