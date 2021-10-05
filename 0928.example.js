const func1 = (arr) => {
    const sums = arr.map(e => e % 3);
    const sum = 0;
    sums.forEach(e => sum = sum + e);

    return sum;
}

const func1_1 = (arr) => {
    return arr.reduce((p, c) => p + (c % 3), 0);
}

const func2 = (json1, json2) => {
    const minusJson = {}
    Object.keys(json1).forEach(key => {
        if (json2[key] === undefined)
            minusJson[key] = json1[key]
    });

    return minusJson;
}

const func3 = (arr) => {
    return arr.filter(e => e.age >=30).map(e => e.name);
}

const func4 = (arrOfArr) => {
    const maxLength = Math.max(...arrOfArr.map(e =>e.length));
    const res = [];
    arrOfArr.filter(e => e.length === maxLength)
            .forEach((arr) => {
                if (res.length === 0)
                    arr.forEach(e => res.push(e))
                else
                    arr.forEach((e, i) => res[i] += e);
            })

    return res;
}


const func5 = (str) => {
    const word = str.split(' ').reduce((p, c) => {
        if(c.length > p.length) return c;
        else return p;
    }, '');

    return word.substr(2,1);
}
