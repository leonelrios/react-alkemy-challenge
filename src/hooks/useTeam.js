import { useContext } from "react";
import { TeamContext } from "../context/TeamContext";

export default function useTeam() {
  return useContext(TeamContext);
}
