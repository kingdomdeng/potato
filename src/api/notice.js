import axios from '@/configs/axios'

export const getList = (params) => axios.post('notice', params)
