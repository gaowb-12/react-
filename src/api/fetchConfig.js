// 序列化参数
function format(data){
    let arr=[],idx=0;
    for (let item in data) {
        arr[idx++] = [item, data[item]]
      }
    return new URLSearchParams(arr).toString()
}

// get请求封装
function getFetch(url,data){
    const params=format(data)
    return fetch(url+params,{
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, same-origin, *omit
    })
}

// post请求封装
function postFetch(url,data){
    const params=format(data)
    return fetch(url,{
        body: params, // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
        'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    })
}
export{
    getFetch,
    postFetch
}