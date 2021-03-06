const rules = {
  admin: [
    'basicMessages:create',
    'basicMessages:read',
    'contacts:create',
    'contacts:read',
    'contacts:update',
    'contacts:delete',
    'credentials:issue',
    'credentials:read',
    'credentials:reissue',
    'credentials:revoke',
    'demographics:create',
    'demographics:read',
    'demographics:update',
    'demographics:delete',
    'invitations:create',
    'invitations:accept',
    'invitations:delete',
    'roles:read',
    'settings:read',
    'settings:update',
    'users:create',
    'users:read',
    'users:update',
    'users:delete',
    'users:updatePassword',
    'users:updateRoles',
  ],
  technician: [
    'basicMessages:create',
    'basicMessages:read',
    'contacts:create',
    'contacts:read',
    'contacts:update',
    'credentials:issue',
    'credentials:read',
    'credentials:reissue',
    'credentials:revoke',
    'demographics:create',
    'demographics:read',
    'demographics:update',
    'invitations:create',
    'invitations:accept',
  ],
}

export default rules
