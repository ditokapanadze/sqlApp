const sessions = {};
const createSession = (email, name) => {
  const sessionId = Object.keys(sessions).length + 1;

  const session = { sessionId, email, valid: true, name };

  sessions[sessionId] = session;

  return session;
};

const getSession = (sessionId) => {
  const session = sessions[sessionId];

  return session && session.valid ? session : null;
};

const invalidateSession = (sessionId) => {
  const session = sessions[sessionId];

  if (session) {
    sessions[sessionId].valid = false;
  }

  return sessions[sessionId];
};

module.exports = {
  getSession,
  createSession,
  invalidateSession,
};
