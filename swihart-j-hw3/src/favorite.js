class Favorite{
    constructor(text, url, comments){
        Object.assign(this, {fid:crypto.randomUUID(), text, url, comments});
    }
}
export {Favorite};