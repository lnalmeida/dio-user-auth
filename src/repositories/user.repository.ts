import  DatabaseError from '../errors/database.error';
import User from '../models/user.model';
import db  from '../database/db';

class UserRepository {
    private db = db;
    constructor() {
        this.db = db;
    }
    
    async getAllUsers(): Promise<User[]> {
        try {
            const queryStr = `
                SELECT uuid, name, username, email, avatar, created_at 
                FROM application_user;`
            const {rows} = await this.db.query(queryStr);
            const users = rows;
            return users || [];            
        } catch (error) {
            if (error instanceof DatabaseError) {
                throw new DatabaseError('Erro ao carregar registros', error);
            } else {
                throw error;
            }
        }
    }
    
    async getUserById(uuid: string): Promise<User> {
        try {
            
            const queryStr = `
                SELECT uuid, name, username, email, avatar, created_at 
                FROM application_user 
                WHERE uuid = $1;`
                const values = [uuid];
                const {rows} = await this.db.query<User>(queryStr, values);
            const [userById] = rows;
            return userById || null;
        } catch (error) {
            if (error instanceof DatabaseError) {
                throw new DatabaseError('Erro ao carregar registro', error);
            } else {
                throw error;
            }
        }
    }
    
    async createUser(user: User): Promise<string> {
        try {
            
            const {name, username, password, email, avatar} = user 
            const insert_script = `
                    INSERT INTO application_user (name, username, password, email, avatar)
                    VALUES ($1, $2, crypt($3, 'salt'), $4, $5)
                    RETURNING uuid as varchar;`
            const values = [name, username, password, email, avatar];
    
            const {rows} = await this.db.query<{uuid: string}>(insert_script, values);
            const [newUser] = rows;
            return newUser.uuid;   
        } catch (error) {
            if (error instanceof DatabaseError) {
                throw new DatabaseError('Erro ao criar registro', error);
            } else {
                throw error;
            }
        }
    }

    async updateUser(user: User): Promise<void> {
       try {
           const {uuid, name, username, password, email, avatar} = user;
           const update_script = `
           UPDATE application_user 
            SET name = $1, username = $2, password = crypt($3, 'salt'), 
                email = $4, avatar = $5
            WHERE uuid = $6`;
           const values = [name, username, password, email, avatar, uuid];
           await this.db.query(update_script, values);
       } catch (error) {
           if (error instanceof DatabaseError) {
               throw new DatabaseError('Erro ao atualizar registro', error);
           } else {
               throw error;
           }
       }
    }
    
    async deleteUser(uuid: string): Promise<void> {
        try {
            const delete_script = `
                DELETE FROM application_user 
                WHERE uuid = $1;`
            const values = [uuid];
            await this.db.query(delete_script, values);
        } catch (error) {
            if (error instanceof DatabaseError) {
                throw new DatabaseError('Erro ao deletar registro', error);
            } else {
                throw error;
            }
        }
    }

}

export default new UserRepository();

