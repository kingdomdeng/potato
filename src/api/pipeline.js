import axios from '@/configs/axios'

export const getList = (params) => axios.post('pipeline', params)

export const getMaterialList = (params) => axios.post('pipeline/material', params)
