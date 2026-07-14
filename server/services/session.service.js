const activeSessions = new Map();

export const startSession = (username, ip) => {
  const sessionId =
    `${username}-${ip}-${Date.now()}`;

  activeSessions.set(username, {
    sessionId,
    start: new Date(),
  });

  return sessionId;
};

export const endSession = (username) => {
  const session = activeSessions.get(username);

  if (!session) return null;

  session.end = new Date();

  activeSessions.delete(username);

  return session;
};