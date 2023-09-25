export const errorCatch = (fn) => {
    const isAsync = fn?.constructor?.name==='AsyncFunction' || 
    (fn instanceof Promise);
    const catchHandler = (res, error) => {
        console.log('捕捉錯誤', error);
        res.status(500);
        res.send({
            state: 'fail',
            message: '系統錯誤'
        });
    }

    if(isAsync){
        return (req, res, next) => {
            fn(req, res, next)
            .catch(error => {
                catchHandler(res, error);
            });
        };
    } else {
        return (req, res, next) => {
            try{fn(req, res, next);}
            catch(error){
                catchHandler(res, error);
            }
        }
    }
}

export default {
    errorCatch,

};