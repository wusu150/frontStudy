/*
 * @Description: 
 * @Author: jkwu
 * @Email: suwu150@163.com
 * @Date: 2020-07-29 19:33:37
 * @LastEditors: jkwu
 * @LastEditorsEmail: suwu150@163.com
 * @LastEditTime: 2020-07-29 19:48:07
 */ 

const X = {
  y: {
    c: {
      d: 1
    }
  },
  z: {
    e: {
      d: 2
    }
  },
  q: {
    f: {
      d: 3
    }
  },
  o: {
    m: {
      g: {
        h: {
          d: 4
        }
      }
    }
  }
}

const walk = (tree, result = []) => {
  const startObj =  tree && Object.keys(tree) || [];
     startObj.map(key => {
      if (key === 'd') { result.push(tree[key])};
      return walk(tree[key], result);
    })
    return result;
}

console.log(walk(X));