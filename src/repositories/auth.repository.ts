import DatabaseError from '../errors/database.error';
import User from '../models/user.model';
import db  from '../database/db';

class AuthRepository {
    private db = db;
    constructor() {
        this.db = db;
    }

    async getUserByUsernameAndPassword(username: string, password: string): Promise<User | null> {
        try {
            const queryStr = `
                SELECT uuid, name, username, password, email, avatar
                FROM application_user 
                WHERE username = $1 AND password = crypt($2, 'salt')
                LIMIT 1;`;
            const values = [username, password];
            const {rows} = await this.db.query<User>(queryStr, values);
            const [user] = rows;
            return user || null;
        } catch (error) {
            if (error instanceof DatabaseError) {
                throw new DatabaseError('Erro na consulta por username e password', error);
            } else {
                throw error;
            }
        }
    }
}


export default new AuthRepository();