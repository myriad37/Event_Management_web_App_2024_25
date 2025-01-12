import { post } from "../utils/apiUtils";

export async function login(body: any, endpoint: string = "auth/signin"): Promise<any> {
  return await post(endpoint, body);
}

export async function register(body: any,  endpoint: string = "auth/signup"): Promise<any> {
  return await post(endpoint, body);
}


export async function validateToken(accessToken: string, endpoint: string = "auth/validate"): Promise<any> {
  const body = {
    token: accessToken
  }
  return await post(endpoint, body);
}
