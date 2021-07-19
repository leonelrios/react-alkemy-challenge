import React, { createContext, useState, useEffect } from "react";

export const TeamContext = createContext();

const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState([]); //Equipo original
  const [superhero, setSuperHero] = useState({}); //Super heroe que vamos a agregar
  const [teamFull, setTeamFull] = useState(false); //Bandera para saber si esta full el equipo
  const [deleteSuperhero, setDeleteSuperhero] = useState(false); //Flag para saber si tengo que eliminar
  const [insertSuperhero, setInsertSuperhero] = useState(false); //Flag para saber si tengo que insertar
  const [stats, setStats] = useState({
    //Stats del equipo
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
  });
  const [otherStats, setOtherStats] = useState({
    height: 0,
    weight: 0
  })

  const { intelligence, strength, speed, durability, power, combat } = stats;
  const { height, weight } = otherStats;

  const insertHero = (superhero) => {
    setInsertSuperhero(true);
    setSuperHero(superhero);
  };

  const deleteHero = (superhero) => {
    setDeleteSuperhero(true);
    setSuperHero(superhero);
  };

  useEffect(() => {
    if (!superhero.biography) return null;

    if (insertSuperhero) {
      const alignment = superhero.biography.alignment; //Comprobar si es bueno o malo
      const bad = team.filter((hero) => hero.biography.alignment === "bad"); //Saber cuanto tiene bad
      const good = team.filter((hero) => hero.biography.alignment === "good"); //Saber cuanto tiene good
      if (alignment === "bad") {
        if (bad.length === 3) {
          setTeamFull(true);
          return null;
        } //Si son 3 sale
      } else if (alignment === "good") {
        if (good.length === 3) {
          setTeamFull(true);
          return null;
        } //Si son 3 sale
      }
      setTeam([...team, superhero]);
      setStats({
        intelligence: `${
          parseInt(intelligence) + parseInt(superhero.powerstats.intelligence)
        }`,
        strength: `${
          parseInt(strength) + parseInt(superhero.powerstats.strength)
        }`,
        speed: `${parseInt(speed) + parseInt(superhero.powerstats.speed)}`,
        durability: `${
          parseInt(durability) + parseInt(superhero.powerstats.durability)
        }`,
        power: `${parseInt(power) + parseInt(superhero.powerstats.power)}`,
        combat: `${parseInt(combat) + parseInt(superhero.powerstats.combat)}`,
      });
      setOtherStats({
        height: `${parseInt(height) + parseInt(superhero.appearance.height[1])}`,
        weight: `${parseInt(weight) + parseInt(superhero.appearance.weight[1])}`,
      })
      setTeamFull(false);
      setInsertSuperhero(false);
    } else if (deleteSuperhero) {
      setTimeout(function () {}, 1000);
      const newSuperheros = team.filter((hero) => hero.id !== superhero.id); //Filtramos al que hay que sacar
      setTeam(newSuperheros);
      setStats({
        intelligence: `${
          parseInt(intelligence) - parseInt(superhero.powerstats.intelligence)
        }`,
        strength: `${
          parseInt(strength) - parseInt(superhero.powerstats.strength)
        }`,
        speed: `${parseInt(speed) - parseInt(superhero.powerstats.speed)}`,
        durability: `${
          parseInt(durability) - parseInt(superhero.powerstats.durability)
        }`,
        power: `${parseInt(power) - parseInt(superhero.powerstats.power)}`,
        combat: `${parseInt(combat) - parseInt(superhero.powerstats.combat)}`,
      });
      setOtherStats({
        height: `${parseInt(height) - parseInt(superhero.appearance.height[1])}`,
        weight: `${parseInt(weight) - parseInt(superhero.appearance.weight[1])}`,
      })
      setDeleteSuperhero(false);
    }
  }, [superhero]);

  const contextValue = {
    stats,
    otherStats,
    team,
    teamFull,
    setTeamFull,
    setDeleteSuperhero,
    insertHero,
    deleteHero,
  };

  return (
    <TeamContext.Provider value={contextValue}>{children}</TeamContext.Provider>
  );
};

export default TeamProvider;
