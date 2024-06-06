export const IOEVENTS = {
  SERVER: {
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    USERNAME_SET: "server:username-set",
  },
  CLIENT: {
    MESSAGE: "message",
    SET_USERNAME: "client:set-username",
  }
} as const;
// type to get all event names values
export type EVENTNAMES = typeof IOEVENTS['CLIENT'][keyof typeof IOEVENTS['CLIENT']] | typeof IOEVENTS['SERVER'][keyof typeof IOEVENTS['SERVER']];