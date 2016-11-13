let startOffset;
let total = 1;
let order = "DESC";


function createYearIter(config)
{
    startOffset = config.startOffset;
    total = config.total || total;
    order = config.order || order;

    return Years;
}


const Years = {
    [Symbol.iterator]() {
        let currentYear = new Date().getFullYear();
        let iterYear = currentYear + startOffset;
        let count = 0;

        return {
            // make the iterator an iterable
            [Symbol.iterator]() { return this; },

            next() {
                let current, isDone;
                if (++count <= total)
                {
                    current = iterYear;
                    iterYear = (order == 'ASC' ? current + 1 : current - 1);
                    isDone = false;
                }
                else
                {
                    isDone = true;
                }

                return { value: current, done: isDone };
            }
        };
    }


};

export default createYearIter;
