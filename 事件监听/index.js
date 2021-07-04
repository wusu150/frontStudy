/*
 * @Description: 
 * @Author: jkwu
 * @Email: suwu150@163.com
 * @Date: 2020-07-29 19:25:04
 * @LastEditors: jkwu
 * @LastEditorsEmail: suwu150@163.com
 * @LastEditTime: 2020-07-29 19:30:50
 */ 


// const event = new EventEmitter();
// event.on('some_event', (...args) => { 
//   console.log('some_event triggered', ...args); 
// }); 
// emitter.emit('someEvent', 'arg1', 'arg2'); 

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on = (name, cb) => {
    this.events[name] = this.events[name] && this.events[name].push(cb) || [cb];
  }

  emit = (name, ...args) => {
    this.events[name] && this.events[name].forEach(cb => cb && cb(args));
  }
}


const event = new EventEmitter();
event.on('some_event', (...args) => { 
  console.log('some_event triggered', ...args); 
}); 
event.emit('someEvent', 'arg1', 'arg2'); 