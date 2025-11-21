import { Client } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { agentId, password } = req.body;

  if (!agentId || !password) {
    return res.status(400).json({ message: 'Agent ID and password are required' });
  }

  const client = new Client(process.env.DATABASE_URL);

  try {
    await client.connect();

    const query = `SELECT "Password" FROM "Generalstores" WHERE "ID" = $1`;
    const result = await client.query(query, [agentId]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid Agent ID or password' });
    }

    const dbPassword = result.rows[0].Password;

    if (password === dbPassword) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ message: 'Invalid Agent ID or password' });
    }

  } catch (error) {
    console.error('Database query error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.end();
  }
}