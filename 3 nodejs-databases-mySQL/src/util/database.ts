import mysql, { PoolOptions } from 'mysql2';

/* A pool of connections which will allow us to always reach out to it whenever we have a query to run and then we get a new connection from that pool which manages multiple connections so that we can run multiple queries simultaneously because each query needs its own connection and once the query is done, the connection will be handed back into the pool and it's available again for a new query and the pool can then be finished when our application shuts down. */

const access: PoolOptions = {
  host: 'localhost',
  user: 'root',
  database: 'node_shop',
};

const pool = mysql.createPool(access);
