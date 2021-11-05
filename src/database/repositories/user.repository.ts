import User from '../../models/user.model';
import db  from '../db';

class UserRepository {
    private db = db;
    constructor() {
        this.db = db;
    }
    
    async getAllUsers(): Promise<User[]> {
        const queryStr = `
            SELECT uuid, name, username, email, avatar, created_at 
            FROM application_user;`
        const {rows} = await this.db.query(queryStr);
        const users = rows;
        return users || [];            
    }
    
    async getUserById(uuid: string): Promise<User> {
        console.log('UserRepository - getUserById')
        const queryStr = `
            SELECT uuid, name, username, email, avatar, created_at 
            FROM application_user 
            WHERE uuid = $1;`
            const values = [uuid];
            const {rows} = await this.db.query<User>(queryStr, values);
        const [userById] = rows;
        return userById || null;
    }
    
    async createUser(user: User): Promise<string> {
        const {name, username, password, email, avatar} = user 
        const insert_script = `
                INSERT INTO application_user (name, username, password, email, avatar)
                VALUES ($1, $2, crypt($3, 'salt'), $4, $5)
                RETURNING uuid as varchar;`
        const values = [name, username, password, email, avatar];

        const {rows} = await this.db.query<{uuid: string}>(insert_script, values);
        const [newUser] = rows;
        return newUser.uuid;   
    }

    async updateUser(user: User): Promise<void> {
        const update_script = `
        UPDATE application_user 
        SET 
        name = $1, 
        username = $2, 
        password = crypt($3, 'salt'), 
        email = $4, 
        avatar = $5
        WHERE uuid = $6;`
        const values = [user.name, user.username, user.password, user.email, user.avatar, user.uuid];
        await this.db.query(update_script, values);
        console.log('executou a query')
    }
    
    async deleteUser(uuid: string): Promise<void> {
        const delete_script = `
            DELETE FROM application_user 
            WHERE uuid = $1;`
        const values = [uuid];
        await this.db.query(delete_script, values);
    }
}

export default new UserRepository();






// async getUserByEmail(email: string): Promise<string> {
//     const queryStr = `
//         SELECT 1 
//         FROM application_user 
//         WHERE email = '$1';`
//     const values = [email];
//     const {rows} = await this.db.query(queryStr, values)
//     if (rows.length > 0) {
//         return "existe"
//     }
//     return "não existe"

// }

// async getUserByUsername(username: string): Promise<string> {
//     const queryStr = `
//         SELECT username 
//         FROM application_user 
//         WHERE username = '$1';`
//     const values = [username];
//     const {rows} = await this.db.query(queryStr, values);
//     if (rows.length > 0) {
//         return "exite"
//     }
//     return "não existe";
// }
