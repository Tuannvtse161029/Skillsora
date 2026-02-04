/* eslint-disable @typescript-eslint/no-unused-vars */
import { GET_EXERCISE_API, GET_EXERCISES_API } from '@/constants/apis';
import { GetPagedExcercisesRequest, UpdateExcerciseOptionRequest } from './../types/excercise';
import { AddOptionRequest, CreateExcerciseRequest, CreateUserAttemptRequest, ExcerciseDto, GetPagedExcerciseTypesRequest, UpdateExcerciseRequest } from '@/types/excercise'
import { IBaseModel, IPaginate } from '@/interfaces/general'
import axiosClient from '@/utils/axios/axiosClient';
import { create } from 'zustand'

interface ExcerciseStore {
    excercise: ExcerciseDto | null
    excercises: IPaginate<ExcerciseDto> | null
    getExcercise: (id: string) => Promise<void>
    getExcercises: (subTopicId: string, query: GetPagedExcercisesRequest) => Promise<void>
    bulkExcercise: (id: string[]) => Promise<void>
    createExcercise: (request: CreateExcerciseRequest) => Promise<void>
    updateExcercise: (request: UpdateExcerciseRequest) => Promise<void>
    deleteExcercise: (id: string) => Promise<void>
    attemptExcercise: (exerciseId: string, request: CreateUserAttemptRequest) => Promise<void>
    createExcerciseOption: (request: AddOptionRequest) => Promise<void>
    updateExcerciseOption: (request: UpdateExcerciseOptionRequest) => Promise<void>
}

const useExcerciseStore = create<ExcerciseStore>((set) => ({
    excercise: null,
    excercises: null,

    getExcercise: async (id: string) => {
        try {
            const response = await axiosClient.get<IBaseModel<ExcerciseDto>>(GET_EXERCISE_API(id))

            if (!response.data.isSuccess) {
                return
            }

            set((state) => ({
                ...state,
                excercise: response.data.responseRequest
            }))

        } catch {
        }

    },

    getExcercises: async (subTopicId: string, query: GetPagedExcercisesRequest) => {
        try {
            const response = await axiosClient.get<IBaseModel<IPaginate<ExcerciseDto>>>(GET_EXERCISES_API(subTopicId), { params: query })

            if (!response.data.isSuccess) {
                return
            }

            set((state) => ({
                ...state,
                excercises: response.data.responseRequest
            }))

        } catch {
        }
    },

    bulkExcercise: async (ids: string[]) => {
        try {
            await axiosClient.post('/exercises/bulk-delete', { ids })
        } catch (error) {
            console.error("[v0] Error bulk deleting exercises:", error)
        }
    },

    createExcercise: async (request: CreateExcerciseRequest) => {
        try {
            const response = await axiosClient.post<IBaseModel<ExcerciseDto>>('/my-exercises', request, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (response.data.isSuccess) {
                set((state) => ({
                    ...state,
                    excercise: response.data.responseRequest
                }))
            }
        } catch (error) {
            console.error("[v0] Error creating exercise:", error)
            throw error
        }
    },

    updateExcercise: async (request: UpdateExcerciseRequest) => {
        try {
            const response = await axiosClient.put<IBaseModel<ExcerciseDto>>(`/my-exercises`, request)
            if (response.data.isSuccess) {
                set((state) => ({
                    ...state,
                    excercise: response.data.responseRequest
                }))
            }
        } catch (error) {
            console.error("[v0] Error updating exercise:", error)
            throw error
        }
    },

    deleteExcercise: async (id: string) => {
        try {
            await axiosClient.delete(`/my-exercises/${id}`)
            set((state) => ({
                ...state,
                excercise: null
            }))
        } catch (error) {
            console.error("[v0] Error deleting exercise:", error)
            throw error
        }
    },

    attemptExcercise: async (exerciseId: string, request: CreateUserAttemptRequest) => {
        try {
            const response = await axiosClient.post(`/exercises/${exerciseId}/attempt`, request)
            return response.data.responseRequest
        } catch (error) {
            console.error("[v0] Error attempting exercise:", error)
            throw error
        }
    },

    createExcerciseOption: async (request: AddOptionRequest) => {
        try {
            await axiosClient.post('/exercises/options', request)
        } catch (error) {
            console.error("[v0] Error creating exercise option:", error)
            throw error
        }
    },

    updateExcerciseOption: async (request: UpdateExcerciseOptionRequest) => {
        try {
            await axiosClient.put(`/my-exercises/${request.optionId}/options`, request)
        } catch (error) {
            console.error("[v0] Error updating exercise option:", error)
            throw error
        }
    }
}
));

export default useExcerciseStore
