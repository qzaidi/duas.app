import { SQLite } from 'expo';

const db = SQLite.openDatabase('duas.db');

const DB = {
  db: db,

  executeSql : async (sql, params = []) => {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(sql, params, 
        (_, { rows }) => resolve(rows._array), reject)
    },
    (err) => console.log('error in tx',err) , 
    () => console.log('tx completed'))
    )
  }

};

export default DB;
