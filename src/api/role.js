import axios from '@/configs/axios'

export const getList = (params) => axios.post('role', params)

export const create = (params) => axios.post('role/create', params)

export const update = (params) => axios.put('role/update', params)

export const remove = (id) => axios.delete(`role/delete/${id}`)

export const info = (id) => axios.get(`role/${id}`)

export const findUserRole = (params) => axios.get(`role/findUserRole`, { params })

export const bindMenu = (params) => axios.post('role/bindMenu', params)

export const bindUser = (params) => axios.post('role/bindUser', params)

export const getAppRoleByAppId = (params) => axios.get(`role/getAppRoleByAppId/`, { params })
