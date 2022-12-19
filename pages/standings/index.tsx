import { useEffect } from 'react';
import { Teams } from '../../interfaces/teams-interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getTeamsAsync, selectTeams } from '../../store/slices/teamsSlice';
import styles from '../../styles/Home.module.css'

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTeamsAsync())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let teams: Teams[] = useAppSelector(selectTeams);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Standings
        </h1>

        <ul className="teams">
            {teams.map((team: Teams) => (
                <div key={team.TEAM_ID}>
                    <div>
                        <span>{team.TEAM_ID} {team.TEAM_NAME} </span>
                        <span>wins = {team.TEAM_WINS} losses = {team.TEAM_LOSSES}</span>
                    </div>
                </div>
            ))}
        </ul>
      </main>
    </div>
  )
}
