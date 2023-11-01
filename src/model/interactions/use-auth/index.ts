import { setCookie, deleteCookie } from 'cookies-next';
import { Configuration } from '../../types';
import { removeSubdomain } from '../remove-subdomain';
export function useAuth({ sdk }: Configuration) {
  async function login(email: string, password: string) {
    try {
      const { models } = removeSubdomain(window.location.hostname);
      const response = await sdk!.auth.login(email, password);
      setCookie(
        'refresh_token',
        {
          token: response.refresh_token,
          expires: response.refresh_token_expires,
        },
        {
          domain: models.onlyDomain,
        }
      );
      setCookie('token', response.token, {
        domain: models.onlyDomain,
      });
      return response;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async function register({
    email,
    firstname,
    lastname,
    displayname,
    password,
    password_confirmation,
  }: Record<string, string>) {
    try {
      const response = await sdk!.users.register({
        email,
        firstname,
        lastname,
        displayname,
        password,
        password_confirmation,
      });
      // TODO(Kanvas core): Fix the response type on kanvas of register
      setCookie('refresh_token', {
        // @ts-ignore
        token: response.register?.token?.refresh_token,
        // @ts-ignore
        expires: response.register?.token?.refresh_token_expires,
      });
      //@ts-ignore
      setCookie('token', response.register?.token?.token);
      await sdk!.customFields.setCustomField({
        name: 'Contact Email',
        data: '',
        system_module_uuid: process.env.NEXT_PUBLIC_KANVAS_SYSTEM_MODULE_UUID!,
        //@ts-ignore
        entity_id: response.register.user.uuid,
      });

      return response;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async function logout(): Promise<void> {
    try {
      const { models } = removeSubdomain(window.location.hostname);
      await sdk!.auth.logout();
      deleteCookie('token', {
        domain: models.onlyDomain,
      });
      deleteCookie('refresh_token', {
        domain: models.onlyDomain,
      });
      localStorage.clear();
    } catch (err) {
      console.error(err);
    }
  }
  async function forgotPassword(email: string) {
    try {
      const response = await sdk!.users.forgotPassword(email);
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async function resetPassword({
    hash_key,
    new_password,
    verify_password,
  }: Record<string, string>) {
    try {
      //@ts-ignore
      const response = await sdk.auth.resetPassword(
        hash_key,
        new_password,
        verify_password
      );
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async function changePassword({
    current_password,
    new_password,
    confirm_new_password,
  }: Record<string, string>) {
    try {
      const response = await sdk!.auth.changePassword(
        current_password,
        new_password,
        confirm_new_password
      );
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
  return {
    operations: {
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
      changePassword
    },
  };
}
