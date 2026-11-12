import * as sql from 'mssql';
import { sqlConnection } from '@/data/Mockdata'

const config: sql.config = {
    user: sqlConnection[0].User,
    password: sqlConnection[0].Password,
    server: sqlConnection[0].Server,
    port: sqlConnection[0].port,
    database: sqlConnection[0].Database,
    options: {
        encrypt: true, // for Azure SQL
        enableArithAbort: true, // recommended setting
        trustServerCertificate: true // Disable SSL verification
    }
};

export async function executeQuery(clientCode: string, userName: string) {
    try {
        const pool = await sql.connect(config);
        const query = `
            SELECT R.BaseURL
            FROM Registration R
            LEFT JOIN RegistrationDet RD ON RD.ClientCode = R.ClientCode
            WHERE R.ClientCode = @ClientCode AND RD.UserName = @UserName
        `;
        const result = await pool.request()
            .input('ClientCode', sql.NVarChar, clientCode)
            .input('UserName', sql.NVarChar, userName)
            .query(query);

        return result.recordset;
    } catch (err: any) {
        console.error('SQL error', err);
        throw err;
    }
}
