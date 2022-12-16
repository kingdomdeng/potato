// 具体语法 https://github.com/nuysoft/Mock/wiki
import Mock from 'mockjs';

/**
 * @increment 递增
 * @integer 随机数
 * @name 英文名
 * @cname 中文名
 * @city(true) 城市
 * @csentence 一段文字
 * @datetime 日期
 * @now 当前日期
 * @boolean 布尔值
 * @ip ip
 * @pick 随机指定数组的一个
* **/

function wrapper(options, template) {
  console.log('### mock req params: ', options)
  
  return Mock.mock({
    data: {
      'list|10': [template],
      page: {
        pageSize: 10,
        pageCurrent: 1,
        total: 100,
      }
    }
  })
}

Mock.mock('/api/user', (options) => wrapper(options, {
  appId: '@integer(1,5)',
  name: '@cname',
  disabled: '@boolean',
  remark: '@city(true)',
  createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
  updateTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
}));

Mock.mock('/api/user', (options) => wrapper(options, {
  userId: '@increment',
  appId: '@integer(1,5)',
  name: '@cname',
  disabled: '@boolean',
  remark: '@city(true)',
  createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
  updateTime: '@now(yyyy-MM-dd HH:mm:ss)',
}));

Mock.mock('/api/role', (options) => wrapper(options, {
  roleId: '@increment',
  appId: '@integer(1,5)',
  name: '@pick([\'系统管理员\',\'管理员\',\'超级管理员\'])',
  disabled: '@boolean',
  remark: '备注：@city(true)',
  createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
  updateTime: '@now(yyyy-MM-dd HH:mm:ss)',
}));

Mock.mock('/api/notice', (options) => wrapper(options, {
  appId: '@integer(1,5)',
  noticeId: '@increment',
  title: '@ctitle',
  disabled: '@boolean',
  content: '@csentence',
  remark: '@csentence',
  target: '全部',
  validTime: ['@datetime(yyyy-MM-dd HH:mm:ss)', '@datetime(yyyy-MM-dd HH:mm:ss)'],
  createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
  updateTime: '@now(yyyy-MM-dd HH:mm:ss)',
}));

Mock.mock('/api/log', (options) => wrapper(options, {
  userName: '@cname',
  action: '@pick([\'add\',\'edit\',\'delete\',\'stop\',\'start\'])',
  level: '@pick([\'success\',\'info\',\'warning\',\'danger\'])',
  device: '@ip / @pick([\'火狐\',\'谷歌\',\'Safari\'])',
  createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
  updateTime: '@now(yyyy-MM-dd HH:mm:ss)',
}));
