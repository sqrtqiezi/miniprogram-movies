/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://mzsqym5v.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        // 拉取用户信息
        user: `${host}/weapp/user`,

        randomUrl: `${host}/weapp/random`,
        movieDetailUrl: `${host}/weapp/movies/`,
        moviesUrl: `${host}/weapp/movies`,

        addCommetUrl: `${host}/weapp/comments`,

        getComments: movie_id => `${host}/weapp/movies/${movie_id}/comments`,

        getComment: comment_id => `${host}/weapp/comments/${comment_id}`,

        favorite: comment_id => `${host}/weapp/comments/${comment_id}/favorite`,

        getFavorites: () => `${host}/weapp/favorites`
    }
};

module.exports = config;
