import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import Schedule from "./Schedule";

function ScheduleManager() {
  const match = useRouteMatch();
  const [selectShift, setSelectShift] = useState({
    id: "",
    endTime: new Date(),
    startTime: new Date(),
    notes: "",
  });
  console.log(selectShift);

  return (
    <Switch>
      <Route path={`${match.url}`}>
        <Schedule setSelectShift={setSelectShift} />
      </Route>
    </Switch>
  );
}

export default ScheduleManager;
