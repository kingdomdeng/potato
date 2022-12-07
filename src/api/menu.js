import axios from '@/configs/axios'

export const getList = (params) => axios.post('menu', params)

export const create = (params) => axios.post('menu/create', params)

export const update = (params) => axios.put('menu/update', params)

export const remove = (id) => axios.delete(`menu/delete/${id}`)

export const info = (id) => axios.get(`menu/${id}`)

export const findRoleMenu = (params) => axios.get('menu/findRoleMenu', { params })

export const findUserMenu = (params) => axios.get('menu/findUserMenu', { params })

export const getAppMenuByAppId = (params) => axios.get(`menu/getAppMenuByAppId/`, { params })
