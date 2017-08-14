
const host = 'http://10.111.23.190:3000'

newFetch = function (input, opts) {
    return new Promise((resolve, reject) => {
        let timeout = opts.timeout ? opts.timeout : 3000
        let a = setTimeout(() => {
            clearTimeout(a)
            reject('request timeout')
        }, timeout)
        fetch(input, opts).then(resolve, reject)
    })
}


export default ajax = (opt) => {
    return newFetch(host + opt.url, {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: opt.data ? JSON.stringify(opt.data) : ''
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw Error(res.statusText)
        }
    }).then(data => {
        if (data.code && data.code == 200) {
            opt.success(data)
        } else {
            opt.error(data.message)
        }

    }).catch(err => {
        opt.error(err)
    })
}