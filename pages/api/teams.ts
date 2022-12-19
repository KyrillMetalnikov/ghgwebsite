import type { NextApiRequest, NextApiResponse } from 'next';
import { init, execute, checkIfInDB, validateWholeNumber } from '../../utils/utils';

type Data = {
  TEAM_ID: number,
  TEAM_NAME: string,
  TEAM_WINS: number,
  TEAM_LOSSES: number
};

init();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string> 
) {
    const { method } = req
    
    let query: string, teamExists: boolean

    switch (method) {
        case 'GET':
            query = "Select * from TEAM";
            try {
                const result: Data = await execute(query, []);
                res.status(200).send(result);
            } catch (err) {
                res.status(500);
            }
            break;
        case 'POST':
            teamExists = await checkIfInDB("SELECT * FROM TEAM WHERE TEAM_NAME = ?", req.body.TEAM_NAME);
            if (!teamExists) {
                query = "INSERT INTO TEAM (TEAM_NAME) VALUES (?)";
                try {
                    await execute(query, req.body.TEAM_NAME);
                    res.status(201).send("Post request successful");
                } catch (err) {
                    res.status(500);
                }
            } else {
                res.status(400).send("A team already exists with that name");
            }
            break;
        case 'PUT':
            query = "Select * from TEAM WHERE TEAM_NAME=?";
            const result: Data[] = await execute(query, req.body.TEAM_NAME);

            if (result.length === 1) {
                const row: Data = result[0]
                query = "UPDATE TEAM SET TEAM_WINS = ?, TEAM_LOSSES = ? WHERE TEAM_NAME = ?";
                

                if (req.body.TEAM_LOSSES !== undefined) {
                    row.TEAM_LOSSES = req.body.TEAM_LOSSES
                }

                if (req.body.TEAM_WINS !== undefined) {
                    row.TEAM_WINS = req.body.TEAM_WINS
                }
                
                if (validateWholeNumber(row.TEAM_LOSSES) && validateWholeNumber(row.TEAM_WINS)) {
                    let paramsString: string[] = [row.TEAM_WINS.toString(), row.TEAM_LOSSES.toString(), row.TEAM_NAME]
                    try {
                        await execute(query, paramsString);
                        res.status(200).send("Row successfully updated");
                    } catch (err) {
                        res.status(500);
                    }
                } else {
                    res.status(400).send("Invalid Number used in team wins or team losses")
                }
            } else {
                res.status(400).send("No team found with that name.");
            }
            break
        case 'DELETE':
            teamExists = await checkIfInDB("SELECT * FROM TEAM WHERE TEAM_NAME = ?", req.body.TEAM_NAME);
            if (teamExists) {
                query = "DELETE FROM TEAM WHERE TEAM_NAME=?";
                try {
                    await execute(query, req.body.TEAM_NAME);
                    res.status(201).send("Team successfuly deleted");
                } catch (err) {
                    res.status(500);
                }
            } else {
                res.status(400).send("No team exists with that name");
            }
            break;
    }
}
