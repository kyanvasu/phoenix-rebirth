export * from '../model/store/core.store/client.store';
import { useAuth } from '../model/interactions/use-auth';
import * as AuthPages from '../pages/(auth)';


export const Auth =  {
  ...AuthPages,
  useAuth
}
