import axios from '@/configs/axios'

export const getList = (params) => axios.post('user', params)

export const create = (params) => axios.post('user/create', params)

export const update = (params) => axios.put('user/update', params)

export const remove = (id) => axios.delete(`user/delete/${id}`)

export const info = (id) => axios.get(`user/${id}`)
