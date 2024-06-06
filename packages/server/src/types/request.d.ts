declare namespace Express {
  export interface Request {
    io?: import('socket.io').Server
    user?: {
      id: string
      username: string
    }
  }
  // export interface Response {
  //     user: any;
  // }
}
