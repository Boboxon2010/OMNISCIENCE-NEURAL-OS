export class StorageManager {
save(key, value) {
localStorage.setItem(key, JSON.stringify(value));
}
load(key) {
const data = localStorage.getItem(key);
return data ? JSON.parse(data) : null;
}
appendHistory(command) {
const history = this.load('history') || [];
history.push(command);
this.save('history', history);
}
}
