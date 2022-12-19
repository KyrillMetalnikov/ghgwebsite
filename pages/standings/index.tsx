import { useEffect } from 'react';
import { Teams } from '../../interfaces/teams-interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getTeamsAsync, selectTeams } from '../../store/slices/teamsSlice';
import styles from '../../styles/Home.module.css'

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTeamsAsync())
  }, [])

  let teams: Teams[] = useAppSelector(selectTeams);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Standings
        </h1>

        <ul className="teams">
            {teams.map((team: Teams) => (
                <div key={team.team_id}>
                    <div>
                        <span>{team.team_id} {team.team_name}</span>
                        <span>wins = {team.team_wins} {team.team_losses}</span>
                    </div>
                </div>
            ))}
        </ul>
      </main>
    </div>
  )
}
