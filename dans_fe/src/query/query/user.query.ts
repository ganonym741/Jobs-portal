import { redirect } from "next/navigation";

import { useMutation, useQuery } from "@tanstack/react-query";

import type { CreateUserReqDto, UpdateUserReqDto } from "../dto/user.dto";
import { queryClient } from "@/components/providers/query-provider";
import User from "../service/user.service";

export const useJobDetails = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => await User.getProfile(),
    enabled: false,
    retry: false,
    staleTime: 60 * 60 * 3,
  });
};

export const useUserEdit = () => {
  return useMutation({
    mutationFn: async (payload: UpdateUserReqDto) => await User.editProfile(payload),
    async onSuccess() {
      queryClient.invalidateQueries({queryKey:['user']})
      redirect('/login');
    },
  });
};

export const useUserCreate = () => {
  return useMutation({
    mutationFn: async (payload: CreateUserReqDto) => await User.register(payload),
  });
};