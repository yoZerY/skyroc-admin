import { transformRecordToOption } from '@/utils/common';

export const roleStatusRecord = {
  status: {
    '1': 'page.manage.common.status.enable',
    '2': 'page.manage.common.status.disable'
  }
} as const satisfies {
  status: Record<Api.Common.EnableStatus, I18n.I18nKey>;
};

export const enableStatusOptions = transformRecordToOption(roleStatusRecord.status);

export const enableStatusTagColorRecord: Record<Api.Common.EnableStatus, string> = {
  '1': 'success',
  '2': 'error'
};

export function getRoleSearchInitialParams(): Api.SystemManage.RoleSearchParams {
  return {
    current: 1,
    roleCode: null,
    roleName: null,
    size: 10,
    status: null
  };
}

export function normalizeRoleSearchParams(
  params: Api.SystemManage.RoleSearchParams
): Api.SystemManage.RoleSearchParams {
  return {
    ...params,
    current: normalizePageParam(params.current, 1),
    roleCode: normalizeNullableString(params.roleCode),
    roleName: normalizeNullableString(params.roleName),
    size: normalizePageParam(params.size, 10),
    status: normalizeEnableStatus(params.status)
  };
}

function normalizePageParam(value: number | string | null | undefined, fallback: number) {
  const nextValue = Number(value);

  if (!Number.isFinite(nextValue) || nextValue <= 0) {
    return fallback;
  }

  return nextValue;
}

function normalizeNullableString(value: string | null | undefined) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  return value;
}

function normalizeEnableStatus(value: Api.Common.EnableStatus | string | null | undefined) {
  const normalized = normalizeNullableString(value);

  if (normalized === '1' || normalized === '2') {
    return normalized;
  }

  return null;
}
