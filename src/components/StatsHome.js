import React, { Fragment } from "react";
import { Progress, Col } from "reactstrap";
import useTeam from "../hooks/useTeam";

const StatsHome = () => {
  const { team, stats, otherStats } = useTeam();
  const { height, weight } = otherStats;
  const count = team.length;

  const firstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const sort = [];
  for (const stat in stats) {
    sort.push([stat, stats[stat]]);
  }

  sort.sort(function (a, b) {
    return b[1] - a[1];
  });

  const statsSort = {};
  sort.forEach(function (item) {
    statsSort[item[0]] = item[1];
  });

  return (
    <Fragment>
      <h3 className="text-center mt-2 mb-3">Team Stats</h3>
      <Col md="3" className="mx-auto p-2 bg-dark mb-5 text-white text-center">
        {Object.keys(statsSort).map((stat, i) => (
          <div key={i}>
            <p className="font-stats">
              {firstLetter(stat)}: {statsSort[stat]}
            </p>
            <Progress
              animated
              value={statsSort[stat] / count}
              color="success"
              className="w-100"
            />
          </div>
        ))}
        <p className="pt-3">Heigth: {(height / count).toFixed(2)}cm.</p>
        <p>Weigth: {(weight / count).toFixed(2)}kg.</p>
      </Col>
    </Fragment>
  );
};

export default StatsHome;
