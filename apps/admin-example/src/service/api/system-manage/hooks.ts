import { useQuery } from '@tanstack/react-query';

import {
  fetchGetAllPages,
  fetchGetAllRoles,
  fetchGetMenuList,
  fetchGetMenuTree,
  fetchGetRoleList,
  fetchGetUserList
} from './api';
import { SYSTEM_MANAGE_QUERY_KEYS } from './keys';

/**
 * Get role list query hook
 *
 * @example
 *   const { data: roleList, isLoading } = useRoleListQuery({ current: 1, size: 10 });
 *
 * @param params - Search parameters
 */
export function useRoleListQuery(params: Api.SystemManage.RoleSearchParams) {
  return useQuery({
    queryFn: () => fetchGetRoleList(params),
    queryKey: SYSTEM_MANAGE_QUERY_KEYS.ROLE_LIST(params)
  });
}

/**
 * Get all roles query hook
 *
 * @example
 *   const { data: allRoles, isLoading } = useAllRolesQuery();
 */
export function useAllRolesQuery() {
  return useQuery({
    queryFn: fetchGetAllRoles,
    queryKey: SYSTEM_MANAGE_QUERY_KEYS.ALL_ROLES,
    staleTime: 0
  });
}

/**
 * Get user list query hook
 *
 * @example
 *   const { data: userList, isLoading } = useUserListQuery({ current: 1, size: 10 });
 *
 * @param params - Search parameters
 */
export function useUserListQuery(params: Api.SystemManage.UserSearchParams) {
  return useQuery({
    queryFn: () => fetchGetUserList(params),
    queryKey: SYSTEM_MANAGE_QUERY_KEYS.USER_LIST(params)
  });
}

/**
 * Get menu list query hook
 *
 * @example
 *   const { data: menuList, isLoading } = useMenuListQuery();
 */
export function useMenuListQuery() {
  return useQuery({
    queryFn: fetchGetMenuList,
    queryKey: SYSTEM_MANAGE_QUERY_KEYS.MENU_LIST
  });
}

/**
 * Get all pages query hook
 *
 * @example
 *   const { data: allPages, isLoading } = useAllPagesQuery();
 */
export function useAllPagesQuery() {
  return useQuery({
    queryFn: fetchGetAllPages,
    queryKey: SYSTEM_MANAGE_QUERY_KEYS.ALL_PAGES,
    staleTime: 0
  });
}

/**
 * Get menu tree query hook
 *
 * @example
 *   const { data: menuTree, isLoading } = useMenuTreeQuery();
 */
export function useMenuTreeQuery() {
  return useQuery({
    queryFn: fetchGetMenuTree,
    queryKey: SYSTEM_MANAGE_QUERY_KEYS.MENU_TREE
  });
}
