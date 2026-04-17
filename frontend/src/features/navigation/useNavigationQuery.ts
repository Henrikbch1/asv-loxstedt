import { useQuery } from "@tanstack/react-query";
import { getGlobalSettings, getNavigation } from "../../api/cms";
import { queryKeys } from "../../api/queryKeys";
import { buildNavigationTree } from "./navigation.utils";

export function useGlobalSettingsQuery() {
  return useQuery({
    queryKey: queryKeys.globalSettings,
    queryFn: ({ signal }) => getGlobalSettings(signal),
  });
}

export function useNavigationQuery() {
  return useQuery({
    queryKey: queryKeys.navigation,
    queryFn: ({ signal }) => getNavigation(signal),
  });
}

export function useNavigationTreeQuery() {
  return useQuery({
    queryKey: queryKeys.navigation,
    queryFn: ({ signal }) => getNavigation(signal),
    select: buildNavigationTree,
  });
}
