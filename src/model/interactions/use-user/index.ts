import { UpdateUserParams } from '@kanvas/core';
import { Configuration } from '../../types';

export function useUser({ sdk: client }: Configuration) {
  async function getUserInfo() {
    try {
      return await client?.users.getUserData();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async function getInviteUserByHash(hash: string) {
    try {
      const response = await client?.users.getInvite(hash);
      return response;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async function updateUserData({
    userId,
    updatedUser,
  }: {
    userId: number;
    updatedUser: UpdateUserParams;
  }) {
    try {
      return await client?.users.updateUserData(userId, updatedUser);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  return {
    operations: {
      getUserInfo,
      updateUserData,
      getInviteUserByHash,
    },
  };
}
