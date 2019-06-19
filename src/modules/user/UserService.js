import CoreApiService from 'modules/common/CoreApiService';

const USER_API_PREFIX = 'users';

export const UserEndpoints = {
  getUsers: ({ offset, limit }) => `${USER_API_PREFIX}?${offset}&${limit}`,
  getUser: id => `${USER_API_PREFIX}/${id}`,
};

class UserService {
  static async getUsers({ offset, limit }) {
    return CoreApiService.get({
      url: UserEndpoints.getUsers({ offset, limit }),
    });
  }
}

export default UserService;
