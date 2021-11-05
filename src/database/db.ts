import {Pool} from 'pg';


const connectionString = 'postgres://digpfouu:E7jbzr1dD_SaVXtztU7C6Wf1jxNrvR6_@motty.db.elephantsql.com/digpfouu';

const db = new Pool({connectionString: connectionString });

export default db;